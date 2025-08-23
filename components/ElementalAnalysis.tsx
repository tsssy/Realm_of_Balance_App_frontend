import { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { ImageWithFallback } from './figma/ImageWithFallback';
import { BlueprintApiService } from '../services/blueprintApi';

interface UserProfile {
  gender?: string;
  birthDate?: string;
  birthTime?: string;
  birthLocation?: string;
}

interface Element {
  name: string;
  chineseName: string;
  strength: number;
  color: string;
  characteristics: string[];
}

interface ElementalAnalysisProps {
  userProfile: UserProfile;
  onComplete: (completeBlueprintData?: any) => void; // 传递完整蓝图数据
  elementalData?: any; // 从后端API获取的五行分析数据
}

const generateElementalProfile = (userProfile: UserProfile): Element[] => {
  // 基于出生信息生成五行分析 (这里使用简化算法)
  const baseElements = [
    {
      name: 'Wood',
      chineseName: '木',
      strength: 0,
      color: '#7BAEA5',
      characteristics: ['Growth', 'Creativity', 'Flexibility', 'Vision']
    },
    {
      name: 'Fire',
      chineseName: '火',
      strength: 0,
      color: '#E7A5A0',
      characteristics: ['Passion', 'Leadership', 'Enthusiasm', 'Transformation']
    },
    {
      name: 'Earth',
      chineseName: '土',
      strength: 0,
      color: '#6E6259',
      characteristics: ['Stability', 'Nurturing', 'Practical', 'Grounding']
    },
    {
      name: 'Metal',
      chineseName: '金',
      strength: 0,
      color: '#2B3A55',
      characteristics: ['Precision', 'Logic', 'Organization', 'Clarity']
    },
    {
      name: 'Water',
      chineseName: '水',
      strength: 0,
      color: '#7BAEA5',
      characteristics: ['Intuition', 'Adaptability', 'Wisdom', 'Flow']
    }
  ];

  // 简化的五行强度计算 - 生成原始值
  const birthDate = userProfile.birthDate ? new Date(userProfile.birthDate) : new Date();
  const birthMonth = birthDate.getMonth() + 1;
  const birthDay = birthDate.getDate();
  const birthHour = userProfile.birthTime ? parseInt(userProfile.birthTime.split(':')[0]) : 12;

  // 根据出生月份、日期、时辰分配五行原始强度
  let rawStrengths = [
    15 + (birthMonth % 4) * 5 + (birthDay % 3) * 3, // Wood
    20 + (birthHour % 5) * 4 + (birthDay % 4) * 2, // Fire
    18 + (birthMonth % 3) * 6 + (birthHour % 4) * 3, // Earth
    17 + (birthDay % 5) * 3 + (birthMonth % 3) * 4, // Metal
    22 + (birthHour % 3) * 5 + (birthMonth % 5) * 2  // Water
  ];

  // 性别调整
  if (userProfile.gender === 'female') {
    rawStrengths[1] += 3; // Fire +3 for females
    rawStrengths[4] += 3; // Water +3 for females
  } else {
    rawStrengths[2] += 3; // Earth +3 for males
    rawStrengths[3] += 3; // Metal +3 for males
  }

  // 计算总和并标准化到100%
  const totalRaw = rawStrengths.reduce((sum, strength) => sum + strength, 0);
  
  // 将原始强度标准化为百分比，确保总和为100%
  baseElements.forEach((element, index) => {
    element.strength = Math.round((rawStrengths[index] / totalRaw) * 100);
  });

  // 确保总和exactly为100%（处理舍入误差）
  const currentTotal = baseElements.reduce((sum, element) => sum + element.strength, 0);
  if (currentTotal !== 100) {
    const difference = 100 - currentTotal;
    // 将差值加到最强的元素上
    const maxIndex = baseElements.findIndex(el => el.strength === Math.max(...baseElements.map(e => e.strength)));
    baseElements[maxIndex].strength += difference;
  }

  return baseElements.sort((a, b) => b.strength - a.strength);
};

// 将后端返回的五行数据转换为前端Element[]格式
const convertBackendDataToFrontend = (backendData: any): Element[] => {
  try {
    console.log('🔧 完整后端数据结构:', JSON.stringify(backendData, null, 2));
    
    // 检查是否有quick_data.core_energy_field数据
    const quickData = backendData.quick_data;
    console.log('🔧 quickData是否存在:', !!quickData);
    console.log('🔧 quickData内容:', quickData);
    
    const coreEnergyField = quickData?.core_energy_field;
    console.log('🔧 coreEnergyField是否存在:', !!coreEnergyField);
    console.log('🔧 coreEnergyField内容:', coreEnergyField);
    
    if (!coreEnergyField || !coreEnergyField.chart_data) {
      console.warn('⚠️ 后端数据中没有quick_data.core_energy_field.chart_data，使用本地算法');
      console.warn('⚠️ coreEnergyField存在:', !!coreEnergyField);
      console.warn('⚠️ chart_data存在:', !!coreEnergyField?.chart_data);
      return [];
    }

    console.log('🔧 使用后端quick_data:', quickData);
    console.log('🔧 转换core_energy_field数据:', coreEnergyField);

    // 从chart_data中提取五行数据
    const chartData = coreEnergyField.chart_data;
    
    // 定义五行映射（根据后端数据的axis字段格式："中文 | 英文"）
    const elementMapping = {
      '金 | Metal': { name: 'Metal', chineseName: '金', color: '#2B3A55' },
      '木 | Wood': { name: 'Wood', chineseName: '木', color: '#7BAEA5' },
      '水 | Water': { name: 'Water', chineseName: '水', color: '#7BAEA5' },
      '火 | Fire': { name: 'Fire', chineseName: '火', color: '#E7A5A0' },
      '土 | Earth': { name: 'Earth', chineseName: '土', color: '#6E6259' }
    };

    const elements: Element[] = [];

    // 转换chart_data到Element格式
    chartData.forEach((item: any) => {
      const elementInfo = elementMapping[item.axis as keyof typeof elementMapping];
      if (elementInfo) {
        elements.push({
          name: elementInfo.name,
          chineseName: elementInfo.chineseName,
          strength: item.value || 20, // 使用value字段作为强度
          color: elementInfo.color,
          characteristics: ['Wisdom', 'Balance'] // 使用默认特征
        });
      }
    });

    // 按强度排序
    elements.sort((a, b) => b.strength - a.strength);
    
    console.log('🔧 转换后的前端五行数据:', elements);
    return elements;

  } catch (error) {
    console.error('❌ 转换后端数据失败:', error);
    return [];
  }
};

// 基于后端完整蓝图数据生成个性洞察
const generateInsightsFromCompleteBlueprint = (completeBlueprintData: any) => {
  try {
    const innerBlueprint = completeBlueprintData?.inner_blueprint;
    if (!innerBlueprint) {
      console.warn('⚠️ 完整蓝图数据中没有inner_blueprint');
      return null;
    }

    console.log('🔧 使用后端inner_blueprint数据:', innerBlueprint);

    return {
      // Core Essence - 核心本质
      coreNature: innerBlueprint.core_essence?.description || 'Your core essence is being analyzed...',
      
      // Natural Strengths - 天生优势
      strengths: innerBlueprint.natural_strengths?.strengths || ['Wisdom', 'Balance', 'Growth'],
      
      // Growth Areas - 成长挑战  
      challenges: innerBlueprint.growth_areas?.balance_path?.suggestions || ['Continue growing', 'Stay balanced'],
      
      // Life Path - 生命曲线描述
      lifePath: innerBlueprint.life_journey_curve?.description || 'Your life journey is unfolding beautifully',
      
      // Relationships - 这里需要根据growth_areas的分析来生成
      relationships: innerBlueprint.growth_areas?.analysis || 'Building meaningful connections through understanding',
      
      // Career - 根据natural_strengths生成职业建议
      career: `Based on your strengths in ${innerBlueprint.natural_strengths?.strengths?.[0] || 'wisdom'}, you are suited for roles requiring insight and understanding`
    };

  } catch (error) {
    console.error('❌ 解析完整蓝图数据失败:', error);
    return null;
  }
};

// 基于转换后的数据生成个性洞察
const generatePersonalityInsights = (elements: Element[], userProfile: UserProfile, completeBlueprintData?: any) => {
  // 优先使用完整蓝图数据
  if (completeBlueprintData) {
    const backendInsights = generateInsightsFromCompleteBlueprint(completeBlueprintData);
    if (backendInsights) {
      console.log('🎉 使用后端完整蓝图数据生成个性洞察');
      return backendInsights;
    }
  }

  if (elements.length === 0) {
    return {
      coreNature: 'Unable to generate insights from backend data.',
      strengths: ['Data processing'],
      challenges: ['Backend connection'],
      lifePath: 'Please try again later.',
      relationships: 'Please try again later.',
      career: 'Please try again later.'
    };
  }
  
  // 使用原有的洞察生成逻辑
  console.log('🔧 使用本地算法生成个性洞察');
  return getPersonalityInsights(elements, userProfile);
};

// 原有的个性洞察生成函数
const getPersonalityInsights = (elements: Element[], userProfile: UserProfile) => {
  const dominant = elements[0];
  const secondary = elements[1];
  
  const insights = {
    coreNature: '',
    strengths: [] as string[],
    challenges: [] as string[],
    lifePath: '',
    relationships: '',
    career: ''
  };

  // Generate insights based on dominant element
  switch (dominant.chineseName) {
    case '木':
      insights.coreNature = 'You possess vibrant life energy like spring itself, filled with creativity and a deep desire for growth. You are a natural innovator who can see infinite possibilities.';
      insights.strengths = ['Strong adaptability', 'Innovative thinking', 'Optimistic nature', 'Inspiring to others'];
      insights.challenges = ['Sometimes overly idealistic', 'Need to learn patience', 'May lack practical action'];
      insights.career = 'Suited for creative, educational, consulting, or emerging technology fields';
      break;
    case '火':
      insights.coreNature = 'You burn with passionate energy like fire, possessing powerful charisma and natural leadership. Your presence can warm and inspire those around you.';
      insights.strengths = ['Natural-born leader', 'Full of passion', 'Great at motivating others', 'Sharp intuition'];
      insights.challenges = ['Emotional fluctuations', 'Sometimes too impulsive', 'Need to learn calmness'];
      insights.career = 'Suited for leadership, performing arts, sales, or psychological counseling fields';
      break;
    case '土':
      insights.coreNature = 'You are stable and reliable like the earth itself, serving as a solid foundation for others. You possess an inclusive nature and the perseverance to achieve your dreams.';
      insights.strengths = ['Strong sense of responsibility', 'Stable and reliable', 'Great at caring for others', 'Strong practical execution'];
      insights.challenges = ['Sometimes too conservative', 'Need more adventurous spirit', 'May take on too much responsibility'];
      insights.career = 'Suited for management, finance, healthcare, or social service fields';
      break;
    case '金':
      insights.coreNature = 'You are sharp and precise like refined metal, possessing clear logical thinking and unwavering willpower. You pursue perfection and excellence.';
      insights.strengths = ['Clear logical thinking', 'Strong organizational skills', 'Pursuit of excellence', 'Strong decision-making'];
      insights.challenges = ['Sometimes too strict', 'Need more flexibility', 'May neglect emotional aspects'];
      insights.career = 'Suited for law, engineering, research, or precision technology fields';
      break;
    case '水':
      insights.coreNature = 'You flow with wisdom like water itself, possessing exceptional intuition and adaptability. You can perceive the essence of things.';
      insights.strengths = ['Strong intuition', 'High adaptability', 'Deep thinking', 'Good at understanding others'];
      insights.challenges = ['Sometimes too sensitive', 'Need more action orientation', 'May over-analyze'];
      insights.career = 'Suited for psychology, arts, research, or spiritual guidance fields';
      break;
  }

  insights.lifePath = `Your life path is to combine the ${dominant.characteristics[0]} of ${dominant.name} with the ${secondary.characteristics[0]} of ${secondary.name}, creating unique life value.`;
  insights.relationships = `In relationships, you tend to display ${dominant.characteristics[1]} qualities, while needing to cultivate more ${secondary.characteristics[1]} for balance.`;

  return insights;
};

export function ElementalAnalysis({ userProfile, onComplete, elementalData }: ElementalAnalysisProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [elements, setElements] = useState<Element[]>([]);
  const [insights, setInsights] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [completeBlueprintData, setCompleteBlueprintData] = useState<any>(null);

  useEffect(() => {
    // 如果有后端数据，使用后端数据；否则使用本地生成的数据
    if (elementalData) {
      console.log('🔧 使用后端五行分析数据:', elementalData);
      // 将后端数据转换为前端格式
      const backendElements = convertBackendDataToFrontend(elementalData);
      if (backendElements.length > 0) {
        const personalityInsights = generatePersonalityInsights(backendElements, userProfile); // 不传递completeBlueprintData，因为这时还没获取到
        setElements(backendElements);
        setInsights(personalityInsights);
        setIsAnalyzing(false);
        
        // 立即调用blueprint/complete获取完整蓝图数据
        callBlueprintComplete();
      } else {
        // 转换失败，使用本地算法
        console.log('🔧 后端数据转换失败，使用本地生成的五行数据');
        setTimeout(() => {
          const elementalProfile = generateElementalProfile(userProfile);
          const personalityInsights = getPersonalityInsights(elementalProfile, userProfile);
          setElements(elementalProfile);
          setInsights(personalityInsights);
          setIsAnalyzing(false);
        }, 3000);
      }
    } else {
      console.log('🔧 使用本地生成的五行数据');
      // 模拟分析过程
      setTimeout(() => {
        const elementalProfile = generateElementalProfile(userProfile);
        const personalityInsights = getPersonalityInsights(elementalProfile, userProfile);
        setElements(elementalProfile);
        setInsights(personalityInsights);
        setIsAnalyzing(false);
      }, 3000);
    }
  }, [userProfile, elementalData]);

  // 调用blueprint/complete接口
  const callBlueprintComplete = async () => {
    try {
      const userId = localStorage.getItem('user_id');
      if (!userId) {
        console.warn('⚠️ 没有找到用户ID，无法调用blueprint/complete');
        return;
      }

      console.log('🔧 调用blueprint/complete接口获取完整蓝图...');
      const completeData = await BlueprintApiService.generateBlueprintComplete({
        user_id: userId,
        user_profile: {
          gender: (userProfile.gender || 'other') as 'male' | 'female' | 'other',
          birth_date: userProfile.birthDate || '',
          birth_time: userProfile.birthTime || '12:00',
          birth_location: userProfile.birthLocation || ''
        }
      });
      
      console.log('🎉 完整蓝图数据获取成功:', completeData);
      setCompleteBlueprintData(completeData);
      
      // 重新生成个性洞察，使用完整蓝图数据
      const updatedInsights = generatePersonalityInsights(elements, userProfile, completeData);
      setInsights(updatedInsights);
      console.log('🔧 使用完整蓝图数据更新个性洞察:', updatedInsights);
    } catch (error) {
      console.error('❌ 获取完整蓝图失败:', error);
    }
  };

  if (isAnalyzing) {
    return (
      <div 
        className="min-h-screen flex flex-col items-center justify-center px-8 relative overflow-hidden"
        style={{
          backgroundImage: `url('/images/lotus-background.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center bottom',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#2B3A55]/40 to-[#F8F5F0]/60"></div>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center relative z-10"
        >
          {/* 五行轮转动画 */}
          <div className="relative mb-8">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="w-32 h-32 relative mx-auto"
            >
              {/* 五行圆环 */}
              {['木', '火', '土', '金', '水'].map((element, index) => {
                const angle = (index * 360) / 5;
                const colors = ['#7BAEA5', '#E7A5A0', '#6E6259', '#2B3A55', '#7BAEA5'];
                return (
                  <motion.div
                    key={element}
                    className="absolute w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm"
                    style={{
                      backgroundColor: colors[index],
                      left: `${50 + 40 * Math.cos(angle * Math.PI / 180)}%`,
                      top: `${50 + 40 * Math.sin(angle * Math.PI / 180)}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.7, 1, 0.7]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.4
                    }}
                  >
                    {element}
                  </motion.div>
                );
              })}
            </motion.div>

            {/* 能量波纹 */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute inset-0 border border-white/30 rounded-full"
                animate={{
                  scale: [1, 2, 1],
                  opacity: [0.5, 0, 0.5]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 1,
                  ease: "easeOut"
                }}
              />
            ))}
          </div>

          <motion.div
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <h3 className="text-2xl text-white mb-4 font-['Playfair_Display']">
              Analyzing Your Elemental Blueprint
            </h3>
            <p className="text-white/80 mb-2">
              Blending ancient wisdom with modern insights...
            </p>
            <div className="flex justify-center space-x-1">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-white/60 rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.4, 1, 0.4]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.3
                  }}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  const steps = [
    'elemental-overview',
    'personality-insights',
    'life-guidance'
  ];

  const renderCurrentStep = () => {
    switch (steps[currentStep]) {
      case 'elemental-overview':
        return (
          <div className="space-y-6">
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-center mb-8"
            >
              <h2 className="text-3xl text-[#2B3A55] mb-3 font-['Playfair_Display']">
                Your Elemental Composition
              </h2>
              <p className="text-[#6E6259]">
                Five element energy distribution based on your birth information
              </p>
            </motion.div>

            {/* 五行图表 */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="p-6 bg-white/80 backdrop-blur-sm border-[#7BAEA5]/20">
                <div className="space-y-4">
                  {elements.map((element, index) => (
                    <motion.div
                      key={element.name}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.5 + (index * 0.1) }}
                      className="flex items-center gap-4"
                    >
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold shadow-lg"
                        style={{ backgroundColor: element.color }}
                      >
                        {element.chineseName}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-[#2B3A55]">
                            {element.name} {element.chineseName}
                          </span>
                          <span className="text-sm text-[#6E6259]">
                            {element.strength}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${element.strength}%` }}
                            transition={{ delay: 0.8 + (index * 0.1), duration: 1 }}
                            className="h-3 rounded-full shadow-sm"
                            style={{ backgroundColor: element.color }}
                          />
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {element.characteristics.slice(0, 2).map((char, i) => (
                            <span
                              key={i}
                              className="text-xs px-2 py-1 rounded-full bg-gray-100 text-[#6E6259]"
                            >
                              {char}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="text-center"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#7BAEA5]/10 to-[#E7A5A0]/10 rounded-full border border-[#7BAEA5]/20">
                <Sparkles size={16} className="text-[#7BAEA5]" />
                <span className="text-sm text-[#2B3A55] font-medium">
                  Dominant Element: {elements[0].name} ({elements[0].strength}%)
                </span>
              </div>
              <p className="text-xs text-[#6E6259] mt-2">Total: 100%</p>
            </motion.div>
          </div>
        );

      case 'personality-insights':
        return (
          <div className="space-y-6">
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-center mb-8"
            >
              <h2 className="text-3xl text-[#2B3A55] mb-3 font-['Playfair_Display']">
                Personality Insights
              </h2>
              <p className="text-[#6E6259]">
                Deep personality traits based on elemental analysis
              </p>
            </motion.div>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="p-6 mb-6 bg-gradient-to-br from-[#7BAEA5]/10 to-white border-[#7BAEA5]/20">
                <h3 className="text-lg text-[#2B3A55] mb-3 font-medium text-[20px]">
                  🌟 Core Essence
                </h3>
                <p className="text-[#6E6259] leading-relaxed">
                  {insights.coreNature}
                </p>
              </Card>
            </motion.div>

            <div className="grid grid-cols-1 gap-4">
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <Card className="p-4 bg-white/80 backdrop-blur-sm border-[#E7A5A0]/20">
                  <h4 className="text-[#2B3A55] font-medium mb-3 flex items-center gap-2 text-[20px]">
                    💪 Natural Strengths
                  </h4>
                  <div className="space-y-2">
                    {insights.strengths.map((strength: string, index: number) => (
                      <motion.div
                        key={index}
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.7 + (index * 0.1) }}
                        className="flex items-center gap-2"
                      >
                        <div className="w-2 h-2 bg-[#7BAEA5] rounded-full"></div>
                        <span className="text-[#6E6259]">{strength}</span>
                      </motion.div>
                    ))}
                  </div>
                </Card>
              </motion.div>

              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <Card className="p-4 bg-white/80 backdrop-blur-sm border-[#6E6259]/20">
                  <h4 className="text-[#2B3A55] font-medium mb-3 flex items-center gap-2 text-[20px]">
                    🎯 Growth Areas
                  </h4>
                  <div className="space-y-2">
                    {insights.challenges.map((challenge: string, index: number) => (
                      <motion.div
                        key={index}
                        initial={{ x: 10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.9 + (index * 0.1) }}
                        className="flex items-center gap-2"
                      >
                        <div className="w-2 h-2 bg-[#E7A5A0] rounded-full"></div>
                        <span className="text-[#6E6259]">{challenge}</span>
                      </motion.div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>
        );

      case 'life-guidance':
        return (
          <div className="space-y-6">
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-center mb-8"
            >
              <h2 className="text-3xl text-[#2B3A55] mb-3 font-['Playfair_Display']">
                Life Guidance
              </h2>
              <p className="text-[#6E6259]">
                Life recommendations based on your unique elemental combination
              </p>
            </motion.div>

            <div className="space-y-4">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="p-6 bg-gradient-to-br from-[#2B3A55]/5 to-white border-[#2B3A55]/10">
                  <h3 className="text-lg text-[#2B3A55] mb-3 font-medium text-[20px]">
                    🛤️ Life Path
                  </h3>
                  <p className="text-[#6E6259] leading-relaxed mb-4">
                    {insights.lifePath}
                  </p>
                </Card>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <Card className="p-6 bg-gradient-to-br from-[#E7A5A0]/10 to-white border-[#E7A5A0]/20">
                  <h3 className="text-lg text-[#2B3A55] mb-3 font-medium text-[20px]">
                    💼 Career Direction
                  </h3>
                  <p className="text-[#6E6259] leading-relaxed">
                    {insights.career}
                  </p>
                </Card>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <Card className="p-6 bg-gradient-to-br from-[#7BAEA5]/10 to-white border-[#7BAEA5]/20">
                  <h3 className="text-lg text-[#2B3A55] mb-3 font-medium text-[20px]">
                    💕 Relationship Patterns
                  </h3>
                  <p className="text-[#6E6259] leading-relaxed">
                    {insights.relationships}
                  </p>
                </Card>
              </motion.div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8F5F0] to-white px-6 py-8">
      <div className="max-w-md mx-auto">
        {renderCurrentStep()}

        {/* Progress indicator */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex justify-center gap-2 my-8"
        >
          {steps.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index <= currentStep ? 'bg-[#7BAEA5]' : 'bg-gray-300'
              }`}
            />
          ))}
        </motion.div>

        {/* Navigation buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex gap-4"
        >
          {currentStep > 0 && (
            <Button
              onClick={() => setCurrentStep(prev => prev - 1)}
              variant="outline"
              className="flex-1 border-[#6E6259]/30 text-[#6E6259] hover:bg-[#6E6259]/10"
            >
              Previous
            </Button>
          )}
          
          <Button
            onClick={() => {
              if (currentStep < steps.length - 1) {
                setCurrentStep(prev => prev + 1);
              } else {
                // 传递完整蓝图数据给主应用
                onComplete(completeBlueprintData);
              }
            }}
            className="flex-1 bg-gradient-to-r from-[#7BAEA5] to-[#E7A5A0] hover:from-[#6A9B91] hover:to-[#D89590] text-white"
          >
            {currentStep < steps.length - 1 ? (
              <>
                Next
                <ArrowRight size={18} />
              </>
            ) : (
              <>
                Enter App
                <ArrowRight size={18} />
              </>
            )}
          </Button>
        </motion.div>
      </div>
    </div>
  );
}