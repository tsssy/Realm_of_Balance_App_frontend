import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { motion } from "framer-motion";
import { Sparkles, Heart } from "lucide-react";

export function GenderSelection({ onGenderSelect }: { onGenderSelect: (gender: string) => void }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8F5F0] to-[#7BAEA5]/10 px-6 py-8">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <div className="w-16 h-16 bg-gradient-to-br from-[#7BAEA5] to-[#E7A5A0] rounded-full mx-auto mb-6 flex items-center justify-center">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Sparkles size={24} className="text-white" />
            </motion.div>
          </div>
          <h2 className="text-3xl text-[#2B3A55] mb-4 font-['Playfair_Display']">
            Honor Your Essence
          </h2>
          <p className="text-[#6E6259] leading-relaxed px-4">
            How do you wish to be addressed on this journey of self-discovery?
          </p>
        </motion.div>

        {/* Gender Options */}
        <div className="space-y-4 mb-8">
          {/* Female */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card 
              className="p-8 bg-gradient-to-br from-[#E7A5A0]/10 to-white border-[#E7A5A0]/20 shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300"
              onClick={() => onGenderSelect('female')}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#E7A5A0] rounded-full flex items-center justify-center">
                  <Heart size={24} className="text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl text-[#2B3A55] mb-2 font-['Playfair_Display']">
                    Beautiful Soul
                  </h3>
                  <p className="text-[#6E6259] leading-relaxed">
                    Embrace the divine feminine energy within you, connecting with intuition and nurturing wisdom.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Male */}
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card 
              className="p-8 bg-gradient-to-br from-[#7BAEA5]/10 to-white border-[#7BAEA5]/20 shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300"
              onClick={() => onGenderSelect('male')}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#7BAEA5] rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 border-2 border-white rounded-full bg-transparent"></div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl text-[#2B3A55] mb-2 font-['Playfair_Display']">
                    Wise Spirit
                  </h3>
                  <p className="text-[#6E6259] leading-relaxed">
                    Honor the divine masculine energy, channeling strength, protection, and mindful action.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Non-binary/Other */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card 
              className="p-8 bg-gradient-to-br from-[#6E6259]/10 to-white border-[#6E6259]/20 shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300"
              onClick={() => onGenderSelect('other')}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#6E6259] rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 relative">
                    <div className="absolute inset-0 w-3 h-3 bg-white rounded-full"></div>
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-white/70 rounded-full"></div>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl text-[#2B3A55] mb-2 font-['Playfair_Display']">
                    Sacred Being
                  </h3>
                  <p className="text-[#6E6259] leading-relaxed">
                    Transcend traditional boundaries, embracing the full spectrum of human experience and energy.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Progress indicator */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="flex justify-center items-center gap-2"
        >
          <div className="w-3 h-3 bg-[#7BAEA5] rounded-full"></div>
          <div className="w-3 h-3 bg-[#7BAEA5]/30 rounded-full"></div>
          <div className="w-3 h-3 bg-[#7BAEA5]/30 rounded-full"></div>
        </motion.div>

        {/* Decorative elements */}
        <div className="absolute top-20 right-8 opacity-20 pointer-events-none">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <div className="w-16 h-16 border-2 border-[#7BAEA5] rounded-full"></div>
          </motion.div>
        </div>
        <div className="absolute bottom-32 left-8 opacity-20 pointer-events-none">
          <div className="w-0 h-0 border-l-8 border-r-8 border-b-12 border-transparent border-b-[#E7A5A0]"></div>
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-[#7BAEA5] rounded-full"
              style={{
                left: `${25 + (i * 20)}%`,
                top: `${40 + (i * 10)}%`,
              }}
              animate={{
                y: [-10, 10, -10],
                opacity: [0.3, 0.8, 0.3]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 0.8,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}