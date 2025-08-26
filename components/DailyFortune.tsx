import { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { Calendar, Sunrise, Moon, Star, RefreshCw } from "lucide-react";
import { IChing64Compass } from "./IChing64Compass";
import { ImageWithFallback } from './figma/ImageWithFallback';
import DailyFortuneApiService, { type DailyFortune } from '../services/dailyFortuneApi';

interface UserProfile {
  gender?: string;
  birthDate?: string;
  birthTime?: string;
  birthLocation?: string;
}

interface DailyFortuneProps {
  userProfile: UserProfile;
}

// Daily fortune data
const generateDailyFortune = (userProfile: UserProfile) => {
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
  
  // Generate personalized fortune based on user info and date
  const birthDate = userProfile.birthDate ? new Date(userProfile.birthDate) : new Date();
  const personalSeed = birthDate.getMonth() + birthDate.getDate() + dayOfYear;
  
  const hexagrams = [
    { name: '乾', title: 'The Creative', energy: 'Strong creativity', luck: 95 },
    { name: '坤', title: 'The Receptive', energy: 'Great receptivity', luck: 85 },
    { name: '屯', title: 'Difficulty at Beginning', energy: 'Proceed with caution', luck: 65 },
    { name: '蒙', title: 'Youthful Folly', energy: 'Learning and growth', luck: 70 },
    { name: '需', title: 'Waiting', energy: 'Patient waiting', luck: 75 },
    { name: '讼', title: 'Conflict', energy: 'Resolve disputes', luck: 55 },
    { name: '师', title: 'The Army', energy: 'Teamwork', luck: 80 },
    { name: '比', title: 'Union', energy: 'Harmonious relationships', luck: 90 },
  ];
  
  const selectedHexagram = hexagrams[personalSeed % hexagrams.length];
  
  const timeAdvice = [
    {
      period: 'Morning (5:00-11:00)',
      icon: <Sunrise size={20} className="text-yellow-500" />,
      activity: 'Meditation & Mindfulness',
      description: 'Dawn breaks with fresh energy, perfect for meditation and infusing positive energy into your new day.',
      energy: selectedHexagram.luck > 80 ? 'Excellent' : selectedHexagram.luck > 60 ? 'Good' : 'Stable'
    },
    {
      period: 'Afternoon (11:00-17:00)',
      icon: <Star size={20} className="text-orange-500" />,
      activity: 'Important Decisions',
      description: 'Peak yang energy time, ideal for handling important matters and making key decisions.',
      energy: selectedHexagram.luck > 70 ? 'Excellent' : selectedHexagram.luck > 50 ? 'Good' : 'Cautious'
    },
    {
      period: 'Evening (17:00-23:00)',
      icon: <Moon size={20} className="text-purple-500" />,
      activity: 'Self-reflection',
      description: 'Moonlight flows like water, perfect for introspection and organizing the day\'s insights and wisdom.',
      energy: selectedHexagram.luck > 60 ? 'Excellent' : selectedHexagram.luck > 40 ? 'Good' : 'Stable'
    }
  ];

  const dailyGuidance = {
    overall: selectedHexagram.luck,
    hexagram: selectedHexagram,
    timeAdvice,
    luckyColor: selectedHexagram.luck > 80 ? 'Gold' : selectedHexagram.luck > 60 ? 'Green' : 'Silver',
    luckyDirection: personalSeed % 4 === 0 ? 'East' : personalSeed % 4 === 1 ? 'South' : personalSeed % 4 === 2 ? 'West' : 'North',
    luckyNumber: (personalSeed % 9) + 1,
    mantra: selectedHexagram.luck > 80 ? 'Heaven moves with vigor, the wise person strengthens themselves unceasingly' : 'Earth\'s terrain is receptive, the wise person carries all things with virtue',
    advice: generatePersonalAdvice(selectedHexagram, userProfile)
  };

  return dailyGuidance;
};

const generatePersonalAdvice = (hexagram: any, userProfile: UserProfile) => {
  const adviceMap: { [key: string]: string[] } = {
    '乾': [
      'Your creativity reaches its peak today, making this an excellent time to start new projects.',
      'Leadership abilities shine bright, perfect for taking on more responsibilities and challenges.',
      'Maintain a positive and progressive mindset, opportunities are right before you.'
    ],
    '坤': [
      'Gentle strength is today\'s wisdom - patience and tolerance will bring unexpected rewards.',
      'Ideal for teamwork, your support will become a source of strength for others.',
      'Focus on inner cultivation, virtue and compassion are the foundation of success.'
    ],
    '屯': [
      'All beginnings are difficult, but persistence leads to victory. Today is perfect for laying solid foundations.',
      'Stay calm when facing difficulties, seek help and advice from others.',
      'Take steady steps forward, don\'t rush for quick results.'
    ],
    '蒙': [
      'Maintain a learning mindset, today is ideal for acquiring new knowledge and skills.',
      'Be humble in seeking guidance, experienced mentors will point you in the right direction.',
      'Honestly face your shortcomings, this is the beginning of growth.'
    ]
  };

  const hexagramAdvice = adviceMap[hexagram.name] || adviceMap['乾'];
  const randomAdvice = hexagramAdvice[Math.floor(Math.random() * hexagramAdvice.length)];
  
  return [
    randomAdvice,
    'Today, maintain inner peace and respond to all changes with steadiness.',
    'Pay attention to the emotional needs of those around you, offering warmth and support.'
  ];
};

const getEnergyColor = (energy: string) => {
  switch (energy) {
    case 'Excellent': return 'text-green-600 bg-green-100';
    case 'Good': return 'text-blue-600 bg-blue-100';
    case 'Stable': return 'text-yellow-600 bg-yellow-100';
    case 'Cautious': return 'text-orange-600 bg-orange-100';
    default: return 'text-gray-600 bg-gray-100';
  }
};

const getTimePeriodIcon = (period: string) => {
  if (period.includes('Morning') || period.includes('早晨')) {
    return <Sunrise size={20} className="text-yellow-500" />;
  } else if (period.includes('Afternoon') || period.includes('下午')) {
    return <Star size={20} className="text-orange-500" />;
  } else if (period.includes('Evening') || period.includes('晚上')) {
    return <Moon size={20} className="text-purple-500" />;
  } else {
    return <Calendar size={20} className="text-gray-500" />;
  }
};

export function DailyFortune({ userProfile }: DailyFortuneProps) {
  const [fortune, setFortune] = useState<DailyFortune | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getDailyFortuneFromAPI();
  }, [userProfile]);

    const getDailyFortuneFromAPI = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const userId = localStorage.getItem('user_id');
      if (!userId) {
        throw new Error('用户ID不存在，请先登录');
      }

      // 先尝试获取今日运势，如果不存在则自动生成
      const response = await DailyFortuneApiService.getTodayFortune(userId);
      
      setFortune(response);
      setIsLoading(false);
    } catch (err) {
      console.error('获取运势失败:', err);
      setError(err instanceof Error ? err.message : '获取运势失败');
      setIsLoading(false);
    }
  };

  const refreshFortune = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const userId = localStorage.getItem('user_id');
      if (!userId) {
        throw new Error('用户ID不存在，请先登录');
      }

      // 刷新时主动生成新的运势
      const response = await DailyFortuneApiService.generateDailyFortune({
        user_id: userId,
        user_profile: {
          gender: (userProfile.gender || 'other') as 'male' | 'female' | 'other',
          birth_date: userProfile.birthDate || '',
          birth_time: userProfile.birthTime || '12:00',
          birth_location: userProfile.birthLocation || ''
        }
      });
      
      setFortune(response);
      setIsLoading(false);
    } catch (err) {
      console.error('刷新运势失败:', err);
      setError(err instanceof Error ? err.message : '刷新运势失败');
      setIsLoading(false);
    }
  };

  const formatDate = () => {
    const today = new Date();
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      weekday: 'long'
    };
    return today.toLocaleDateString('en-US', options);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#F8F5F0] to-[#E7A5A0]/20 flex flex-col items-center justify-center px-8">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          {/* Loading Compass */}
          <div className="relative mb-8 flex justify-center">
            <motion.div
              animate={{ scale: [0.9, 1.1, 0.9] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <IChing64Compass size={200} isAnimated={true} />
            </motion.div>

            {/* Sparkles */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-[#7BAEA5] rounded-full"
                style={{
                  left: `${50 + 30 * Math.cos(i * 45 * Math.PI / 180)}%`,
                  top: `${50 + 30 * Math.sin(i * 45 * Math.PI / 180)}%`,
                  transform: 'translate(-50%, -50%)'
                }}
                animate={{
                  scale: [0, 1.5, 0],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.25,
                  ease: "easeOut"
                }}
              />
            ))}
          </div>

          <motion.div
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <h3 className="text-2xl text-[#2B3A55] mb-4 font-['Playfair_Display']">
              Reading Today's Fortune
            </h3>
            <p className="text-[#6E6259]">
              Integrating your personal information with cosmic timing...
            </p>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#F8F5F0] to-[#E7A5A0]/20 flex flex-col items-center justify-center px-8">
        <div className="text-center">
          <h3 className="text-2xl text-red-600 mb-4 font-['Playfair_Display']">
            运势生成失败
          </h3>
          <p className="text-[#6E6259] mb-6">
            {error}
          </p>
          <Button onClick={refreshFortune} className="bg-[#7BAEA5] hover:bg-[#6A9B91]">
            重试
          </Button>
        </div>
      </div>
    );
  }

  if (!fortune) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#F8F5F0] to-[#E7A5A0]/20 flex flex-col items-center justify-center px-8">
        <div className="text-center">
          <h3 className="text-2xl text-[#6E6259] mb-4 font-['Playfair_Display']">
            暂无运势数据
          </h3>
          <Button onClick={refreshFortune} className="bg-[#7BAEA5] hover:bg-[#6A9B91]">
            生成运势
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8F5F0] to-white px-6 py-8 pb-24">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl text-[#2B3A55] mb-2 font-['Playfair_Display']">
            Daily Fortune
          </h2>
          <p className="text-[#6E6259] mb-4">
            {formatDate()}
          </p>

          {/* Refresh Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={refreshFortune}
            className="inline-flex items-center gap-2 px-4 py-2 text-[#7BAEA5] hover:text-[#6A9B91] transition-colors"
          >
            <RefreshCw size={16} />
            <span className="text-sm">Refresh Fortune</span>
          </motion.button>
        </motion.div>

        {/* Traditional Chinese Artwork - Image Only */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-4"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="w-full rounded-xl overflow-hidden shadow-xl border-4 border-[#7BAEA5]/20"
          >
            <ImageWithFallback 
              src="/images/example-image.png"
              alt="Traditional Chinese Horse Painting" 
              className="w-full h-80 object-cover"
            />
          </motion.div>
        </motion.div>

        {/* Today's Hexagram Information */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <Card className="p-4 mb-6 bg-gradient-to-br from-[#7BAEA5]/10 to-white border-[#7BAEA5]/20 text-center">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="space-y-3"
            >
              <div className="text-lg text-[#2B3A55] font-['Playfair_Display'] tracking-wide text-[24px]">
                {fortune.hexagram.title}
              </div>
              <div className="text-4xl text-[#2B3A55] font-['Playfair_Display'] mb-2 text-[28px]">
                {fortune.hexagram.name}
              </div>
              <div className="text-lg text-[#6E6259] font-medium mb-3 mt-[30px]">
                Overall Fortune
              </div>
            </motion.div>
            
            {/* Overall Fortune Bar */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="flex items-center justify-center gap-3 -mt-[30px]"
            >
              <div className="flex items-center gap-2">
                <div className={`w-24 h-3 rounded-full bg-gradient-to-r ${
                  fortune.hexagram.luck >= 80 ? 'from-green-400 to-green-600' :
                  fortune.hexagram.luck >= 60 ? 'from-blue-400 to-blue-600' :
                  fortune.hexagram.luck >= 40 ? 'from-yellow-400 to-yellow-600' :
                  'from-orange-400 to-orange-600'
                }`}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${fortune.hexagram.luck}%` }}
                    transition={{ delay: 1.3, duration: 1.5 }}
                    className="h-full bg-white/30 rounded-full"
                  />
                </div>
                <span className="text-sm font-medium text-[#2B3A55]">
                  {fortune.hexagram.luck}%
                </span>
              </div>
            </motion.div>
          </Card>
        </motion.div>

        {/* Time-based Advice */}
        <div className="space-y-4 mb-6">
          {fortune.time_advice.map((timeSlot: any, index: number) => (
            <motion.div
              key={index}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 + (index * 0.2) }}
            >
              <Card className="p-4 bg-white/80 backdrop-blur-sm border-[#E7A5A0]/20">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    {getTimePeriodIcon(timeSlot.period)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-medium text-[#2B3A55]">
                        {timeSlot.period}
                      </h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEnergyColor(timeSlot.energy)}`}>
                        {timeSlot.energy}
                      </span>
                    </div>
                    <p className="text-sm text-[#2B3A55] font-medium mb-1">
                      Recommended: {timeSlot.activity}
                    </p>
                    <p className="text-sm text-[#6E6259] leading-relaxed whitespace-pre-wrap break-words">
                      {timeSlot.description}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Lucky Elements */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <Card className="p-6 mb-6 bg-gradient-to-br from-[#2B3A55]/10 to-white border-[#2B3A55]/20">
            <h4 className="text-lg text-[#2B3A55] mb-4 font-medium text-center">
              🍀 Today's Lucky Elements
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-[#7BAEA5]/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-2xl">🎨</span>
                </div>
                <p className="text-sm text-[#6E6259] mb-1">Lucky Color</p>
                <p className="font-medium text-[#2B3A55]">{fortune.lucky_elements.color}</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-[#E7A5A0]/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-2xl">🧭</span>
                </div>
                <p className="text-sm text-[#6E6259] mb-1">Lucky Direction</p>
                <p className="font-medium text-[#2B3A55]">{fortune.lucky_elements.direction}</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-[#6E6259]/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-2xl">🔢</span>
                </div>
                <p className="text-sm text-[#6E6259] mb-1">Lucky Number</p>
                <p className="font-medium text-[#2B3A55]">{fortune.lucky_elements.number}</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-[#7BAEA5]/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Calendar size={20} className="text-[#7BAEA5]" />
                </div>
                <p className="text-sm text-[#6E6259] mb-1">Today's Hexagram</p>
                <p className="font-medium text-[#2B3A55]">{fortune.hexagram.name}</p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Daily Mantra */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <Card className="p-6 mb-6 bg-gradient-to-br from-[#E7A5A0]/10 to-white border-[#E7A5A0]/20 text-center">
            <h4 className="text-lg text-[#2B3A55] mb-3 font-medium">
              📿 Daily Mantra
            </h4>
            <p className="text-[#6E6259] leading-relaxed italic font-['Playfair_Display'] whitespace-pre-wrap break-words">
              "Today's energy brings {fortune.hexagram.energy} - embrace the wisdom of {fortune.hexagram.name}"
            </p>
          </Card>
        </motion.div>

        {/* Personal Advice */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.8 }}
        >
          <Card className="p-6 bg-white/90 backdrop-blur-sm border-[#7BAEA5]/20">
            <h4 className="text-lg text-[#2B3A55] mb-4 font-medium">
              💫 Personal Guidance
            </h4>
            <div className="space-y-3">
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 2.1 }}
                className="flex items-start gap-3"
              >
                <div className="w-2 h-2 bg-[#7BAEA5] rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-[#6E6259] leading-relaxed">{fortune.personal_advice}</p>
              </motion.div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}