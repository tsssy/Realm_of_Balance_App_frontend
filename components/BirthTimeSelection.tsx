import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card } from "./ui/card";
import { motion } from "framer-motion";
import { Calendar, Clock, Sun, Moon, Sunrise, Sunset } from "lucide-react";
import { ImageWithFallback } from './figma/ImageWithFallback';

export function BirthTimeSelection({ onBirthTimeSelect }: { onBirthTimeSelect: (birthDate: string, birthTime: string) => void }) {
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [year, setYear] = useState("");
  const [birthTime, setBirthTime] = useState("");
  const [timeOfDay, setTimeOfDay] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isDateValid) {
      // Format date as YYYY-MM-DD for consistency
      const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
      onBirthTimeSelect(formattedDate, birthTime);
    }
  };

  const isDateValid = month && day && year && 
    parseInt(month) >= 1 && parseInt(month) <= 12 &&
    parseInt(day) >= 1 && parseInt(day) <= 31 &&
    parseInt(year) >= 1900 && parseInt(year) <= new Date().getFullYear();

  const getTimeIcon = () => {
    if (!birthTime) return <Clock size={24} className="text-[#7BAEA5]" />;
    
    const hour = parseInt(birthTime.split(':')[0]);
    if (hour >= 5 && hour < 12) return <Sunrise size={24} className="text-[#E7A5A0]" />;
    if (hour >= 12 && hour < 17) return <Sun size={24} className="text-[#F4D03F]" />;
    if (hour >= 17 && hour < 21) return <Sunset size={24} className="text-[#E7A5A0]" />;
    return <Moon size={24} className="text-[#7BAEA5]" />;
  };

  const getTimeMessage = () => {
    if (!birthTime) return "Please enter your birth date and time to continue.";
    
    const hour = parseInt(birthTime.split(':')[0]);
    if (hour >= 5 && hour < 12) return "Born with the rising sun, carrying energy of new beginnings";
    if (hour >= 12 && hour < 17) return "Born in the full light, blessed with clarity and vitality";
    if (hour >= 17 && hour < 21) return "Born as day transforms to evening, gifted with wisdom and reflection";
    return "Born under the moon's gentle gaze, touched by intuition and mystery";
  };

  // Format date to display in MM/DD/YYYY format for US users
  const formatDateForDisplay = () => {
    if (!month || !day || !year) return "";
    return `${month.padStart(2, '0')}/${day.padStart(2, '0')}/${year}`;
  };

  return (
    <div 
      className="min-h-screen px-6 pt-20 pb-8 relative"
      style={{
        background: `
          linear-gradient(135deg, rgba(43, 58, 85, 0.2) 0%, rgba(123, 174, 165, 0.3) 50%, rgba(248, 245, 240, 0.8) 100%),
          url('/images/birth-time-background.jpg')
        `,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Fallback gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#2B3A55]/10 via-[#7BAEA5]/15 to-[#F8F5F0]/90"></div>
      
      {/* Content overlay for better readability */}
      <div className="absolute inset-0 bg-white/15 backdrop-blur-[0.5px]"></div>
      
      <div className="relative z-10">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl text-[#2B3A55] mb-4 font-['Playfair_Display']">
            When were you born?
          </h2>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-8 bg-white/80 backdrop-blur-sm border-[#7BAEA5]/20 shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Birth Date */}
              <div className="space-y-3">
                <Label className="text-[#2B3A55] flex items-center gap-2 text-lg font-medium">
                  <Calendar size={16} className="text-[#7BAEA5]" />
                  DATE OF BIRTH
                </Label>
                
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <Input
                      type="number"
                      placeholder="MONTH"
                      value={month}
                      onChange={(e) => setMonth(e.target.value)}
                      className="bg-white/60 border border-[#7BAEA5]/30 focus:border-[#7BAEA5] rounded-xl text-center text-[#2B3A55] placeholder-[#6E6259]/50 text-lg py-4 font-medium"
                      min="1"
                      max="12"
                    />
                  </div>
                  <div className="text-[#6E6259] text-2xl font-light">/</div>
                  <div className="flex-1">
                    <Input
                      type="number"
                      placeholder="DAY"
                      value={day}
                      onChange={(e) => setDay(e.target.value)}
                      className="bg-white/60 border border-[#7BAEA5]/30 focus:border-[#7BAEA5] rounded-xl text-center text-[#2B3A55] placeholder-[#6E6259]/50 text-lg py-4 font-medium"
                      min="1"
                      max="31"
                    />
                  </div>
                  <div className="text-[#6E6259] text-2xl font-light">/</div>
                  <div className="flex-1">
                    <Input
                      type="number"
                      placeholder="YEAR"
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      className="bg-white/60 border border-[#7BAEA5]/30 focus:border-[#7BAEA5] rounded-xl text-center text-[#2B3A55] placeholder-[#6E6259]/50 text-lg py-4 font-medium"
                      min="1900"
                      max={new Date().getFullYear()}
                    />
                  </div>
                </div>
                

                {isDateValid && (
                  <p className="text-sm text-[#6E6259] italic">
                    Selected: {formatDateForDisplay()}
                  </p>
                )}
              </div>

              {/* Birth Time */}
              <div className="space-y-3">
                <Label className="text-[#2B3A55] flex items-center gap-2">
                  <Clock size={16} className="text-[#E7A5A0]" />
                  Time of Birth (Optional)
                </Label>
                <Input
                  type="time"
                  value={birthTime}
                  onChange={(e) => setBirthTime(e.target.value)}
                  className="bg-white/60 border-[#7BAEA5]/30 focus:border-[#7BAEA5] rounded-lg text-lg py-3"
                />
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setBirthTime("12:00")} // Set default noon time
                  className="text-xs text-[#6E6259]/70 hover:text-[#7BAEA5] underline-offset-2 hover:underline transition-colors leading-relaxed text-left"
                >
                  what if i don't know my birth time?
                </motion.button>
              </div>

              {/* Quick Time Options */}
              {!birthTime && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="space-y-3"
                >
                  <Label className="text-[#2B3A55] text-sm">
                    Or select a time period:
                  </Label>
                  <div className="grid grid-cols-2 gap-3">
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setBirthTime("07:00")}
                      className="p-4 border border-[#E7A5A0]/30 rounded-xl hover:bg-[#E7A5A0]/10 transition-colors text-left"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <Sunrise size={16} className="text-[#E7A5A0]" />
                        <span className="text-sm font-medium text-[#2B3A55]">Morning</span>
                      </div>
                      <span className="text-xs text-[#6E6259]">5:00 AM - 12:00 PM</span>
                    </motion.button>
                    
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setBirthTime("14:00")}
                      className="p-4 border border-[#F4D03F]/30 rounded-xl hover:bg-[#F4D03F]/10 transition-colors text-left"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <Sun size={16} className="text-[#F4D03F]" />
                        <span className="text-sm font-medium text-[#2B3A55]">Afternoon</span>
                      </div>
                      <span className="text-xs text-[#6E6259]">12:00 PM - 5:00 PM</span>
                    </motion.button>
                    
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setBirthTime("19:00")}
                      className="p-4 border border-[#E7A5A0]/30 rounded-xl hover:bg-[#E7A5A0]/10 transition-colors text-left"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <Sunset size={16} className="text-[#E7A5A0]" />
                        <span className="text-sm font-medium text-[#2B3A55]">Evening</span>
                      </div>
                      <span className="text-xs text-[#6E6259]">5:00 PM - 9:00 PM</span>
                    </motion.button>
                    
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setBirthTime("02:00")}
                      className="p-4 border border-[#7BAEA5]/30 rounded-xl hover:bg-[#7BAEA5]/10 transition-colors text-left"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <Moon size={16} className="text-[#7BAEA5]" />
                        <span className="text-sm font-medium text-[#2B3A55]">Night</span>
                      </div>
                      <span className="text-xs text-[#6E6259]">9:00 PM - 5:00 AM</span>
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {/* Submit Button */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="pt-4"
              >
                <Button
                  type="submit"
                  disabled={!isDateValid}
                  className="w-full bg-gradient-to-r from-[#7BAEA5] to-[#E7A5A0] hover:from-[#6A9B91] hover:to-[#D89590] text-white py-4 rounded-lg font-medium text-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
                >
                  Continue Journey
                </Button>
              </motion.div>
            </form>
          </Card>
        </motion.div>

        {/* Progress indicator */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex justify-center items-center gap-2 mt-8"
        >
          <div className="w-3 h-3 bg-[#7BAEA5] rounded-full"></div>
          <div className="w-3 h-3 bg-[#7BAEA5] rounded-full"></div>
          <div className="w-3 h-3 bg-[#7BAEA5]/30 rounded-full"></div>
        </motion.div>

        {/* Cosmic elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Stars */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-[#7BAEA5] rounded-full"
              style={{
                left: `${15 + (i * 15)}%`,
                top: `${20 + (i * 12)}%`,
              }}
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [0.8, 1.2, 0.8]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeInOut"
              }}
            />
          ))}
          
          {/* Floating time symbols */}
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute top-16 right-12 opacity-20"
          >
            <Clock size={32} className="text-[#E7A5A0]" />
          </motion.div>
        </div>
      </div>
      </div>
    </div>
  );
}