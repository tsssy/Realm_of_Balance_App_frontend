import { useState, useEffect } from "react";
import { OnboardingScreen } from "./components/OnboardingScreen";
import { BirthTimeSelection } from "./components/BirthTimeSelection";
import { BirthLocationSelection } from "./components/BirthLocationSelection";
import { HeartCompass } from "./components/HeartCompass";
import { DailyFortune } from "./components/DailyFortune";
import { PersonalBlueprint } from "./components/PersonalBlueprint";
import { BlueprintReport } from "./components/BlueprintReport";
import { ElementalAnalysis } from "./components/ElementalAnalysis";
import { motion } from "framer-motion";
import {
  Compass,
  Calendar,
  User,
  ArrowLeft,
} from "lucide-react";
import { BlueprintApiService } from "./services/blueprintApi";

type Screen =
  | "onboarding"
  | "birth-time-selection"
  | "birth-location-selection"
  | "elemental-analysis"
  | "main-app"
  | "blueprint-report";
type MainTab =
  | "heart-compass"
  | "daily-fortune"
  | "personal-blueprint";

interface UserProfileState {
  gender?: string;
  birthDate?: string;
  birthTime?: string;
  birthLocation?: string;
}

// API相关类型定义
interface CreateUserRequest {
  device_id: string;
  profile: {
    gender: 'male' | 'female' | 'other';
    birth_date: string;
    birth_time: string;
    birth_location: string;
  };
}

interface CreateUserResponse {
  user_id: string;
  message: string;
}

