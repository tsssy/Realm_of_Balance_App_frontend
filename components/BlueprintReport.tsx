import { motion } from "framer-motion";
import { Card } from "./ui/card";
import { Progress } from "./ui/progress";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

const fiveElementsData = [
  { element: 'Wood', value: 85, color: '#7BAEA5' },
  { element: 'Fire', value: 92, color: '#E7A5A0' },
  { element: 'Earth', value: 67, color: '#6E6259' },
  { element: 'Metal', value: 74, color: '#2B3A55' },
  { element: 'Water', value: 88, color: '#7BAEA5' }
];

const lifeCurveData = [
  { age: 'Birth', energy: 70 },
  { age: '7', energy: 85 },
  { age: '14', energy: 62 },
  { age: '21', energy: 78 },
  { age: '28', energy: 95 },
  { age: '35', energy: 72 },
  { age: '42', energy: 89 },
  { age: '49', energy: 81 },
  { age: '56', energy: 77 }
];

export function BlueprintReport({ onBack }: { onBack: () => void }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8F5F0] to-white px-6 py-8">
      <div className="max-w-md mx-auto pt-[50px]">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl text-[#2B3A55] mb-3 font-['Playfair_Display']">
            Your Inner Blueprint
          </h2>
          <p className="text-[#6E6259] leading-relaxed">
            The sacred geometry of your soul's design
          </p>
        </motion.div>



        {/* Five Elements Radar Chart */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <Card className="p-6 mb-6 bg-white/80 backdrop-blur-sm border-[#7BAEA5]/20">
            <h3 className="text-xl text-[#2B3A55] mb-4 font-['Playfair_Display'] text-center">
              Five Elements Harmony
            </h3>
            
            <div className="h-64 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={fiveElementsData}>
                  <PolarGrid gridType="polygon" className="opacity-30" />
                  <PolarAngleAxis 
                    dataKey="element" 
                    tick={{ fontSize: 12, fill: '#2B3A55' }}
                    className="font-medium"
                  />
                  <PolarRadiusAxis 
                    domain={[0, 100]} 
                    tick={{ fontSize: 10, fill: '#6E6259' }}
                    className="opacity-60"
                  />
                  <Radar
                    dataKey="value"
                    stroke="#7BAEA5"
                    fill="#7BAEA5"
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-3">
              {fiveElementsData.slice(0, 3).map((element, index) => (
                <motion.div
                  key={element.element}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1.5 + (index * 0.2) }}
                  className="flex items-center justify-between"
                >
                  <span className="text-sm text-[#2B3A55] font-medium">
                    {element.element}
                  </span>
                  <div className="flex items-center gap-3 flex-1 ml-4">
                    <Progress 
                      value={element.value} 
                      className="flex-1 h-2"
                      style={{ 
                        backgroundColor: `${element.color}20`,
                      }}
                    />
                    <span className="text-sm text-[#6E6259] w-8">
                      {element.value}%
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Life Energy Curve */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <Card className="p-6 mb-6 bg-white/80 backdrop-blur-sm border-[#7BAEA5]/20">
            <h3 className="text-xl text-[#2B3A55] mb-4 font-['Playfair_Display'] text-center">
              Life Energy Flow
            </h3>
            
            <div className="h-48 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lifeCurveData}>
                  <XAxis 
                    dataKey="age" 
                    tick={{ fontSize: 10, fill: '#6E6259' }}
                    axisLine={{ stroke: '#7BAEA5', strokeWidth: 1 }}
                  />
                  <YAxis 
                    domain={[50, 100]}
                    tick={{ fontSize: 10, fill: '#6E6259' }}
                    axisLine={{ stroke: '#7BAEA5', strokeWidth: 1 }}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(248, 245, 240, 0.95)',
                      border: '1px solid #7BAEA5',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="energy"
                    stroke="#E7A5A0"
                    strokeWidth={3}
                    dot={{ fill: '#E7A5A0', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, fill: '#E7A5A0' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>

        {/* Insights Sections */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 2 }}
          className="space-y-4"
        >
          {/* Core Energy Field */}
          <Card className="p-6 bg-gradient-to-br from-[#7BAEA5]/10 to-white border-[#7BAEA5]/20">
            <h4 className="text-lg text-[#2B3A55] mb-3 font-medium">
              🌟 Core Energy Field
            </h4>
            <p className="text-[#6E6259] leading-relaxed mb-3">
              Your Fire element burns brightest, revealing a passionate and intuitive nature. You possess natural leadership qualities and the ability to inspire transformation in others.
            </p>
            <div className="text-sm text-[#7BAEA5] font-medium">
              Primary strengths: Creativity, Empathy, Vision
            </div>
          </Card>

          {/* Growth Challenges */}
          <Card className="p-6 bg-gradient-to-br from-[#E7A5A0]/10 to-white border-[#E7A5A0]/20">
            <h4 className="text-lg text-[#2B3A55] mb-3 font-medium">
              🌱 Growth Challenges
            </h4>
            <p className="text-[#6E6259] leading-relaxed mb-3">
              Your Earth element seeks more grounding. Learning to balance your fiery nature with practical stability will unlock deeper fulfillment.
            </p>
            <div className="text-sm text-[#E7A5A0] font-medium">
              Focus areas: Patience, Routine, Self-care
            </div>
          </Card>

          {/* Action Guide */}
          <Card className="p-6 bg-gradient-to-br from-[#2B3A55]/10 to-white border-[#2B3A55]/20">
            <h4 className="text-lg text-[#2B3A55] mb-3 font-medium">
              ✨ Action Guide
            </h4>
            <div className="space-y-2 text-[#6E6259]">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#7BAEA5] rounded-full mt-2 flex-shrink-0"></div>
                <p>Practice daily grounding meditation for 10 minutes</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#E7A5A0] rounded-full mt-2 flex-shrink-0"></div>
                <p>Channel your Fire energy into creative projects</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#6E6259] rounded-full mt-2 flex-shrink-0"></div>
                <p>Establish consistent sleep and meal routines</p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Navigation */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="flex gap-4 mt-8"
        >
          <button
            onClick={onBack}
            className="px-6 py-3 text-[#6E6259] border border-[#6E6259]/30 rounded-lg hover:bg-[#6E6259]/10 transition-colors"
          >
            Back
          </button>
          <button className="flex-1 bg-gradient-to-r from-[#7BAEA5] to-[#E7A5A0] text-white py-3 rounded-lg font-medium hover:shadow-lg transition-shadow">
            Explore Heart Compass
          </button>
        </motion.div>
      </div>
    </div>
  );
}