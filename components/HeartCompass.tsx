import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Card } from "./ui/card";
import { motion } from "framer-motion";
import { Heart, Send } from "lucide-react";
import { IChing64Compass } from "./IChing64Compass";
import { HeartCompassApiService, type HeartCompassRecord } from '../services/heartCompassApi';
import engagedImg from '../taylor_engaged/engaged.png';

interface HeartCompassProps {
  userProfile?: {
    gender?: string;
    birthDate?: string;
    birthTime?: string;
    birthLocation?: string;
  };
  onSubmit?: (data: any) => void;
}

const exampleQuestions = [
  "How should I face my current life challenges?",
  "What is blocking my inner peace?", 
  "How can I find true happiness in love?",
  "What is my life's purpose?",
  "How can I balance work and life?",
  "What can help me gain inner strength?"
];

export function HeartCompass({ userProfile, onSubmit }: HeartCompassProps) {
  const [question, setQuestion] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showGuidance, setShowGuidance] = useState(false);
  const [compassRotation, setCompassRotation] = useState(0);
  const [guidanceData, setGuidanceData] = useState<HeartCompassRecord | null>(null);
  const [error, setError] = useState<string | null>(null);

  // 在组件挂载时从localStorage恢复状态
  useEffect(() => {
    const savedGuidanceData = localStorage.getItem('heartCompass_guidanceData');
    const savedQuestion = localStorage.getItem('heartCompass_question');
    
    if (savedGuidanceData && savedQuestion) {
      try {
        const parsedGuidanceData = JSON.parse(savedGuidanceData);
        setGuidanceData(parsedGuidanceData);
        setQuestion(savedQuestion);
        setShowGuidance(true);
      } catch (error) {
        console.error('Error parsing saved guidance data:', error);
        // 如果解析失败，清除无效数据
        localStorage.removeItem('heartCompass_guidanceData');
        localStorage.removeItem('heartCompass_question');
      }
    }
  }, []);

  // 保存状态到localStorage的辅助函数
  const saveToLocalStorage = (guidanceRecord: HeartCompassRecord, userQuestion: string) => {
    try {
      localStorage.setItem('heartCompass_guidanceData', JSON.stringify(guidanceRecord));
      localStorage.setItem('heartCompass_question', userQuestion);
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  };

  // 清除localStorage的辅助函数
  const clearFromLocalStorage = () => {
    localStorage.removeItem('heartCompass_guidanceData');
    localStorage.removeItem('heartCompass_question');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;
    
    // 验证问题格式
    if (!HeartCompassApiService.validateQuestion(question)) {
      setError("Please enter a question between 5-500 characters");
      return;
    }
    
    setIsProcessing(true);
    setError(null);
    setCompassRotation(0);
    
    try {
      // 获取用户ID
      const userId = localStorage.getItem('user_id');
      if (!userId) {
        throw new Error('User ID not found. Please complete your profile first.');
      }
      
      // 罗盘动画
      setTimeout(() => {
        setCompassRotation(45); // 模拟指向卦象位置
      }, 1000);
      
      // 调用后端API
      const guidanceRecord = await HeartCompassApiService.seekGuidance({
        user_id: userId,
        question: question.trim(),
        user_profile: {
          gender: (userProfile?.gender || 'other') as 'male' | 'female' | 'other',
          birth_date: userProfile?.birthDate || '',
          birth_time: userProfile?.birthTime || '12:00',
          birth_location: userProfile?.birthLocation || ''
        }
      });
      
      console.log('🎉 Heart Compass指导获取成功:', guidanceRecord);
      setGuidanceData(guidanceRecord);
      
      // 保存到localStorage
      saveToLocalStorage(guidanceRecord, question.trim());
      
      // 延迟显示结果，让用户看到完整的加载动画
      setTimeout(() => {
        setIsProcessing(false);
        setShowGuidance(true);
        
        // 通知父组件
        if (onSubmit) {
          onSubmit(guidanceRecord);
        }
      }, 4000); // 保持4秒加载时间以匹配原有体验
      
    } catch (error) {
      console.error('❌ Heart Compass指导获取失败:', error);
      setError('Failed to get guidance. Please try again.');
      setIsProcessing(false);
    }
  };

  const getRandomPlaceholder = () => {
    const randomIndex = Math.floor(Math.random() * exampleQuestions.length);
    return `e.g., "${exampleQuestions[randomIndex]}"`;
  };

  if (isProcessing) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#F8F5F0] to-[#7BAEA5]/20 flex flex-col items-center justify-center px-8">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <div className="relative mb-8 flex justify-center">
            {/* Large centered compass */}
            <motion.div
              animate={{ 
                scale: [0.9, 1, 0.9],
                rotate: [0, compassRotation]
              }}
              transition={{ 
                scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                rotate: { duration: 3, ease: "easeOut", delay: 1 }
              }}
            >
              <IChing64Compass size={280} isAnimated={true} />
            </motion.div>

            {/* Energy particles */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-3 h-3 bg-[#E7A5A0] rounded-full"
                style={{
                  left: "50%",
                  top: "50%",
                }}
                animate={{
                  x: [0, Math.cos(i * 30 * Math.PI / 180) * 160],
                  y: [0, Math.sin(i * 30 * Math.PI / 180) * 160],
                  scale: [0, 1.2, 0],
                  opacity: [0, 0.8, 0]
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  delay: i * 0.15,
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
              Consulting Ancient Wisdom
            </h3>
            <p className="text-[#6E6259]">
              Your question is being transformed into cosmic energy...
            </p>
            <motion.div
              animate={{ opacity: [0, 1] }}
              transition={{ delay: 2, duration: 1 }}
              className="mt-4 text-lg text-[#7BAEA5] font-medium"
            >
              Compass points to...
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  if (showGuidance && guidanceData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#F8F5F0] to-white px-6 py-8">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-center mb-6"
          >
            <h2 className="text-3xl text-[#2B3A55] mb-3 font-['Playfair_Display']">
              Your Guidance
            </h2>
          </motion.div>

          {/* Hexagram */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="p-6 mb-6 bg-gradient-to-br from-[#7BAEA5]/10 to-white border-[#7BAEA5]/20 text-center">
              <div className="text-4xl text-[#2B3A55] mb-2 font-['Playfair_Display']">
                {guidanceData.hexagram.name} ({guidanceData.hexagram.code})
              </div>
              <h3 className="text-xl text-[#2B3A55] mb-3 font-['Playfair_Display']">
                {guidanceData.hexagram.title}
              </h3>
              {/* Inserted image between title and quote */}
              <div className="mb-4 flex justify-center">
                <img
                  src={engagedImg}
                  alt="Engagement"
                  className="rounded-xl shadow-md max-w-full h-auto"
                  style={{ maxHeight: '320px' }}
                />
              </div>
              <p className="text-[#6E6259] italic leading-relaxed whitespace-pre-wrap break-words">
                "{guidanceData.insight.revelation}"
              </p>
            </Card>
          </motion.div>

          {/* Dialogue Flow - 统一的大框 */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="p-6 mb-6 bg-gradient-to-br from-[#7BAEA5]/10 to-white border-[#7BAEA5]/20">
              <h4 className="text-lg text-[#2B3A55] mb-4 font-medium flex items-center gap-2">
                💬 Insight
              </h4>
              
              {/* Analysis */}
              <div className="space-y-3 mb-4">
                <h5 className="font-medium text-[#2B3A55] text-sm">🔍 Analysis:</h5>
                <p className="text-[#6E6259] leading-relaxed whitespace-pre-wrap break-words">
                  {guidanceData.insight.analysis}
                </p>
              </div>
              
              {/* Guidance */}
              <div className="space-y-3 mb-4">
                <h5 className="font-medium text-[#2B3A55] text-sm">🧭 Guidance:</h5>
                <p className="text-[#6E6259] leading-relaxed whitespace-pre-wrap break-words">
                  {guidanceData.insight.guidance}
                </p>
              </div>
              
              {/* Encouragement */}
              <div className="space-y-3">
                <h5 className="font-medium text-[#2B3A55] text-sm">💪 Encouragement:</h5>
                <p className="text-[#6E6259] leading-relaxed whitespace-pre-wrap break-words">
                  {guidanceData.insight.encouragement}
                </p>
              </div>
            </Card>
          </motion.div>

          {/* Deep Wisdom */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <Card className="p-6 mb-6 bg-white/80 backdrop-blur-sm border-[#E7A5A0]/20">
              <h4 className="text-lg text-[#2B3A55] mb-3 font-medium flex items-center gap-2">
                <Heart size={18} className="text-[#E7A5A0]" />
                {guidanceData.deep_wisdom.title}
              </h4>
              <p className="text-[#6E6259] leading-relaxed mb-3 whitespace-pre-wrap break-words">
                {guidanceData.deep_wisdom.explanation}
              </p>
              <div className="text-sm text-[#6E6259]/80 space-y-2">
                <p><strong>Philosophical Meaning:</strong> <span className="whitespace-pre-wrap break-words">{guidanceData.deep_wisdom.philosophical_meaning}</span></p>
                <p><strong>Personal Interpretation:</strong> <span className="whitespace-pre-wrap break-words">{guidanceData.deep_wisdom.personal_interpretation}</span></p>
              </div>
            </Card>
          </motion.div>

          {/* Action Guide */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            <Card className="p-6 mb-6 bg-gradient-to-br from-[#2B3A55]/10 to-white border-[#2B3A55]/20">
              <h4 className="text-lg text-[#2B3A55] mb-4 font-medium">
                ✨ {guidanceData.action_guide.title}
              </h4>
              
              {/* Main Actions */}
              <div className="space-y-3 mb-4">
                <h5 className="font-medium text-[#2B3A55] text-sm">Main Actions:</h5>
                {guidanceData.action_guide.main_actions.map((action: string, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 1.1 + (index * 0.1) }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-2 h-2 bg-[#7BAEA5] rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-[#6E6259] leading-relaxed whitespace-pre-wrap break-words">{action}</p>
                  </motion.div>
                ))}
              </div>
              
              {/* Supporting Actions */}
              <div className="space-y-3">
                <h5 className="font-medium text-[#2B3A55] text-sm">Supporting Actions:</h5>
                {guidanceData.action_guide.supporting_actions.map((action: string, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 1.3 + (index * 0.1) }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-2 h-2 bg-[#E7A5A0] rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-[#6E6259] leading-relaxed whitespace-pre-wrap break-words">{action}</p>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Summary */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <Card className="p-6 mb-6 bg-gradient-to-br from-[#7BAEA5]/10 to-white border-[#7BAEA5]/20">
              <h4 className="text-lg text-[#2B3A55] mb-4 font-medium">
                🎯 {guidanceData.summary.title}
              </h4>
              
              {/* Situation Code */}
              <div className="space-y-3 mb-4">
                <h5 className="font-medium text-[#2B3A55] text-sm">Situation Assessment:</h5>
                <p className="text-[#6E6259] leading-relaxed whitespace-pre-wrap break-words">
                  {guidanceData.summary.situation_code}
                </p>
              </div>
              
              {/* Core Strategy */}
              <div className="space-y-3 mb-4">
                <h5 className="font-medium text-[#2B3A55] text-sm">Core Strategy:</h5>
                <p className="text-[#6E6259] leading-relaxed whitespace-pre-wrap break-words">
                  {guidanceData.summary.core_strategy}
                </p>
              </div>
              
              {/* Action Guide Steps */}
              <div className="space-y-3">
                <h5 className="font-medium text-[#2B3A55] text-sm">Action Steps:</h5>
                {guidanceData.summary.action_guide.map((step: string, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 1.4 + (index * 0.1) }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-6 h-6 bg-[#7BAEA5] rounded-full flex items-center justify-center text-white text-xs font-medium flex-shrink-0">
                      {index + 1}
                    </div>
                    <p className="text-[#6E6259] leading-relaxed whitespace-pre-wrap break-words">{step}</p>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Encouragement */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <Card className="p-6 mb-8 bg-gradient-to-br from-[#E7A5A0]/10 to-white border-[#E7A5A0]/20">
              <p className="text-[#6E6259] leading-relaxed italic text-center whitespace-pre-wrap break-words">
                {guidanceData.action_guide.inspirational_message}
              </p>
            </Card>
          </motion.div>

          {/* Centered Ask Again Button */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.8 }}
            className="flex justify-center mb-8"
          >
            <button
              onClick={() => {
                setShowGuidance(false);
                setQuestion("");
                setCompassRotation(0);
                setGuidanceData(null);
                setError(null);
                // 清除localStorage中的数据
                clearFromLocalStorage();
              }}
              className="px-8 py-3 text-[#7BAEA5] border border-[#7BAEA5]/30 rounded-lg hover:bg-[#7BAEA5]/10 transition-colors font-medium"
            >
              Ask Again
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8F5F0] to-[#7BAEA5]/10 px-6 py-8">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-6"
        >
          <h2 className="text-3xl text-[#2B3A55] mb-3 font-['Playfair_Display']">
            Heart Compass
          </h2>
          <p className="text-[#6E6259] leading-relaxed mb-6">
            Share what weighs on your heart, and receive gentle guidance from ancient wisdom
          </p>
          
          {/* Large Centered Compass */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex justify-center mb-8"
          >
            <motion.div
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <IChing64Compass size={220} isAnimated={true} />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Compressed Question Input */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="p-6 bg-white/80 backdrop-blur-sm border-[#7BAEA5]/20 shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-3">
                <label className="text-[#2B3A55] font-medium block text-center">
                  What guidance do you seek?
                </label>
                <Textarea
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder={getRandomPlaceholder()}
                  className="bg-white/60 border-[#7BAEA5]/30 focus:border-[#7BAEA5] rounded-lg min-h-24 resize-none text-center"
                  required
                />
                {error && (
                  <p className="text-red-500 text-sm text-center mt-2">{error}</p>
                )}
                <p className="text-xs text-[#6E6259]/70 text-center">
                  Speak from your heart - the more sincere your question, the clearer the guidance
                </p>
              </div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  type="submit"
                  disabled={!question.trim()}
                  className="w-full bg-gradient-to-r from-[#7BAEA5] to-[#E7A5A0] hover:from-[#6A9B91] hover:to-[#D89590] text-white py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <motion.div
                    animate={question.trim() ? { scale: [1, 1.05, 1] } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="flex items-center gap-2"
                  >
                    <Send size={18} />
                    Seek Guidance
                  </motion.div>
                </Button>
              </motion.div>
            </form>
          </Card>
        </motion.div>

        {/* Water ripple effect */}
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 pointer-events-none">
          <motion.div
            animate={{ scale: [1, 1.5], opacity: [0.3, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeOut" }}
            className="w-40 h-40 border border-[#7BAEA5]/20 rounded-full"
          />
          <motion.div
            animate={{ scale: [1, 2], opacity: [0.2, 0] }}
            transition={{ duration: 4, repeat: Infinity, delay: 1, ease: "easeOut" }}
            className="absolute inset-0 w-40 h-40 border border-[#E7A5A0]/20 rounded-full"
          />
        </div>
      </div>
    </div>
  );
}