import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { IChing64Compass } from "./IChing64Compass";

interface ImageCompassProps {
  size?: number;
  isAnimated?: boolean;
  rotation?: number;
  onHexagramSelect?: (hexagram: string) => void;
}

// 64卦按传统顺序排列（对应图片中的位置）
const hexagrams = [
  { name: '乾', meaning: 'Heaven', angle: 0 },
  { name: '夬', meaning: 'Breakthrough', angle: 11.25 },
  { name: '大有', meaning: 'Great Possession', angle: 22.5 },
  { name: '大壮', meaning: 'Great Power', angle: 33.75 },
  { name: '小畜', meaning: 'Small Taming', angle: 45 },
  { name: '需', meaning: 'Waiting', angle: 56.25 },
  { name: '大畜', meaning: 'Great Taming', angle: 67.5 },
  { name: '泰', meaning: 'Peace', angle: 78.75 },
  { name: '履', meaning: 'Conduct', angle: 90 },
  { name: '兑', meaning: 'Joy', angle: 101.25 },
  { name: '睽', meaning: 'Opposition', angle: 112.5 },
  { name: '归妹', meaning: 'Marrying Maiden', angle: 123.75 },
  { name: '中孚', meaning: 'Inner Truth', angle: 135 },
  { name: '节', meaning: 'Limitation', angle: 146.25 },
  { name: '损', meaning: 'Decrease', angle: 157.5 },
  { name: '临', meaning: 'Approach', angle: 168.75 },
  { name: '离', meaning: 'Fire', angle: 180 },
  { name: '噬嗑', meaning: 'Biting Through', angle: 191.25 },
  { name: '贲', meaning: 'Grace', angle: 202.5 },
  { name: '既济', meaning: 'After Completion', angle: 213.75 },
  { name: '井', meaning: 'The Well', angle: 225 },
  { name: '困', meaning: 'Oppression', angle: 236.25 },
  { name: '未济', meaning: 'Before Completion', angle: 247.5 },
  { name: '解', meaning: 'Deliverance', angle: 258.75 },
  { name: '涣', meaning: 'Dispersion', angle: 270 },
  { name: '坎', meaning: 'Water', angle: 281.25 },
  { name: '蒙', meaning: 'Youthful Folly', angle: 292.5 },
  { name: '师', meaning: 'The Army', angle: 303.75 },
  { name: '遁', meaning: 'Retreat', angle: 315 },
  { name: '咸', meaning: 'Influence', angle: 326.25 },
  { name: '旅', meaning: 'The Wanderer', angle: 337.5 },
  { name: '小过', meaning: 'Small Exceeding', angle: 348.75 }
];

// 内圈8卦 
const trigrams = [
  { name: '乾', meaning: 'Heaven', angle: 0 },
  { name: '兑', meaning: 'Joy', angle: 45 },
  { name: '离', meaning: 'Fire', angle: 90 },
  { name: '震', meaning: 'Thunder', angle: 135 },
  { name: '巽', meaning: 'Wind', angle: 180 },
  { name: '坎', meaning: 'Water', angle: 225 },
  { name: '艮', meaning: 'Mountain', angle: 270 },
  { name: '坤', meaning: 'Earth', angle: 315 }
];

