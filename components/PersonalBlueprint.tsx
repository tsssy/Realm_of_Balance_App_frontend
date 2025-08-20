import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { motion } from "framer-motion";
import { User, MapPin, Clock, Calendar, Star, ArrowRight, Edit } from "lucide-react";

interface UserProfile {
  gender?: string;
  birthDate?: string;
  birthTime?: string;
  birthLocation?: string;
}

interface PersonalBlueprintProps {
  userProfile: UserProfile;
  onViewBlueprint: () => void;
}

const getGenderDisplay = (gender?: string) => {
  switch (gender) {
    case 'female': return { text: 'Beautiful Soul', icon: '🌸', color: 'bg-[#E7A5A0]/10 text-[#E7A5A0]' };
    case 'male': return { text: 'Wise Spirit', icon: '🌟', color: 'bg-[#7BAEA5]/10 text-[#7BAEA5]' };
    default: return { text: 'Sacred Being', icon: '✨', color: 'bg-[#6E6259]/10 text-[#6E6259]' };
  }
};

const getElementalProfile = (userProfile: UserProfile) => {
  // Simplified Five Elements analysis based on birth information
  const elements = [
    { name: 'Wood', nameZh: '木', strength: 85, color: '#7BAEA5' },
    { name: 'Fire', nameZh: '火', strength: 92, color: '#E7A5A0' },
    { name: 'Earth', nameZh: '土', strength: 67, color: '#6E6259' },
    { name: 'Metal', nameZh: '金', strength: 74, color: '#2B3A55' },
    { name: 'Water', nameZh: '水', strength: 88, color: '#7BAEA5' }
  ];
  
  return elements.sort((a, b) => b.strength - a.strength);
};

