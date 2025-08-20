import { motion } from "framer-motion";

interface IChingCompassProps {
  size?: number;
  isAnimated?: boolean;
  className?: string;
}

export function IChing64Compass({ size = 200, isAnimated = false, className = "" }: IChingCompassProps) {
  // 64卦的简化表示 - 外圈
  const outerHexagrams = [
    "乾", "夬", "大有", "大壮", "小畜", "需", "大畜", "泰",
    "履", "兑", "睽", "归妹", "中孚", "节", "损", "临",
    "同人", "革", "离", "丰", "家人", "既济", "贲", "明夷",
    "无妄", "随", "噬嗑", "震", "益", "屯", "颐", "复",
    "垢", "大过", "鼎", "恒", "巽", "井", "蛊", "升",
    "讼", "困", "未济", "解", "涣", "坎", "蒙", "师",
    "遁", "咸", "旅", "小过", "渐", "蹇", "艮", "谦",
    "否", "萃", "晋", "豫", "观", "比", "剥", "坤"
  ];

  // 内圈8卦
  const innerTrigrams = ["乾", "兑", "离", "震", "巽", "坎", "艮", "坤"];

  if (isAnimated) {
    return (
      <motion.div
        className={`relative ${className}`}
        style={{ width: size, height: size }}
        animate={{ rotate: [0, 2, -2, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg
          width={size}
          height={size}
          viewBox="0 0 400 400"
          className="drop-shadow-lg"
        >
          {/* 外圈背景 */}
          <circle
            cx="200"
            cy="200"
            r="190"
            fill="none"
            stroke="#E7A5A0"
            strokeWidth="4"
          />
          
          {/* 外圈64卦区域 */}
          {outerHexagrams.map((hexagram, index) => {
            const angle = (index * 360) / 64;
            const isYin = index % 2 === 0;
            const fillColor = isYin ? "#F8F5F0" : "#2B3A55";
            const textColor = isYin ? "#2B3A55" : "#F8F5F0";
            
            return (
              <g key={`outer-${index}`}>
                {/* 外圈扇形 */}
                <path
                  d={`
                    M 200 200
                    L ${200 + 190 * Math.cos((angle - 2.8125) * Math.PI / 180)} ${200 + 190 * Math.sin((angle - 2.8125) * Math.PI / 180)}
                    A 190 190 0 0 1 ${200 + 190 * Math.cos((angle + 2.8125) * Math.PI / 180)} ${200 + 190 * Math.sin((angle + 2.8125) * Math.PI / 180)}
                    Z
                  `}
                  fill={fillColor}
                  stroke="#7BAEA5"
                  strokeWidth="0.5"
                  opacity="0.9"
                />
                
                {/* 外圈卦名 */}
                <text
                  x={200 + 165 * Math.cos(angle * Math.PI / 180)}
                  y={200 + 165 * Math.sin(angle * Math.PI / 180)}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="8"
                  fill={textColor}
                  fontFamily="'Inter', sans-serif"
                  fontWeight="500"
                  transform={`rotate(${angle + 90}, ${200 + 165 * Math.cos(angle * Math.PI / 180)}, ${200 + 165 * Math.sin(angle * Math.PI / 180)})`}
                >
                  {hexagram}
                </text>
              </g>
            );
          })}

          {/* 中圈背景 */}
          <circle
            cx="200"
            cy="200"
            r="140"
            fill="none"
            stroke="#7BAEA5"
            strokeWidth="2"
          />

          {/* 中圈8卦区域 */}
          {innerTrigrams.map((trigram, index) => {
            const angle = (index * 360) / 8;
            const isYin = index % 2 === 0;
            const fillColor = isYin ? "#2B3A55" : "#F8F5F0";
            const textColor = isYin ? "#F8F5F0" : "#2B3A55";
            
            return (
              <g key={`inner-${index}`}>
                {/* 中圈扇形 */}
                <path
                  d={`
                    M 200 200
                    L ${200 + 140 * Math.cos((angle - 22.5) * Math.PI / 180)} ${200 + 140 * Math.sin((angle - 22.5) * Math.PI / 180)}
                    A 140 140 0 0 1 ${200 + 140 * Math.cos((angle + 22.5) * Math.PI / 180)} ${200 + 140 * Math.sin((angle + 22.5) * Math.PI / 180)}
                    Z
                  `}
                  fill={fillColor}
                  stroke="#7BAEA5"
                  strokeWidth="1"
                  opacity="0.95"
                />
                
                {/* 中圈三爻符号 */}
                <g transform={`translate(${200 + 100 * Math.cos(angle * Math.PI / 180)}, ${200 + 100 * Math.sin(angle * Math.PI / 180)}) rotate(${angle + 90})`}>
                  {/* 简化的三爻表示 */}
                  <rect x="-8" y="-6" width="16" height="2" fill={textColor} />
                  <rect x="-8" y="-2" width="16" height="2" fill={textColor} />
                  <rect x="-8" y="2" width="16" height="2" fill={textColor} />
                </g>
                
                {/* 中圈卦名 */}
                <text
                  x={200 + 115 * Math.cos(angle * Math.PI / 180)}
                  y={200 + 115 * Math.sin(angle * Math.PI / 180)}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="12"
                  fill={textColor}
                  fontFamily="'Playfair Display', serif"
                  fontWeight="500"
                  transform={`rotate(${angle + 90}, ${200 + 115 * Math.cos(angle * Math.PI / 180)}, ${200 + 115 * Math.sin(angle * Math.PI / 180)})`}
                >
                  {trigram}
                </text>
              </g>
            );
          })}

          {/* 内圈太极 */}
          <circle
            cx="200"
            cy="200"
            r="80"
            fill="#F8F5F0"
            stroke="#7BAEA5"
            strokeWidth="2"
          />

          {/* 太极图案 */}
          <g>
            {/* 阴阳分界 */}
            <path
              d="M 200 120 A 40 40 0 0 1 200 200 A 40 40 0 0 0 200 280 A 80 80 0 0 1 200 120"
              fill="#2B3A55"
            />
            
            {/* 阳中阴点 */}
            <circle cx="200" cy="160" r="12" fill="#2B3A55" />
            
            {/* 阴中阳点 */}
            <circle cx="200" cy="240" r="12" fill="#F8F5F0" />
          </g>

          {/* 罗盘指针 */}
          <g>
            <motion.g
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              style={{ transformOrigin: "200px 200px" }}
            >
              {/* 主指针 */}
              <path
                d="M 200 80 L 205 200 L 200 210 L 195 200 Z"
                fill="#E7A5A0"
                stroke="#2B3A55"
                strokeWidth="1"
              />
              
              {/* 指针尾部 */}
              <path
                d="M 200 320 L 203 200 L 200 195 L 197 200 Z"
                fill="#7BAEA5"
                stroke="#2B3A55"
                strokeWidth="1"
              />
              
              {/* 中心点 */}
              <circle
                cx="200"
                cy="200"
                r="8"
                fill="#E7A5A0"
                stroke="#2B3A55"
                strokeWidth="2"
              />
            </motion.g>
          </g>

          {/* 方位标记 */}
          <g fontSize="14" fontFamily="'Inter', sans-serif" fontWeight="600" fill="#2B3A55">
            <text x="200" y="25" textAnchor="middle" dominantBaseline="middle">北</text>
            <text x="375" y="205" textAnchor="middle" dominantBaseline="middle">东</text>
            <text x="200" y="385" textAnchor="middle" dominantBaseline="middle">南</text>
            <text x="25" y="205" textAnchor="middle" dominantBaseline="middle">西</text>
          </g>
        </svg>
      </motion.div>
    );
  }

  return (
    <div
      className={`relative ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 400 400"
        className="drop-shadow-lg"
      >
        {/* 外圈背景 */}
        <circle
          cx="200"
          cy="200"
          r="190"
          fill="none"
          stroke="#E7A5A0"
          strokeWidth="4"
        />
        
        {/* 外圈64卦区域 */}
        {outerHexagrams.map((hexagram, index) => {
          const angle = (index * 360) / 64;
          const isYin = index % 2 === 0;
          const fillColor = isYin ? "#F8F5F0" : "#2B3A55";
          const textColor = isYin ? "#2B3A55" : "#F8F5F0";
          
          return (
            <g key={`outer-${index}`}>
              {/* 外圈扇形 */}
              <path
                d={`
                  M 200 200
                  L ${200 + 190 * Math.cos((angle - 2.8125) * Math.PI / 180)} ${200 + 190 * Math.sin((angle - 2.8125) * Math.PI / 180)}
                  A 190 190 0 0 1 ${200 + 190 * Math.cos((angle + 2.8125) * Math.PI / 180)} ${200 + 190 * Math.sin((angle + 2.8125) * Math.PI / 180)}
                  Z
                `}
                fill={fillColor}
                stroke="#7BAEA5"
                strokeWidth="0.5"
                opacity="0.9"
              />
              
              {/* 外圈卦名 */}
              <text
                x={200 + 165 * Math.cos(angle * Math.PI / 180)}
                y={200 + 165 * Math.sin(angle * Math.PI / 180)}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="8"
                fill={textColor}
                fontFamily="'Inter', sans-serif"
                fontWeight="500"
                transform={`rotate(${angle + 90}, ${200 + 165 * Math.cos(angle * Math.PI / 180)}, ${200 + 165 * Math.sin(angle * Math.PI / 180)})`}
              >
                {hexagram}
              </text>
            </g>
          );
        })}

        {/* 中圈背景 */}
        <circle
          cx="200"
          cy="200"
          r="140"
          fill="none"
          stroke="#7BAEA5"
          strokeWidth="2"
        />

        {/* 中圈8卦区域 */}
        {innerTrigrams.map((trigram, index) => {
          const angle = (index * 360) / 8;
          const isYin = index % 2 === 0;
          const fillColor = isYin ? "#2B3A55" : "#F8F5F0";
          const textColor = isYin ? "#F8F5F0" : "#2B3A55";
          
          return (
            <g key={`inner-${index}`}>
              {/* 中圈扇形 */}
              <path
                d={`
                  M 200 200
                  L ${200 + 140 * Math.cos((angle - 22.5) * Math.PI / 180)} ${200 + 140 * Math.sin((angle - 22.5) * Math.PI / 180)}
                  A 140 140 0 0 1 ${200 + 140 * Math.cos((angle + 22.5) * Math.PI / 180)} ${200 + 140 * Math.sin((angle + 22.5) * Math.PI / 180)}
                  Z
                `}
                fill={fillColor}
                stroke="#7BAEA5"
                strokeWidth="1"
                opacity="0.95"
              />
              
              {/* 中圈三爻符号 */}
              <g transform={`translate(${200 + 100 * Math.cos(angle * Math.PI / 180)}, ${200 + 100 * Math.sin(angle * Math.PI / 180)}) rotate(${angle + 90})`}>
                {/* 简化的三爻表示 */}
                <rect x="-8" y="-6" width="16" height="2" fill={textColor} />
                <rect x="-8" y="-2" width="16" height="2" fill={textColor} />
                <rect x="-8" y="2" width="16" height="2" fill={textColor} />
              </g>
              
              {/* 中圈卦名 */}
              <text
                x={200 + 115 * Math.cos(angle * Math.PI / 180)}
                y={200 + 115 * Math.sin(angle * Math.PI / 180)}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="12"
                fill={textColor}
                fontFamily="'Playfair Display', serif"
                fontWeight="500"
                transform={`rotate(${angle + 90}, ${200 + 115 * Math.cos(angle * Math.PI / 180)}, ${200 + 115 * Math.sin(angle * Math.PI / 180)})`}
              >
                {trigram}
              </text>
            </g>
          );
        })}

        {/* 内圈太极 */}
        <circle
          cx="200"
          cy="200"
          r="80"
          fill="#F8F5F0"
          stroke="#7BAEA5"
          strokeWidth="2"
        />

        {/* 太极图案 */}
        <g>
          {/* 阴阳分界 */}
          <path
            d="M 200 120 A 40 40 0 0 1 200 200 A 40 40 0 0 0 200 280 A 80 80 0 0 1 200 120"
            fill="#2B3A55"
          />
          
          {/* 阳中阴点 */}
          <circle cx="200" cy="160" r="12" fill="#2B3A55" />
          
          {/* 阴中阳点 */}
          <circle cx="200" cy="240" r="12" fill="#F8F5F0" />
        </g>

        {/* 罗盘指针 */}
        <g>
          {/* 主指针 */}
          <path
            d="M 200 80 L 205 200 L 200 210 L 195 200 Z"
            fill="#E7A5A0"
            stroke="#2B3A55"
            strokeWidth="1"
          />
          
          {/* 指针尾部 */}
          <path
            d="M 200 320 L 203 200 L 200 195 L 197 200 Z"
            fill="#7BAEA5"
            stroke="#2B3A55"
            strokeWidth="1"
          />
          
          {/* 中心点 */}
          <circle
            cx="200"
            cy="200"
            r="8"
            fill="#E7A5A0"
            stroke="#2B3A55"
            strokeWidth="2"
          />
        </g>

        {/* 方位标记 */}
        <g fontSize="14" fontFamily="'Inter', sans-serif" fontWeight="600" fill="#2B3A55">
          <text x="200" y="25" textAnchor="middle" dominantBaseline="middle">北</text>
          <text x="375" y="205" textAnchor="middle" dominantBaseline="middle">东</text>
          <text x="200" y="385" textAnchor="middle" dominantBaseline="middle">南</text>
          <text x="25" y="205" textAnchor="middle" dominantBaseline="middle">西</text>
        </g>
      </svg>
    </div>
  );
}