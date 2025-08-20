import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card } from "./ui/card";
import { motion } from "framer-motion";
import { MapPin, Globe, Compass } from "lucide-react";
import { ImageWithFallback } from './figma/ImageWithFallback';

export function BirthLocationSelection({ onLocationSelect }: { onLocationSelect: (location: string) => void }) {
  const [location, setLocation] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (location.trim()) {
      onLocationSelect(location.trim());
    }
  };

  return (
    <div 
      className="min-h-screen px-6 pt-20 pb-8 relative"
      style={{
        background: `
          linear-gradient(135deg, rgba(43, 58, 85, 0.1) 0%, rgba(123, 174, 165, 0.2) 50%, rgba(248, 245, 240, 0.9) 100%),
          url('/images/birth-location-background.jpg')
        `,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Fallback gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#F8F5F0]/90 via-[#7BAEA5]/20 to-[#2B3A55]/10"></div>
      
      {/* Content overlay for better readability */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-[0.5px]"></div>
      
      <div className="relative z-10">
      <div className="max-w-md mx-auto mt-[50px]">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl text-[#2B3A55] mb-4 font-['Playfair_Display']">
            Where were you born?
          </h2>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-8 bg-white/80 backdrop-blur-sm border-[#E7A5A0]/20 shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Birth Location */}
              <div className="space-y-3">
                <Label className="text-[#2B3A55] text-[1.2rem]">
                  Birth Location
                </Label>
                <Input
                  type="text"
                  placeholder="e.g., New York, NY, USA"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="bg-white/60 border-[#E7A5A0]/30 focus:border-[#E7A5A0] rounded-lg text-lg py-3"
                  required
                />
                <p className="text-xs text-[#6E6259]/70 leading-relaxed">
                  Enter city, state/province, and country. The more specific, the more precise your celestial coordinates.
                </p>
              </div>

              {/* Submit Button */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="pt-4"
              >
                <Button
                  type="submit"
                  disabled={!location.trim()}
                  className="w-full bg-gradient-to-r from-[#E7A5A0] to-[#7BAEA5] hover:from-[#D89590] hover:to-[#6A9B91] text-white py-4 rounded-lg font-medium text-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
                >
                  Complete Blueprint
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
          <div className="w-3 h-3 bg-[#7BAEA5] rounded-full"></div>
        </motion.div>

        {/* Mystical elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Floating compass points */}
          {['N', 'S', 'E', 'W'].map((direction, i) => (
            <motion.div
              key={direction}
              className="absolute text-[#7BAEA5]/20 font-bold text-2xl"
              style={{
                left: i === 0 || i === 1 ? '50%' : i === 2 ? '80%' : '20%',
                top: i === 0 ? '20%' : i === 1 ? '80%' : '50%',
                transform: 'translate(-50%, -50%)'
              }}
              animate={{
                opacity: [0.2, 0.5, 0.2],
                scale: [0.8, 1, 0.8]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeInOut"
              }}
            >
              {direction}
            </motion.div>
          ))}

          {/* Orbital rings */}
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 flex items-center justify-center opacity-10"
          >
            <div className="w-80 h-80 border-2 border-[#E7A5A0] rounded-full"></div>
          </motion.div>

          <motion.div
            animate={{ rotate: [360, 0] }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 flex items-center justify-center opacity-10"
          >
            <div className="w-96 h-96 border border-[#7BAEA5] rounded-full"></div>
          </motion.div>

          {/* Twinkling stars */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-[#E7A5A0] rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0.5, 1.5, 0.5]
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut"
              }}
            />
          ))}

          {/* Floating globe */}
          <motion.div
            animate={{ 
              y: [-10, 10, -10],
              rotate: [0, 360]
            }}
            transition={{ 
              y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: 30, repeat: Infinity, ease: "linear" }
            }}
            className="absolute top-20 left-12 opacity-20"
          >
            <Globe size={40} className="text-[#7BAEA5]" />
          </motion.div>
        </div>
      </div>
      </div>
    </div>
  );
}