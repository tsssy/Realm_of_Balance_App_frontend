import { motion } from "framer-motion";
import { Card } from "./ui/card";
import { Progress } from "./ui/progress";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

interface ElementalData {
  quick_data?: {
    core_energy_field?: {
      chart_data?: Array<{
        axis: string; // "金 | Metal" format
        value: number;
      }>;
    };
  };
}

interface BlueprintData {
  inner_blueprint?: {
    core_essence?: {
      title?: string;
      description?: string;
    };
    natural_strengths?: {
      title?: string;
      strengths?: string[];
    };
    growth_areas?: {
      title?: string;
      analysis?: string;
      balance_path?: {
        title?: string;
        suggestions?: string[];
      };
    };
    life_journey_curve?: {
      title?: string;
      description?: string;
      chart_data?: Array<{
        year: number;
        energy_level: number;
        is_turning_point?: boolean;
        icon_id?: string;
        event_description?: string;
      }>;
    };
    core_energy_field?: {
      title?: string;
      description?: string;
      chart_data?: Array<{
        axis: string;
        value: number;
      }>;
    };
  };
}

interface BlueprintReportProps {
  onBack: () => void;
  elementalData?: ElementalData;
  completeBlueprintData?: BlueprintData;
}

export function BlueprintReport({ onBack, elementalData, completeBlueprintData }: BlueprintReportProps) {
  console.log('🔧 BlueprintReport接收到的数据:');
  console.log('  - elementalData:', elementalData);
  console.log('  - completeBlueprintData:', completeBlueprintData);
  console.log('  - inner_blueprint:', completeBlueprintData?.inner_blueprint);
  console.log('  - life_journey_curve:', completeBlueprintData?.inner_blueprint?.life_journey_curve);

  // 获取真实五行数据或使用默认数据
  const getFiveElementsData = () => {
    if (elementalData?.quick_data?.core_energy_field?.chart_data) {
      const elementMapping: { [key: string]: { name: string; color: string } } = {
        '金 | Metal': { name: 'Metal', color: '#2B3A55' },
        '木 | Wood': { name: 'Wood', color: '#7BAEA5' },
        '水 | Water': { name: 'Water', color: '#7BAEA5' },
        '火 | Fire': { name: 'Fire', color: '#E7A5A0' },
        '土 | Earth': { name: 'Earth', color: '#6E6259' }
      };
      
      const elements = elementalData.quick_data.core_energy_field.chart_data
        .map(item => {
          const elementInfo = elementMapping[item.axis];
          return elementInfo ? {
            element: elementInfo.name,
            value: item.value,
            color: elementInfo.color
          } : null;
        })
        .filter(Boolean)
        .filter((item): item is NonNullable<typeof item> => item !== null);
      
      // 按强度降序排序
      return elements.sort((a, b) => b.value - a.value);
    }
    
    // 默认数据作为fallback
    return [
      { element: 'Fire', value: 92, color: '#E7A5A0' },
      { element: 'Water', value: 88, color: '#7BAEA5' },
      { element: 'Wood', value: 85, color: '#7BAEA5' },
      { element: 'Metal', value: 74, color: '#2B3A55' },
      { element: 'Earth', value: 67, color: '#6E6259' }
    ];
  };

  // 获取生命曲线数据
  const getLifeCurveData = () => {
    if (completeBlueprintData?.inner_blueprint?.life_journey_curve?.chart_data) {
      const curveData = completeBlueprintData.inner_blueprint.life_journey_curve.chart_data;
      return curveData.map(point => ({
        age: point.year.toString(),
        energy: point.energy_level,
        year: point.year,
        description: point.event_description || '',
        isTurningPoint: point.is_turning_point || false,
        iconId: point.icon_id || ''
      }));
    }
    
    // 默认数据
    return [
      { age: 'Birth', energy: 70, year: 0, description: 'Beginning of your life journey', isTurningPoint: false, iconId: '' },
      { age: '7', energy: 85, year: 7, description: 'Early growth and discovery', isTurningPoint: false, iconId: '' },
      { age: '14', energy: 62, year: 14, description: 'Teenage transitions and learning', isTurningPoint: false, iconId: '' },
      { age: '21', energy: 78, year: 21, description: 'Coming of age and new responsibilities', isTurningPoint: true, iconId: '' },
      { age: '28', energy: 95, year: 28, description: 'Peak energy and achievements', isTurningPoint: false, iconId: '' },
      { age: '35', energy: 72, year: 35, description: 'Maturity and wisdom development', isTurningPoint: false, iconId: '' },
      { age: '42', energy: 89, year: 42, description: 'Second wave of vitality', isTurningPoint: false, iconId: '' },
      { age: '49', energy: 81, year: 49, description: 'Reflection and deeper understanding', isTurningPoint: false, iconId: '' },
      { age: '56', energy: 77, year: 56, description: 'Harvest time of life experiences', isTurningPoint: false, iconId: '' }
    ];
  };

  const fiveElementsData = getFiveElementsData();
  const lifeCurveData = getLifeCurveData();

  // 计算最大值用于雷达图自适应
  const maxElementValue = Math.max(...fiveElementsData.map(e => e.value));
  const radarDomainMax = Math.max(50, Math.ceil(maxElementValue / 10) * 10); // 至少50，按10的倍数向上取整

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
                    domain={[0, radarDomainMax]} 
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
                      value={(element.value / radarDomainMax) * 100} 
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
                      fontSize: '12px',
                      maxWidth: '200px',
                      padding: '12px'
                    }}
                    formatter={(value: any, name: any, props: any) => {
                      const data = props.payload;
                      return [
                        <div key="tooltip-content" className="space-y-2">
                          <div className="font-medium text-[#2B3A55]">
                            {data.year ? `${data.year}年` : data.age}
                          </div>
                          <div className="text-[#7BAEA5]">
                            能量值: {value}
                          </div>
                          {data.description && (
                            <div className="text-[#6E6259] text-xs leading-relaxed">
                              {data.description}
                            </div>
                          )}
                          {data.isTurningPoint && (
                            <div className="text-[#E7A5A0] text-xs font-medium">
                              ✨ 转折点
                            </div>
                          )}
                        </div>,
                        ''
                      ];
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="energy"
                    stroke="#E7A5A0"
                    strokeWidth={3}
                    dot={(props: any) => {
                      const data = lifeCurveData[props.index];
                      return (
                        <circle
                          cx={props.cx}
                          cy={props.cy}
                          r={data?.isTurningPoint ? 6 : 4}
                          fill={data?.isTurningPoint ? '#D89590' : '#E7A5A0'}
                          stroke={data?.isTurningPoint ? '#C4847F' : '#E7A5A0'}
                          strokeWidth={2}
                        />
                      );
                    }}
                    activeDot={{ r: 8, fill: '#D89590', stroke: '#E7A5A0', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Life Events Timeline */}
            <div className="mt-6 space-y-3">
              {lifeCurveData.map((point, index) => (
                <motion.div
                  key={point.year || point.age}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 2 + (index * 0.1) }}
                  className={`flex items-start gap-3 p-3 rounded-lg transition-colors ${
                    point.isTurningPoint 
                      ? 'bg-gradient-to-r from-[#E7A5A0]/10 to-[#7BAEA5]/10 border border-[#E7A5A0]/20' 
                      : 'bg-gray-50/50'
                  }`}
                >
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                    point.isTurningPoint ? 'bg-[#E7A5A0]' : 'bg-[#7BAEA5]'
                  }`}>
                    {point.year || point.age}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-[#2B3A55]">
                        {point.year ? `${point.year}年` : point.age}
                      </span>
                      <span className="text-xs text-[#7BAEA5]">
                        能量值 {point.energy}
                      </span>
                      {point.isTurningPoint && (
                        <span className="text-xs text-[#E7A5A0] font-medium">
                          ✨ 转折点
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-[#6E6259] leading-relaxed whitespace-pre-wrap break-words">
                      {point.description}
                    </p>
                  </div>
                </motion.div>
              ))}
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
          {/* Core Essence */}
          {completeBlueprintData?.inner_blueprint?.core_essence ? (
            <Card className="p-6 bg-gradient-to-br from-[#7BAEA5]/10 to-white border-[#7BAEA5]/20">
              <h4 className="text-lg text-[#2B3A55] mb-3 font-medium">
                🌟 {completeBlueprintData.inner_blueprint.core_essence.title || 'Core Essence'}
              </h4>
              <p className="text-[#6E6259] leading-relaxed whitespace-pre-wrap break-words">
                {completeBlueprintData.inner_blueprint.core_essence.description}
              </p>
            </Card>
          ) : (
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
          )}

          {/* Natural Strengths */}
          {completeBlueprintData?.inner_blueprint?.natural_strengths ? (
            <Card className="p-6 bg-gradient-to-br from-[#E7A5A0]/10 to-white border-[#E7A5A0]/20">
              <h4 className="text-lg text-[#2B3A55] mb-3 font-medium">
                💪 {completeBlueprintData.inner_blueprint.natural_strengths.title || 'Natural Strengths'}
              </h4>
              <div className="space-y-2 text-[#6E6259]">
                {completeBlueprintData.inner_blueprint.natural_strengths.strengths?.map((strength, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#E7A5A0] rounded-full mt-2 flex-shrink-0"></div>
                    <p className="whitespace-pre-wrap break-words">{strength}</p>
                  </div>
                ))}
              </div>
            </Card>
          ) : (
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
          )}

          {/* Growth Areas with Balance Path */}
          {completeBlueprintData?.inner_blueprint?.growth_areas ? (
            <Card className="p-6 bg-gradient-to-br from-[#2B3A55]/10 to-white border-[#2B3A55]/20">
              <h4 className="text-lg text-[#2B3A55] mb-3 font-medium">
                🌱 {completeBlueprintData.inner_blueprint.growth_areas.title || 'Growth Areas'}
              </h4>
              <p className="text-[#6E6259] leading-relaxed mb-3 whitespace-pre-wrap break-words">
                {completeBlueprintData.inner_blueprint.growth_areas.analysis}
              </p>
              
              {completeBlueprintData.inner_blueprint.growth_areas.balance_path && (
                <div className="mt-4">
                  <h5 className="text-sm font-medium text-[#2B3A55] mb-2">
                    {completeBlueprintData.inner_blueprint.growth_areas.balance_path.title}
                  </h5>
                  <div className="space-y-2 text-[#6E6259]">
                    {completeBlueprintData.inner_blueprint.growth_areas.balance_path.suggestions?.map((suggestion, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-[#2B3A55] rounded-full mt-2 flex-shrink-0"></div>
                        <p className="whitespace-pre-wrap break-words">{suggestion}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          ) : (
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
          )}
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