export default function App() {
  const [currentScreen, setCurrentScreen] =
    useState<Screen>("onboarding");
  const [activeTab, setActiveTab] =
    useState<MainTab>("heart-compass");
  const [userProfile, setUserProfile] = useState<UserProfileState>({
    gender: "other", // Set default gender since we're skipping gender selection
  });
  const [blueprintData, setBlueprintData] = useState(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [elementalData, setElementalData] = useState<any>(null);

  // 生成或获取设备ID
  const generateDeviceId = (): string => {
    let deviceId = localStorage.getItem('device_id');
    if (!deviceId) {
      deviceId = 'device_' + Date.now() + '_' + Math.random().toString(36).substring(2, 11);
      localStorage.setItem('device_id', deviceId);
      console.log('🔧 生成新的设备ID:', deviceId);
    } else {
      console.log('🔧 使用现有设备ID:', deviceId);
    }
    return deviceId;
  };

  // 测试后端连接
  const testBackendConnection = async (): Promise<boolean> => {
    try {
      const response = await fetch('http://localhost:8000/health');
      if (response.ok) {
        const data = await response.json();
        console.log('✅ 后端连接成功:', data);
        return true;
      } else {
        console.warn('⚠️ 后端连接异常:', response.status);
        return false;
      }
    } catch (error) {
      console.warn('⚠️ 后端连接失败:', error);
      return false;
    }
  };

  // 创建用户API调用
  const createUser = async (userData: CreateUserRequest): Promise<CreateUserResponse> => {
    try {
      console.log('🔧 发送用户创建请求:', userData);
      
      const response = await fetch('http://localhost:8000/api/v1/user/create', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Device-ID': userData.device_id
        },
        body: JSON.stringify(userData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('🎉 用户创建成功:', data);
      return data;
    } catch (error) {
      console.error('❌ 用户创建失败:', error);
      throw error;
    }
  };

  // 初始化时检查后端连接
  useEffect(() => {
    const initializeApp = async () => {
      const deviceId = generateDeviceId();
      console.log('🔧 应用初始化，设备ID:', deviceId);
      
      // 测试后端连接
      const isBackendConnected = await testBackendConnection();
      if (isBackendConnected) {
        console.log('✅ 后端服务可用，可以调用API');
      } else {
        console.log('⚠️ 后端服务不可用，将使用本地模式');
      }
    };

    initializeApp();
  }, []);

  // Auto-scroll to top when switching screens or tabs
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentScreen, activeTab]);

  const handleBlueprintSubmit = (data: any) => {
    setBlueprintData(data);
    setCurrentScreen("blueprint-report");
  };

  const handleBirthTimeSelect = (
    birthDate: string,
    birthTime: string,
  ) => {
    setUserProfile((prev) => ({
      ...prev,
      birthDate,
      birthTime,
    }));
    setCurrentScreen("birth-location-selection");
  };

  const handleBirthLocationSelect = async (birthLocation: string) => {
    const updatedProfile = { ...userProfile, birthLocation };
    setUserProfile(updatedProfile);
    
    console.log('🔧 用户信息收集完成:', updatedProfile);
    
    // 尝试创建用户
    setIsLoading(true);
    try {
      const deviceId = generateDeviceId();
      console.log('🔧 使用设备ID:', deviceId);

      // 准备用户数据
      const userData: CreateUserRequest = {
        device_id: deviceId,
        profile: {
          gender: (updatedProfile.gender || 'other') as 'male' | 'female' | 'other',
          birth_date: updatedProfile.birthDate!,
          birth_time: updatedProfile.birthTime || '12:00',
          birth_location: birthLocation,
        }
      };

      console.log('🔧 发送用户创建请求:', userData);

      // 调用创建用户API
      const userResponse = await createUser(userData);

      console.log('🎉 用户创建成功:', userResponse);

      // 保存用户ID
      setUserId(userResponse.user_id);
      localStorage.setItem('user_id', userResponse.user_id);

      console.log('🔧 用户ID已保存:', userResponse.user_id);

      // 立即调用blueprint/quick获取五行分析
      console.log('🔧 调用blueprint/quick接口获取五行分析...');
      try {
        const blueprintQuickData = await BlueprintApiService.generateBlueprintQuick({
          user_id: userResponse.user_id,
          user_profile: userData.profile
        });
        
        console.log('🎉 五行分析数据获取成功:', blueprintQuickData);
        setElementalData(blueprintQuickData);
      } catch (blueprintError) {
        console.error('❌ 获取五行分析失败:', blueprintError);
        // 即使失败也继续流程，使用本地生成的数据
      }

      // 继续到元素分析页面
      setCurrentScreen("elemental-analysis");
    } catch (error) {
      console.error('❌ 创建用户失败:', error);
      console.log('🔧 继续使用本地模式，跳转到元素分析页面');
      // 这里可以添加错误提示UI，暂时继续流程，不设置elementalData让组件使用本地算法
      setCurrentScreen("elemental-analysis");
    } finally {
      setIsLoading(false);
    }
  };

  const handleElementalAnalysisComplete = () => {
    setCurrentScreen("main-app");
  };

  const handleBackToMain = () => {
    setCurrentScreen("main-app");
  };

  // Bottom Navigation Component
  const BottomNavigation = () => (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-[#7BAEA5]/20 px-6 py-3 safe-area-pb z-50">
      <div className="flex justify-around items-center max-w-md mx-auto">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setActiveTab("heart-compass")}
          className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
            activeTab === "heart-compass"
              ? "text-[#7BAEA5] bg-[#7BAEA5]/10"
              : "text-[#6E6259] hover:text-[#7BAEA5]"
          }`}
        >
          <Compass size={24} />
          <span className="text-xs font-medium">
            Heart Compass
          </span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setActiveTab("daily-fortune")}
          className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
            activeTab === "daily-fortune"
              ? "text-[#E7A5A0] bg-[#E7A5A0]/10"
              : "text-[#6E6259] hover:text-[#E7A5A0]"
          }`}
        >
          <Calendar size={24} />
          <span className="text-xs font-medium">
            Daily Fortune
          </span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setActiveTab("personal-blueprint")}
          className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
            activeTab === "personal-blueprint"
              ? "text-[#2B3A55] bg-[#2B3A55]/10"
              : "text-[#6E6259] hover:text-[#2B3A55]"
          }`}
        >
          <User size={24} />
          <span className="text-xs font-medium">
            Personal Blueprint
          </span>
        </motion.button>
      </div>
    </div>
  );

  // Back Button Component
  const BackButton = ({
    onBack,
    title,
  }: {
    onBack: () => void;
    title?: string;
  }) => (
    <div className="absolute top-6 left-6 z-50">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onBack}
        className="flex items-center gap-2 px-3 py-2 bg-white/80 backdrop-blur-sm rounded-lg border border-[#7BAEA5]/20 text-[#2B3A55] hover:bg-white/90 transition-colors shadow-sm"
      >
        <ArrowLeft size={18} />
        {title && (
          <span className="text-sm font-medium">{title}</span>
        )}
      </motion.button>
    </div>
  );

  // Main App Interface
  const MainApp = () => (
    <div className="min-h-screen bg-gradient-to-b from-[#F8F5F0] to-white pb-20">
      {activeTab === "heart-compass" && (
        <HeartCompass onSubmit={handleBlueprintSubmit} />
      )}
      {activeTab === "daily-fortune" && (
        <DailyFortune userProfile={userProfile} />
      )}
      {activeTab === "personal-blueprint" && (
        <PersonalBlueprint
          userProfile={userProfile}
          onViewBlueprint={() =>
            setCurrentScreen("blueprint-report")
          }
        />
      )}
      <BottomNavigation />
    </div>
  );

  // Check if bottom navigation should be shown
  const shouldShowBottomNav =
    currentScreen === "main-app" ||
    currentScreen === "blueprint-report";

  const renderScreen = () => {
    switch (currentScreen) {
      case "onboarding":
        return (
          <OnboardingScreen
            onContinue={() =>
              setCurrentScreen("birth-time-selection")
            }
          />
        );
      case "birth-time-selection":
        return (
          <div className="relative">
            <BackButton
              onBack={() => setCurrentScreen("onboarding")}
            />
            <BirthTimeSelection
              onBirthTimeSelect={handleBirthTimeSelect}
            />
          </div>
        );
      case "birth-location-selection":
        return (
          <div className="relative">
            <BackButton
              onBack={() =>
                setCurrentScreen("birth-time-selection")
              }
            />
            <BirthLocationSelection
              onLocationSelect={handleBirthLocationSelect}
              isLoading={isLoading}
            />
          </div>
        );
      case "elemental-analysis":
        return (
          <div className="relative">
            <ElementalAnalysis
              userProfile={userProfile}
              onComplete={handleElementalAnalysisComplete}
              elementalData={elementalData}
            />
          </div>
        );
      case "main-app":
        return <MainApp />;
      case "blueprint-report":
        return (
          <div className="relative">
            <BackButton
              onBack={handleBackToMain}
              title="Back"
            />
            <div className="pb-20">
              <BlueprintReport onBack={handleBackToMain} />
            </div>
            {shouldShowBottomNav && <BottomNavigation />}
          </div>
        );
      default:
        return <MainApp />;
    }
  };

  return <div className="relative">{renderScreen()}</div>;
}