export function ImageCompass({ 
  size = 300, 
  isAnimated = false, 
  rotation = 0,
  onHexagramSelect 
}: ImageCompassProps) {
  const [needleRotation, setNeedleRotation] = useState(rotation);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    setNeedleRotation(rotation);
    
    // Check if compass image exists
    const img = new Image();
    img.onload = () => setImageLoaded(true);
    img.onerror = () => setImageLoaded(false);
    img.src = '/images/compass-image.png';
  }, [rotation]);

  // If compass image is not available, fallback to IChing64Compass
  if (!imageLoaded) {
    return (
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        <IChing64Compass 
          size={size} 
          isAnimated={isAnimated}
          className="drop-shadow-2xl"
        />
        
        {/* Notify user about fallback */}
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-[#6E6259] opacity-70 text-center">
          Using fallback compass
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      {/* 主体罗盘图片 */}
      <motion.div
        className="relative w-full h-full"
        animate={isAnimated ? { 
          scale: [1, 1.02, 1],
          rotate: [0, 1, 0]
        } : {}}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <img
          src="/images/compass-image.png"
          alt="I Ching Compass"
          className="w-full h-full object-contain drop-shadow-2xl"
          style={{
            filter: `
              drop-shadow(0 8px 32px rgba(59, 130, 246, 0.15))
              drop-shadow(0 4px 16px rgba(0, 0, 0, 0.1))
            `
          }}
          onError={(e) => {
            // If image fails to load, set fallback state
            setImageLoaded(false);
          }}
        />
      </motion.div>

      {/* 外圈64卦可点击区域 */}
      <div className="absolute inset-0">
        {hexagrams.map((hexagram, index) => {
          const actualIndex = index * 2; // 因为只显示了一半的卦
          const angle = actualIndex * (360 / 64) - 90; // -90 to start from top
          const radius = size * 0.35;
          const x = radius * Math.cos(angle * Math.PI / 180);
          const y = radius * Math.sin(angle * Math.PI / 180);
          
          return (
            <motion.div
              key={`${hexagram.name}-${index}`}
              className="absolute flex items-center justify-center cursor-pointer group"
              style={{
                left: `50%`,
                top: `50%`,
                transform: `translate(${x - 15}px, ${y - 15}px)`,
                width: '30px',
                height: '30px'
              }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onHexagramSelect?.(hexagram.name)}
            >
              <div className="w-7 h-7 bg-transparent rounded-full flex items-center justify-center hover:bg-blue-500/20 transition-colors duration-200">
                {/* 透明的可点击区域 */}
              </div>
              
              {/* Tooltip */}
              <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white px-3 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 shadow-lg">
                {hexagram.name} - {hexagram.meaning}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* 内圈8卦可点击区域 */}
      <div className="absolute inset-0">
        {trigrams.map((trigram, index) => {
          const angle = trigram.angle - 90;
          const radius = size * 0.18;
          const x = radius * Math.cos(angle * Math.PI / 180);
          const y = radius * Math.sin(angle * Math.PI / 180);
          
          return (
            <motion.div
              key={trigram.name}
              className="absolute flex items-center justify-center cursor-pointer group"
              style={{
                left: `50%`,
                top: `50%`,
                transform: `translate(${x - 18}px, ${y - 18}px)`,
                width: '36px',
                height: '36px'
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onHexagramSelect?.(trigram.name)}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="w-9 h-9 bg-transparent rounded-full flex items-center justify-center hover:bg-blue-500/20 transition-colors duration-200">
                {/* 透明的可点击区域 */}
              </div>
              
              {/* Tooltip */}
              <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white px-3 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 shadow-lg">
                {trigram.name} - {trigram.meaning}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* 中心指针 */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative">
          <motion.div
            className="w-1 h-16 bg-gradient-to-t from-red-600 via-red-500 to-red-400 rounded-full shadow-xl origin-bottom"
            style={{ 
              transformOrigin: '50% 100%',
              filter: 'drop-shadow(0 2px 8px rgba(220, 38, 38, 0.4))'
            }}
            animate={{ rotate: needleRotation }}
            transition={{ 
              duration: isAnimated ? 2 : 0.5, 
              ease: "easeOut" 
            }}
          />
          
          {/* 中心点 */}
          <div 
            className="absolute w-4 h-4 bg-gradient-to-br from-red-500 to-red-600 rounded-full shadow-lg border-2 border-red-400 left-1/2 top-1/2"
            style={{ transform: 'translate(-50%, -50%)' }}
          ></div>
        </div>
      </div>

      {/* 发光效果 */}
      {isAnimated && (
        <motion.div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
            filter: 'blur(3px)'
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}

      {/* 能量粒子效果 */}
      {isAnimated && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-60"
              style={{
                left: `${50 + 35 * Math.cos(i * 60 * Math.PI / 180)}%`,
                top: `${50 + 35 * Math.sin(i * 60 * Math.PI / 180)}%`,
                transform: 'translate(-50%, -50%)'
              }}
              animate={{
                scale: [0, 1.2, 0],
                opacity: [0, 0.8, 0],
                rotate: [0, 180, 360]
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
      )}
    </div>
  );
}