export function PersonalBlueprint({ userProfile, onViewBlueprint }: PersonalBlueprintProps) {
  const genderInfo = getGenderDisplay(userProfile.gender);
  const elementalProfile = getElementalProfile(userProfile);
  const dominantElement = elementalProfile[0];

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Not set';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString?: string) => {
    if (!timeString) return 'Not set';
    return timeString;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8F5F0] to-white px-6 py-8">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-8"
        >
          <div className="w-16 h-16 bg-gradient-to-br from-[#2B3A55] to-[#7BAEA5] rounded-full mx-auto mb-4 flex items-center justify-center">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <User size={24} className="text-white" />
            </motion.div>
          </div>
          <h2 className="text-3xl text-[#2B3A55] mb-2 font-['Playfair_Display']">
            Personal Blueprint
          </h2>
          <p className="text-[#6E6259]">
            Your sacred essence and cosmic blueprint
          </p>
        </motion.div>

        {/* Profile Overview */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-6 mb-6 bg-gradient-to-br from-[#7BAEA5]/10 to-white border-[#7BAEA5]/20">
            <div className="flex items-center gap-4 mb-4">
              <div className={`px-4 py-2 rounded-full ${genderInfo.color} font-medium`}>
                <span className="mr-2">{genderInfo.icon}</span>
                {genderInfo.text}
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Calendar size={16} className="text-[#7BAEA5]" />
                <span className="text-sm text-[#6E6259]">Birth Date:</span>
                <span className="text-[#2B3A55] font-medium">{formatDate(userProfile.birthDate)}</span>
              </div>
              
              <div className="flex items-center gap-3">
                <Clock size={16} className="text-[#E7A5A0]" />
                <span className="text-sm text-[#6E6259]">Birth Time:</span>
                <span className="text-[#2B3A55] font-medium">{formatTime(userProfile.birthTime)}</span>
              </div>
              
              <div className="flex items-center gap-3">
                <MapPin size={16} className="text-[#6E6259]" />
                <span className="text-sm text-[#6E6259]">Birth Location:</span>
                <span className="text-[#2B3A55] font-medium">{userProfile.birthLocation || 'Not set'}</span>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Dominant Element */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="p-6 mb-6 bg-gradient-to-br from-[#E7A5A0]/10 to-white border-[#E7A5A0]/20">
            <h3 className="text-lg text-[#2B3A55] mb-4 font-medium flex items-center gap-2">
              <Star size={18} className="text-[#E7A5A0]" />
              Dominant Element
            </h3>
            
            <div className="text-center mb-4">
              <div 
                className="w-20 h-20 mx-auto rounded-full flex items-center justify-center text-3xl font-bold text-white mb-3"
                style={{ backgroundColor: dominantElement.color }}
              >
                {dominantElement.nameZh}
              </div>
              <Badge className="bg-[#E7A5A0] text-white px-4 py-1">
                {dominantElement.strength}% Strength
              </Badge>
            </div>
            
            <div className="text-center">
              <p className="text-[#6E6259] leading-relaxed">
                {dominantElement.name === 'Fire' && "Your Fire element burns brightest, representing passion, intuition, and transformative power. You possess natural leadership abilities and the gift to inspire others."}
                {dominantElement.name === 'Wood' && "Your Wood element thrives with vitality, symbolizing growth, creativity, and life force. You have powerful adaptability and innovative spirit."}
                {dominantElement.name === 'Earth' && "Your Earth element is stable and grounding, representing acceptance, stability, and nurturing. You are a natural builder and protector."}
                {dominantElement.name === 'Metal' && "Your Metal element is sharp and precise, symbolizing rationality, decisiveness, and transformation. You possess keen insight and unwavering will."}
                {dominantElement.name === 'Water' && "Your Water element flows with wisdom, representing intuition, adaptability, and depth. You have profound insight and flexible thinking."}
              </p>
            </div>
          </Card>
        </motion.div>

        {/* Five Elements Overview */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="p-6 mb-6 bg-white/80 backdrop-blur-sm border-[#2B3A55]/20">
            <h3 className="text-lg text-[#2B3A55] mb-4 font-medium">
              Five Elements Distribution
            </h3>
            
            <div className="space-y-3">
              {elementalProfile.map((element, index) => (
                <motion.div
                  key={element.name}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.8 + (index * 0.1) }}
                  className="flex items-center gap-3"
                >
                  <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                    style={{ backgroundColor: element.color }}
                  >
                    {element.nameZh}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-[#2B3A55] font-medium">{element.name}</span>
                      <span className="text-xs text-[#6E6259]">{element.strength}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${element.strength}%` }}
                        transition={{ delay: 1 + (index * 0.1), duration: 0.8 }}
                        className="h-2 rounded-full"
                        style={{ backgroundColor: element.color }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Life Insights */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <Card className="p-6 mb-6 bg-gradient-to-br from-[#2B3A55]/5 to-white border-[#2B3A55]/10">
            <h3 className="text-lg text-[#2B3A55] mb-4 font-medium">
              🌟 Life Insights
            </h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-[#2B3A55] mb-2">Core Gifts</h4>
                <p className="text-[#6E6259] text-sm leading-relaxed">
                  Powerful intuition and emotional resonance abilities. You can deeply understand others' inner worlds and possess natural healing and inspiring capabilities.
                </p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-[#2B3A55] mb-2">Growth Challenges</h4>
                <p className="text-[#6E6259] text-sm leading-relaxed">
                  Learn to find balance between passion and rationality. Cultivate patience and practical planning abilities to harmonize ideals with reality.
                </p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-[#2B3A55] mb-2">Life Mission</h4>
                <p className="text-[#6E6259] text-sm leading-relaxed">
                  Become a messenger of light and love. Through your existence and actions, bring more warmth, understanding, and wisdom to the world.
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="space-y-4 mb-8"
        >
          <Button
            onClick={onViewBlueprint}
            className="w-full bg-gradient-to-r from-[#7BAEA5] to-[#E7A5A0] hover:from-[#6A9B91] hover:to-[#D89590] text-white py-4 rounded-lg font-medium text-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <span>View Complete Blueprint Analysis</span>
            <ArrowRight size={20} />
          </Button>
          
          <Button
            variant="outline"
            className="w-full border-[#6E6259]/30 text-[#6E6259] hover:bg-[#6E6259]/10 py-3 rounded-lg transition-colors"
          >
            <Edit size={18} />
            <span>Edit Personal Information</span>
          </Button>
        </motion.div>

        {/* Decorative elements */}
        <div className="absolute top-20 left-8 opacity-20 pointer-events-none">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          >
            <User size={32} className="text-[#2B3A55]" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}