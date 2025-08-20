import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface TraditionalCompassProps {
  size?: number;
  isAnimated?: boolean;
  rotation?: number;
  onHexagramSelect?: (hexagram: string) => void;
}

// 64卦的简化版本 - 按传统顺序排列
const hexagrams = [
  { name: '乾', meaning: 'Heaven', trigram: '☰' },
  { name: '坤', meaning: 'Earth', trigram: '☷' },
  { name: '屯', meaning: 'Sprouting', trigram: '☳' },
  { name: '蒙', meaning: 'Youthful Folly', trigram: '☶' },
  { name: '需', meaning: 'Waiting', trigram: '☰' },
  { name: '讼', meaning: 'Conflict', trigram: '☰' },
  { name: '师', meaning: 'The Army', trigram: '☷' },
  { name: '比', meaning: 'Union', trigram: '☷' },
  { name: '小畜', meaning: 'Small Taming', trigram: '☴' },
  { name: '履', meaning: 'Conduct', trigram: '☰' },
  { name: '泰', meaning: 'Peace', trigram: '☰' },
  { name: '否', meaning: 'Standstill', trigram: '☰' },
  { name: '同人', meaning: 'Fellowship', trigram: '☰' },
  { name: '大有', meaning: 'Great Possession', trigram: '☰' },
  { name: '谦', meaning: 'Modesty', trigram: '☶' },
  { name: '豫', meaning: 'Enthusiasm', trigram: '☳' },
  { name: '随', meaning: 'Following', trigram: '☱' },
  { name: '蛊', meaning: 'Work on Decay', trigram: '☶' },
  { name: '临', meaning: 'Approach', trigram: '☷' },
  { name: '观', meaning: 'Observation', trigram: '☴' },
  { name: '噬嗑', meaning: 'Biting Through', trigram: '☳' },
  { name: '贲', meaning: 'Grace', trigram: '☶' },
  { name: '剥', meaning: 'Splitting Apart', trigram: '☶' },
  { name: '复', meaning: 'Return', trigram: '☳' },
  { name: '无妄', meaning: 'Innocence', trigram: '☳' },
  { name: '大畜', meaning: 'Great Taming', trigram: '☶' },
  { name: '颐', meaning: 'Nourishment', trigram: '☶' },
  { name: '大过', meaning: 'Great Exceeding', trigram: '☱' },
  { name: '坎', meaning: 'Water', trigram: '☵' },
  { name: '离', meaning: 'Fire', trigram: '☲' },
  { name: '咸', meaning: 'Influence', trigram: '☱' },
  { name: '恒', meaning: 'Duration', trigram: '☳' },
  { name: '遁', meaning: 'Retreat', trigram: '☰' },
  { name: '大壮', meaning: 'Great Power', trigram: '☳' },
  { name: '晋', meaning: 'Progress', trigram: '☲' },
  { name: '明夷', meaning: 'Darkening', trigram: '☷' },
  { name: '家人', meaning: 'Family', trigram: '☴' },
  { name: '睽', meaning: 'Opposition', trigram: '☲' },
  { name: '蹇', meaning: 'Obstruction', trigram: '☵' },
  { name: '解', meaning: 'Deliverance', trigram: '☳' },
  { name: '损', meaning: 'Decrease', trigram: '☶' },
  { name: '益', meaning: 'Increase', trigram: '☴' },
  { name: '夬', meaning: 'Breakthrough', trigram: '☱' },
  { name: '姤', meaning: 'Coming to Meet', trigram: '☰' },
  { name: '萃', meaning: 'Gathering', trigram: '☱' },
  { name: '升', meaning: 'Pushing Upward', trigram: '☷' },
  { name: '困', meaning: 'Oppression', trigram: '☱' },
  { name: '井', meaning: 'The Well', trigram: '☴' },
  { name: '革', meaning: 'Revolution', trigram: '☲' },
  { name: '鼎', meaning: 'Cauldron', trigram: '☲' },
  { name: '震', meaning: 'Thunder', trigram: '☳' },
  { name: '艮', meaning: 'Mountain', trigram: '☶' },
  { name: '渐', meaning: 'Development', trigram: '☴' },
  { name: '归妹', meaning: 'Marrying Maiden', trigram: '☳' },
  { name: '丰', meaning: 'Abundance', trigram: '☳' },
  { name: '旅', meaning: 'The Wanderer', trigram: '☲' },
  { name: '巽', meaning: 'Wind', trigram: '☴' },
  { name: '兑', meaning: 'Joy', trigram: '☱' },
  { name: '涣', meaning: 'Dispersion', trigram: '☴' },
  { name: '节', meaning: 'Limitation', trigram: '☵' },
  { name: '中孚', meaning: 'Inner Truth', trigram: '☴' },
  { name: '小过', meaning: 'Small Exceeding', trigram: '☳' },
  { name: '既济', meaning: 'After Completion', trigram: '☵' },
  { name: '未济', meaning: 'Before Completion', trigram: '☲' }
];

