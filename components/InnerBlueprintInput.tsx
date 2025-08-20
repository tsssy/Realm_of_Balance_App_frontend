import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card } from "./ui/card";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin } from "lucide-react";

export function InnerBlueprintInput({ onSubmit }: { onSubmit: (data: any) => void }) {
  const [formData, setFormData] = useState({
    birthDate: "",
    birthTime: "",
    birthLocation: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate ritual animation delay
    setTimeout(() => {
      onSubmit(formData);
    }, 3000);
  };

  if (isSubmitting) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#F8F5F0] to-[#7BAEA5]/20 flex flex-col items-center justify-center px-8">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <div className="relative mb-8">
            {/* Central energy circle */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="w-32 h-32 border-4 border-[#7BAEA5]/30 rounded-full relative mx-auto"
            >
              <div className="absolute inset-4 border-2 border-[#E7A5A0]/50 rounded-full">
                <div className="absolute inset-3 bg-gradient-to-br from-[#7BAEA5]/20 to-[#E7A5A0]/20 rounded-full"></div>
              </div>
            </motion.div>

            {/* Flying particles */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-[#7BAEA5] rounded-full"
                style={{
                  left: "50%",
                  top: "50%",
                }}
                animate={{
                  x: [0, Math.cos(i * 30 * Math.PI / 180) * 100],
                  y: [0, Math.sin(i * 30 * Math.PI / 180) * 100],
                  scale: [1, 0.5, 0],
                  opacity: [1, 0.8, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.1,
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
              Weaving Your Blueprint
            </h3>
            <p className="text-[#6E6259]">
              Your energy is transforming into wisdom...
            </p>
          </motion.div>
        </motion.div>
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
          className="text-center mb-8"
        >
          <h2 className="text-3xl text-[#2B3A55] mb-3 font-['Playfair_Display']">
            Inner Blueprint
          </h2>
          <p className="text-[#6E6259] leading-relaxed">
            Share your birth details to unveil the patterns of your soul's journey
          </p>
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
              <div className="space-y-2">
                <Label className="text-[#2B3A55] flex items-center gap-2">
                  <Calendar size={16} className="text-[#7BAEA5]" />
                  Date of Birth
                </Label>
                <Input
                  type="date"
                  value={formData.birthDate}
                  onChange={(e) => setFormData({...formData, birthDate: e.target.value})}
                  className="bg-white/60 border-[#7BAEA5]/30 focus:border-[#7BAEA5] rounded-lg"
                  required
                />
              </div>

              {/* Birth Time */}
              <div className="space-y-2">
                <Label className="text-[#2B3A55] flex items-center gap-2">
                  <Clock size={16} className="text-[#E7A5A0]" />
                  Time of Birth
                </Label>
                <Input
                  type="time"
                  value={formData.birthTime}
                  onChange={(e) => setFormData({...formData, birthTime: e.target.value})}
                  className="bg-white/60 border-[#7BAEA5]/30 focus:border-[#7BAEA5] rounded-lg"
                  placeholder="Optional - enhances accuracy"
                />
                <p className="text-xs text-[#6E6259]/70">
                  Optional - enhances the depth of your reading
                </p>
              </div>

              {/* Birth Location */}
              <div className="space-y-2">
                <Label className="text-[#2B3A55] flex items-center gap-2">
                  <MapPin size={16} className="text-[#E7A5A0]" />
                  Place of Birth
                </Label>
                <Input
                  type="text"
                  value={formData.birthLocation}
                  onChange={(e) => setFormData({...formData, birthLocation: e.target.value})}
                  className="bg-white/60 border-[#7BAEA5]/30 focus:border-[#7BAEA5] rounded-lg"
                  placeholder="City, Country"
                  required
                />
              </div>

              {/* Submit Button */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="pt-4"
              >
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#7BAEA5] to-[#E7A5A0] hover:from-[#6A9B91] hover:to-[#D89590] text-white py-4 rounded-lg font-medium text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Reveal My Blueprint
                </Button>
              </motion.div>
            </form>
          </Card>
        </motion.div>

        {/* Decorative elements */}
        <div className="absolute top-20 right-8 opacity-20">
          <div className="w-16 h-16 border-2 border-[#7BAEA5] rounded-full"></div>
        </div>
        <div className="absolute bottom-32 left-8 opacity-20">
          <div className="w-0 h-0 border-l-8 border-r-8 border-b-12 border-transparent border-b-[#E7A5A0]"></div>
        </div>
      </div>
    </div>
  );
}