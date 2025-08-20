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

interface UserProfile {
  gender?: string;
  birthDate?: string;
  birthTime?: string;
  birthLocation?: string;
}

export default function App() {
  const [currentScreen, setCurrentScreen] =
    useState<Screen>("onboarding");
  const [activeTab, setActiveTab] =
    useState<MainTab>("heart-compass");
  const [userProfile, setUserProfile] = useState<UserProfile>({
    gender: "other", // Set default gender since we're skipping gender selection
  });
  const [blueprintData, setBlueprintData] = useState(null);

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

  const handleBirthLocationSelect = (birthLocation: string) => {
    const updatedProfile = { ...userProfile, birthLocation };
    setUserProfile(updatedProfile);
    setCurrentScreen("elemental-analysis");
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
            />
          </div>
        );
      case "elemental-analysis":
        return (
          <div className="relative">
            <ElementalAnalysis
              userProfile={userProfile}
              onComplete={handleElementalAnalysisComplete}
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