import { useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Card } from "./ui/card";
import { motion } from "framer-motion";
import { Heart, Send } from "lucide-react";
import { IChing64Compass } from "./IChing64Compass";

const qianHexagramData = {
  code: "乾 (Qián)",
  title: "The Creative, Heaven",
  insight: "Heaven moves with strength, and the wise person strives constantly for self-improvement",
  analysis: "The Qián hexagram symbolizes the power of Heaven — pure yang, strength, and eternal movement. This is the most powerful hexagram among the 64, representing creativity, leadership, and infinite possibilities. When Qián appears, the universe is telling you that now is the time to manifest your inner strength and creative gifts. Just as the sky never ceases its movement, you are called to continue growing and progressing.",
  actionGuide: [
    "Trust in your inner creativity and leadership abilities",
    "Take initiative and become a catalyst for positive change", 
    "Maintain strong will while leading with virtue and compassion",
    "Transform your vision into concrete action plans"
  ],
  encouragement: "The energy of Qián flows through you, meaning you have the power to change your current situation. Heaven moves with vigor, and the wise person strengthens themselves unceasingly. Your persistence and efforts will bring unexpected results."
};

const exampleQuestions = [
  "How should I face my current life challenges?",
  "What is blocking my inner peace?", 
  "How can I find true happiness in love?",
  "What is my life's purpose?",
  "How can I balance work and life?",
  "What can help me gain inner strength?"
];

export function HeartCompass({ onSubmit }: { onSubmit?: (data: any) => void }) {
  const [question, setQuestion] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showGuidance, setShowGuidance] = useState(false);
  const [compassRotation, setCompassRotation] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;
    
    setIsProcessing(true);
    setCompassRotation(0);
    
    // Simulate compass spinning and landing on Qián hexagram
    setTimeout(() => {
      // Rotate to point to Qián position (top, 0 degrees adjusted for compass orientation)
      setCompassRotation(45); // Qián position on the compass
    }, 1000);
    
    setTimeout(() => {
      setIsProcessing(false);
      setShowGuidance(true);
    }, 4000);
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
              Compass points to Qián hexagram...
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  if (showGuidance) {
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
                {qianHexagramData.code}
              </div>
              <h3 className="text-xl text-[#2B3A55] mb-3 font-['Playfair_Display']">
                {qianHexagramData.title}
              </h3>
              <p className="text-[#6E6259] italic leading-relaxed">
                "{qianHexagramData.insight}"
              </p>
            </Card>
          </motion.div>

          {/* Analysis */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="p-6 mb-6 bg-white/80 backdrop-blur-sm border-[#E7A5A0]/20">
              <h4 className="text-lg text-[#2B3A55] mb-3 font-medium flex items-center gap-2">
                <Heart size={18} className="text-[#E7A5A0]" />
                Deep Wisdom
              </h4>
              <p className="text-[#6E6259] leading-relaxed">
                {qianHexagramData.analysis}
              </p>
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
                ✨ Action Guide
              </h4>
              <div className="space-y-3">
                {qianHexagramData.actionGuide.map((action, index) => (
                  <motion.div
                    key={index}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 1.2 + (index * 0.2) }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-2 h-2 bg-[#7BAEA5] rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-[#6E6259] leading-relaxed">{action}</p>
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
              <p className="text-[#6E6259] leading-relaxed italic text-center">
                {qianHexagramData.encouragement}
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