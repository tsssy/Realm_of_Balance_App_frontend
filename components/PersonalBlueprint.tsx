import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { motion } from "framer-motion";
import { User, MapPin, Clock, Calendar, Star, ArrowRight, Edit } from "lucide-react";

interface UserProfile {
  gender?: string;
  birthDate?: string;
  birthTime?: string;
  birthLocation?: string;
}

interface ElementalData {
  quick_data?: {
    core_energy_field?: {
      chart_data?: Array<{
        axis: string; // "金 | Metal" format
        value: number;
      }>;
    };
  };
}

interface GrowthAreas {
  title: string;
  analysis: string;
}

interface BalancePath {
  title: string;
  suggestions: string[];
}

interface BlueprintData {
  growth_areas?: GrowthAreas;
  balance_path?: BalancePath;
  inner_blueprint?: {
    growth_areas?: GrowthAreas & {
      balance_path?: BalancePath;
    };
    [key: string]: any;
  };
  life_journey?: {
    [key: string]: any;
  };
}

interface PersonalBlueprintProps {
  userProfile: UserProfile;
  onViewBlueprint: () => void;
  elementalData?: ElementalData;
  completeBlueprintData?: BlueprintData;
}

const getGenderDisplay = (gender?: string) => {
  switch (gender) {
    case 'female': return { text: 'Beautiful Soul', icon: '🌸', color: 'bg-[#E7A5A0]/10 text-[#E7A5A0]' };
    case 'male': return { text: 'Wise Spirit', icon: '🌟', color: 'bg-[#7BAEA5]/10 text-[#7BAEA5]' };
    default: return { text: 'Sacred Being', icon: '✨', color: 'bg-[#6E6259]/10 text-[#6E6259]' };
  }
};

// 获取元素描述
const getElementDescription = (elementName: string) => {
  const descriptions: { [key: string]: string } = {
    'Fire': "Your Fire element burns brightest, representing passion, intuition, and transformative power. You possess natural leadership abilities and the gift to inspire others.",
    'Wood': "Your Wood element thrives with vitality, symbolizing growth, creativity, and life force. You have powerful adaptability and innovative spirit.",
    'Earth': "Your Earth element is stable and grounding, representing acceptance, stability, and nurturing. You are a natural builder and protector.",
    'Metal': "Your Metal element is sharp and precise, symbolizing rationality, decisiveness, and transformation. You possess keen insight and unwavering will.",
    'Water': "Your Water element flows with wisdom, representing intuition, adaptability, and depth. You have profound insight and flexible thinking."
  };
  return descriptions[elementName] || "Your dominant element guides your unique path through life.";
};