export function TraditionalCompass({ 
  size = 300, 
  isAnimated = false, 
  rotation = 0,
  onHexagramSelect 
}: TraditionalCompassProps) {
  const [needleRotation, setNeedleRotation] = useState(rotation);

  useEffect(() => {
    setNeedleRotation(rotation);
  }, [rotation]);

  // 创建装饰性云纹图案
  const CloudPattern = ({ className = "" }) => (
    <svg 
      viewBox="0 0 100 100" 
      className={`fill-blue-300/40 ${className}`}
      style={{ filter: 'drop-shadow(0 1px 2px rgba(59, 130, 246, 0.2))' }}
    >
      <path d="M20,50 Q30,40 40,45 Q50,35 60,45 Q70,40 80,50 Q75,60 65,55 Q55,65 45,55 Q35,60 25,55 Q15,55 20,50 Z" />
    </svg>
  );

  // 创建花朵图案
  const FlowerPattern = ({ className = "" }) => (
    <svg 
      viewBox="0 0 100 100" 
      className={`fill-blue-400/60 ${className}`}
    >
      <g transform="translate(50,50)">
        <circle cx="0" cy="0" r="8" className="fill-blue-500/80" />
        {[0, 60, 120, 180, 240, 300].map((angle, i) => (
          <ellipse
            key={i}
            cx="0"
            cy="-15"
            rx="6"
            ry="12"
            transform={`rotate(${angle})`}
            className="fill-blue-400/70"
          />
        ))}
      </g>
    </svg>
  );

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      {/* 主体圆盘 - 瓷器白底 */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-br from-slate-50 to-blue-50/30 shadow-2xl border-4 border-blue-100/50"
        style={{
          background: `
            radial-gradient(circle at 30% 30%, rgba(147, 197, 253, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 70% 70%, rgba(219, 234, 254, 0.2) 0%, transparent 50%),
            linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)
          `,
          boxShadow: `
            inset 0 2px 4px rgba(59, 130, 246, 0.1),
            0 8px 32px rgba(59, 130, 246, 0.15),
            0 4px 16px rgba(0, 0, 0, 0.1)
          `
        }}
        animate={isAnimated ? { 
          scale: [1, 1.02, 1],
          rotate: [0, 1, 0]
        } : {}}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* 外圈装饰花纹 */}
      <div className="absolute inset-0">
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
          <div
            key={i}
            className="absolute w-8 h-8"
            style={{
              left: `${50 + 38 * Math.cos(angle * Math.PI / 180)}%`,
              top: `${50 + 38 * Math.sin(angle * Math.PI / 180)}%`,
              transform: 'translate(-50%, -50%)'
            }}
          >
            {i % 2 === 0 ? <FlowerPattern /> : <CloudPattern />}
          </div>
        ))}
      </div>

      {/* 64卦外圈 */}
      <div className="absolute inset-4">
        {hexagrams.map((hexagram, index) => {
          const angle = (index * 360) / 64 - 90; // -90 to start from top
          const radius = (size * 0.35);
          const x = radius * Math.cos(angle * Math.PI / 180);
          const y = radius * Math.sin(angle * Math.PI / 180);
          
          return (
            <motion.div
              key={`${hexagram.name}-${index}`}
              className="absolute flex items-center justify-center cursor-pointer group"
              style={{
                left: `50%`,
                top: `50%`,
                transform: `translate(${x - 12}px, ${y - 12}px)`,
                width: '24px',
                height: '24px'
              }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onHexagramSelect?.(hexagram.name)}
            >
              <div 
                className="w-5 h-5 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-sm flex items-center justify-center text-xs font-medium shadow-lg group-hover:shadow-xl transition-all duration-200 group-hover:from-blue-600 group-hover:to-blue-700"
                style={{
                  fontSize: '10px',
                  fontFamily: "'Playfair Display', serif"
                }}
              >
                {hexagram.name.slice(0, 1)}
              </div>
              
              {/* Tooltip */}
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                {hexagram.name}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* 八卦内圈 */}
      <div className="absolute inset-12">
        {[
          { name: '乾', trigram: '☰', position: 0 },
          { name: '兑', trigram: '☱', position: 45 },
          { name: '离', trigram: '☲', position: 90 },
          { name: '震', trigram: '☳', position: 135 },
          { name: '巽', trigram: '☴', position: 180 },
          { name: '坎', trigram: '☵', position: 225 },
          { name: '艮', trigram: '☶', position: 270 },
          { name: '坤', trigram: '☷', position: 315 }
        ].map((trigram, index) => {
          const angle = trigram.position - 90;
          const radius = (size * 0.18);
          const x = radius * Math.cos(angle * Math.PI / 180);
          const y = radius * Math.sin(angle * Math.PI / 180);
          
          return (
            <motion.div
              key={trigram.name}
              className="absolute flex flex-col items-center justify-center cursor-pointer group"
              style={{
                left: `50%`,
                top: `50%`,
                transform: `translate(${x - 16}px, ${y - 16}px)`,
                width: '32px',
                height: '32px'
              }}
              whileHover={{ scale: 1.1 }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="text-blue-700 font-bold text-sm mb-1 font-['Playfair_Display']">
                {trigram.name}
              </div>
              <div className="text-blue-600 text-xs">
                {trigram.trigram}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* 中心圆环 */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-50 to-blue-100 rounded-full shadow-inner border-2 border-blue-200/50 flex items-center justify-center">
          <div className="w-12 h-12 bg-gradient-to-br from-white to-blue-50 rounded-full shadow-sm border border-blue-100/50 flex items-center justify-center">
            {/* 指针 */}
            <motion.div
              className="w-1 h-8 bg-gradient-to-t from-red-500 to-red-400 rounded-full shadow-lg origin-bottom"
              style={{ transformOrigin: '50% 100%' }}
              animate={{ rotate: needleRotation }}
              transition={{ 
                duration: isAnimated ? 2 : 0.5, 
                ease: "easeOut" 
              }}
            />
            
            {/* 中心点 */}
            <div className="absolute w-3 h-3 bg-gradient-to-br from-red-400 to-red-500 rounded-full shadow-lg border border-red-300"></div>
          </div>
        </div>
      </div>

      {/* 装饰性云纹边框 */}
      <div className="absolute inset-0 rounded-full" 
        style={{
          background: `conic-gradient(
            from 0deg,
            transparent 0deg,
            rgba(59, 130, 246, 0.05) 45deg,
            transparent 90deg,
            rgba(59, 130, 246, 0.05) 135deg,
            transparent 180deg,
            rgba(59, 130, 246, 0.05) 225deg,
            transparent 270deg,
            rgba(59, 130, 246, 0.05) 315deg,
            transparent 360deg
          )`
        }}
      />
      
      {/* 发光效果 */}
      {isAnimated && (
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
            filter: 'blur(2px)'
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
    </div>
  );
}