import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { useState } from "react";
import { ImageWithFallback } from './figma/ImageWithFallback';

export function OnboardingScreen({ onContinue }: { onContinue: () => void }) {
  const [isClicked, setIsClicked] = useState(false);

  const handleContinue = () => {
    setIsClicked(true);
    console.log("Begin Journey button clicked"); 
    
    // Add brief delay to show click feedback
    setTimeout(() => {
      onContinue();
    }, 200);
  };

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center px-8 relative overflow-hidden"
      style={{
        backgroundImage: `url('/images/ink-painting-background.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Content wrapper - moved up by 50px */}
      <div className="relative w-full flex flex-col items-center justify-center" style={{ transform: 'translateY(-50px)' }}>

      {/* Lotus Logo Animation */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0, rotate: -5 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ 
          duration: 1.5,
          ease: "easeOut",
          scale: { type: "spring", stiffness: 100 }
        }}
        className="mb-8"
      >
        <div className="relative">
          {/* Lotus petals */}
          <div className="w-24 h-24 relative">
            <div className="absolute inset-0 bg-[#7BAEA5] rounded-full opacity-20"></div>
            <div className="absolute top-2 left-2 right-2 bottom-2 bg-[#E7A5A0] rounded-full opacity-30"></div>
            <div className="absolute top-4 left-4 right-4 bottom-4 flex items-center justify-center">
              <ImageWithFallback 
                src="/images/moon-image.jpg"
                alt="Moon" 
                className="w-full h-full rounded-full opacity-80 object-cover" 
              />
            </div>

          </div>
          
          {/* Water ripples */}
          <motion.div
            animate={{ scale: [1, 1.4], opacity: [0.6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
            className="absolute -inset-4 border border-[#7BAEA5] rounded-full opacity-30"
          />
          <motion.div
            animate={{ scale: [1, 1.6], opacity: [0.4, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5, ease: "easeOut" }}
            className="absolute -inset-6 border border-[#E7A5A0] rounded-full opacity-20"
          />
        </div>
      </motion.div>

      {/* App Title */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 1 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl text-[#F8F5F0] mb-4 font-['Playfair_Display']">
          Realm of Balance
        </h1>
        <p className="text-[#F8F5F0]/80 text-lg px-4 leading-relaxed">
          Discover your balance
        </p>
      </motion.div>

      {/* Continue Button - show immediately, no delay */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="mt-8 z-50 relative"
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={isClicked ? { scale: [1, 0.95, 1.1, 1] } : {}}
          transition={{ duration: 0.3 }}
        >
          <Button
            onClick={handleContinue}
            disabled={isClicked}
            className={`
              px-16 py-5 rounded-full font-semibold text-lg shadow-lg transition-all duration-300 cursor-pointer
              ${isClicked 
                ? 'bg-[#6A9B91] text-[#2B3A55]' 
                : 'bg-[#7BAEA5] hover:bg-[#6A9B91] text-[#2B3A55] hover:shadow-xl'
              }
            `}
            style={{ 
              pointerEvents: 'auto',
              zIndex: 50,
              position: 'relative'
            }}
          >
            {isClicked ? 'Starting Journey...' : 'Begin Journey'}
          </Button>
        </motion.div>
      </motion.div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#7BAEA5] rounded-full"
            style={{
              left: `${20 + (i * 12)}%`,
              top: `${30 + (i * 8)}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              x: [-10, 10, -10],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      </div> {/* End content wrapper */}
    </div>
  );
}