export function PersonalBlueprint({ userProfile, onViewBlueprint, elementalData, completeBlueprintData }: PersonalBlueprintProps) {
  const genderInfo = getGenderDisplay(userProfile.gender);

  // 添加详细的调试信息
  console.log('🔧 PersonalBlueprint组件接收到的数据:');
  console.log('  - userProfile:', userProfile);
  console.log('  - elementalData:', elementalData);
  console.log('  - elementalData存在:', !!elementalData);
  console.log('  - quick_data存在:', !!elementalData?.quick_data);
  console.log('  - core_energy_field存在:', !!elementalData?.quick_data?.core_energy_field);
  console.log('  - chart_data存在:', !!elementalData?.quick_data?.core_energy_field?.chart_data);
  console.log('  - chart_data内容:', elementalData?.quick_data?.core_energy_field?.chart_data);
  console.log('  - completeBlueprintData:', completeBlueprintData);
  console.log('  - completeBlueprintData存在:', !!completeBlueprintData);
  console.log('  - inner_blueprint存在:', !!completeBlueprintData?.inner_blueprint);
  console.log('  - inner_blueprint.growth_areas存在:', !!completeBlueprintData?.inner_blueprint?.growth_areas);
  console.log('  - inner_blueprint.growth_areas内容:', completeBlueprintData?.inner_blueprint?.growth_areas);

  // 使用真实数据或默认数据
  const getRealElementalData = () => {
    if (elementalData && elementalData.quick_data?.core_energy_field?.chart_data) {
      console.log('🔧 PersonalBlueprint使用真实数据:', elementalData);
      
      // 定义五行映射
      const elementMapping: { [key: string]: { name: string; nameZh: string; color: string; icon: string } } = {
        '金 | Metal': { name: 'Metal', nameZh: '金', color: '#2B3A55', icon: '⚔️' },
        '木 | Wood': { name: 'Wood', nameZh: '木', color: '#7BAEA5', icon: '🌳' },
        '水 | Water': { name: 'Water', nameZh: '水', color: '#7BAEA5', icon: '💧' },
        '火 | Fire': { name: 'Fire', nameZh: '火', color: '#E7A5A0', icon: '🔥' },
        '土 | Earth': { name: 'Earth', nameZh: '土', color: '#6E6259', icon: '🌍' }
      };
      
      // 转换真实数据为组件需要的格式
      const elements = elementalData.quick_data.core_energy_field.chart_data.map(item => {
        const elementInfo = elementMapping[item.axis];
        if (elementInfo) {
          return {
            name: elementInfo.name,
            nameZh: elementInfo.nameZh,
            strength: item.value,
            color: elementInfo.color,
            icon: elementInfo.icon
          };
        }
        return null;
      }).filter(Boolean).filter((item): item is NonNullable<typeof item> => item !== null);
      
      return elements.sort((a, b) => b.strength - a.strength);
    }
    
    // 默认数据（用于fallback）
    console.log('🔧 PersonalBlueprint使用默认数据');
    return [
      { name: 'Fire', nameZh: '火', strength: 92, color: '#E7A5A0', icon: '🔥' },
      { name: 'Water', nameZh: '水', strength: 88, color: '#7BAEA5', icon: '💧' },
      { name: 'Wood', nameZh: '木', strength: 85, color: '#7BAEA5', icon: '🌳' },
      { name: 'Metal', nameZh: '金', strength: 74, color: '#2B3A55', icon: '⚔️' },
      { name: 'Earth', nameZh: '土', strength: 67, color: '#6E6259', icon: '🌍' }
    ];
  };

  const elementalProfile = getRealElementalData();
  const dominantElement = elementalProfile[0];

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Not set';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString?: string) => {
    if (!timeString) return 'Not set';
    return timeString;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8F5F0] to-white px-6 py-8">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-8"
        >
          <div className="w-16 h-16 bg-gradient-to-br from-[#2B3A55] to-[#7BAEA5] rounded-full mx-auto mb-4 flex items-center justify-center">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <User size={24} className="text-white" />
            </motion.div>
          </div>
          <h2 className="text-3xl text-[#2B3A55] mb-2 font-['Playfair_Display']">
            Personal Blueprint
          </h2>
          <p className="text-[#6E6259]">
            Your sacred essence and cosmic blueprint
          </p>
        </motion.div>

        {/* Profile Overview */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-6 mb-6 bg-gradient-to-br from-[#7BAEA5]/10 to-white border-[#7BAEA5]/20">
            <div className="flex items-center gap-4 mb-4">
              <div className={`px-4 py-2 rounded-full ${genderInfo.color} font-medium`}>
                <span className="mr-2">{genderInfo.icon}</span>
                {genderInfo.text}
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Calendar size={16} className="text-[#7BAEA5]" />
                <span className="text-sm text-[#6E6259]">Birth Date:</span>
                <span className="text-[#2B3A55] font-medium">{formatDate(userProfile.birthDate)}</span>
              </div>
              
              <div className="flex items-center gap-3">
                <Clock size={16} className="text-[#E7A5A0]" />
                <span className="text-sm text-[#6E6259]">Birth Time:</span>
                <span className="text-[#2B3A55] font-medium">{formatTime(userProfile.birthTime)}</span>
              </div>
              
              <div className="flex items-center gap-3">
                <MapPin size={16} className="text-[#6E6259]" />
                <span className="text-sm text-[#6E6259]">Birth Location:</span>
                <span className="text-[#2B3A55] font-medium">{userProfile.birthLocation || 'Not set'}</span>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Dominant Element */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="p-6 mb-6 bg-gradient-to-br from-[#E7A5A0]/10 to-white border-[#E7A5A0]/20">
            <h3 className="text-lg text-[#2B3A55] mb-4 font-medium flex items-center gap-2">
              <Star size={18} className="text-[#E7A5A0]" />
              Dominant Element
            </h3>
            
            <div className="text-center mb-4">
              <div 
                className="w-20 h-20 mx-auto rounded-full flex items-center justify-center text-3xl font-bold text-white mb-3"
                style={{ backgroundColor: dominantElement.color }}
              >
                {dominantElement.nameZh}
              </div>
              <Badge className="bg-[#E7A5A0] text-white px-4 py-1">
                {dominantElement.strength}% Strength
              </Badge>
            </div>
            
            <div className="text-center">
              <p className="text-[#6E6259] leading-relaxed whitespace-pre-wrap break-words">
                {getElementDescription(dominantElement.name)}
              </p>
            </div>
          </Card>
        </motion.div>

        {/* Five Elements Overview */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="p-6 mb-6 bg-white/80 backdrop-blur-sm border-[#2B3A55]/20">
            <h3 className="text-lg text-[#2B3A55] mb-4 font-medium">
              Five Elements Distribution
            </h3>
            
            <div className="space-y-3">
              {elementalProfile.map((element, index) => (
                <motion.div
                  key={element.name}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.8 + (index * 0.1) }}
                  className="flex items-center gap-3"
                >
                  <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                    style={{ backgroundColor: element.color }}
                  >
                    {element.nameZh}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-[#2B3A55] font-medium">{element.name}</span>
                      <span className="text-xs text-[#6E6259]">{element.strength}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${element.strength}%` }}
                        transition={{ delay: 1 + (index * 0.1), duration: 0.8 }}
                        className="h-2 rounded-full"
                        style={{ backgroundColor: element.color }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Life Insights - 使用Growth Areas数据 */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <Card className="p-6 mb-6 bg-gradient-to-br from-[#2B3A55]/5 to-white border-[#2B3A55]/10">
            <h3 className="text-lg text-[#2B3A55] mb-4 font-medium">
              🌱 成长挑战 | Growth Areas
            </h3>
            
            {/* 如果有完整蓝图数据，使用Growth Areas；否则使用默认内容 */}
            {completeBlueprintData?.inner_blueprint?.growth_areas ? (
              <div>
                <p className="text-[#6E6259] leading-relaxed whitespace-pre-wrap break-words mb-4">
                  {completeBlueprintData.inner_blueprint.growth_areas.analysis}
                </p>
                
                {/* 如果有Balance Path数据，也显示出来 */}
                {completeBlueprintData.inner_blueprint.growth_areas.balance_path && (
                  <div>
                    <h4 className="text-sm font-medium text-[#2B3A55] mb-2">
                      {completeBlueprintData.inner_blueprint.growth_areas.balance_path.title}
                    </h4>
                    <div className="space-y-2">
                      {completeBlueprintData.inner_blueprint.growth_areas.balance_path.suggestions.map((suggestion: string, index: number) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-[#7BAEA5] rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-[#6E6259] leading-relaxed whitespace-pre-wrap break-words">
                            {suggestion}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              // 默认内容作为fallback
              <div>
                <p className="text-[#6E6259] leading-relaxed mb-4">
                  你的能量场中，木元素和火元素相对稀缺，这可能导致你在开创性思维、灵活变通以及热情表达方面面临一些挑战。积极培养这些方面，将助你生命之树枝繁叶茂，充满活力。
                </p>
                
                <div>
                  <h4 className="text-sm font-medium text-[#2B3A55] mb-2">
                    平衡之道 | Path to Balance
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-[#7BAEA5] rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-[#6E6259] leading-relaxed">
                        多接触大自然，培养园艺或艺术爱好，激发内在的创造力与生命力。
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-[#7BAEA5] rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-[#6E6259] leading-relaxed">
                        主动参与社交活动，表达真实情感，让内在的热情有更多展现的机会。
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-[#7BAEA5] rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-[#6E6259] leading-relaxed">
                        尝试瑜伽或冥想，学习放下执念，拥抱变化，培养内心的弹性与乐观。
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Card>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="space-y-4 mb-8"
        >
          <Button
            onClick={onViewBlueprint}
            className="w-full bg-gradient-to-r from-[#7BAEA5] to-[#E7A5A0] hover:from-[#6A9B91] hover:to-[#D89590] text-white py-4 rounded-lg font-medium text-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <span>View Complete Blueprint Analysis</span>
            <ArrowRight size={20} />
          </Button>
          
          <Button
            variant="outline"
            className="w-full border-[#6E6259]/30 text-[#6E6259] hover:bg-[#6E6259]/10 py-3 rounded-lg transition-colors"
          >
            <Edit size={18} />
            <span>Edit Personal Information</span>
          </Button>
        </motion.div>

        {/* Decorative elements */}
        <div className="absolute top-20 left-8 opacity-20 pointer-events-none">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          >
            <User size={32} className="text-[#2B3A55]" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}