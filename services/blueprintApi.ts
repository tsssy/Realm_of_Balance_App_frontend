import httpClient from './httpClient';
import { API_ENDPOINTS, API_CONFIG } from '../config/api';

// Blueprint相关类型定义
export interface BaziPillar {
  heavenly_stem: string; // 天干
  earthly_branch: string; // 地支
}

export interface Bazi {
  year_pillar: BaziPillar; // 年柱
  month_pillar: BaziPillar; // 月柱
  day_pillar: BaziPillar; // 日柱
  hour_pillar: BaziPillar; // 时柱
}

export interface ElementalStrength {
  strength: number; // 强度值 0-100
  characteristics: string[]; // 特征描述
}

export interface ElementalProfile {
  metal: ElementalStrength; // 金
  wood: ElementalStrength; // 木
  water: ElementalStrength; // 水
  fire: ElementalStrength; // 火
  earth: ElementalStrength; // 土
}

export interface Compatibility {
  best_elements: string[]; // 最佳元素
  challenging_elements: string[]; // 挑战元素
}

export interface CoreAnalysis {
  dominant_element: string; // 主导元素
  weakest_element: string; // 最弱元素
  personality_traits: string[]; // 性格特征
  life_guidance: string; // 人生指导
  compatibility: Compatibility; // 兼容性分析
}

export interface ChartDataPoint {
  axis: string; // 坐标轴名称
  value: number; // 数值 0-100
}

export interface CoreEnergyField {
  title: string; // 标题
  description: string; // 描述
  chart_data: ChartDataPoint[]; // 雷达图数据
}

export interface CoreEssence {
  title: string; // 标题
  description: string; // 描述
}

export interface NaturalStrengths {
  title: string; // 标题
  strengths: string[]; // 优势列表
}

export interface BalancePath {
  title: string; // 标题
  suggestions: string[]; // 建议列表
}

export interface GrowthAreas {
  title: string; // 标题
  analysis: string; // 分析内容
  balance_path: BalancePath; // 平衡之道
}

export interface LifeJourneyDataPoint {
  year: number; // 年份
  energy_level: number; // 能量值 0-100
  is_turning_point: boolean; // 是否为转折点
  icon_id: string; // 图标标识
  event_description: string; // 年度描述
}

export interface LifeJourneyCurve {
  title: string; // 标题
  description: string; // 描述
  chart_data: LifeJourneyDataPoint[]; // 曲线图数据
}

export interface InnerBlueprint {
  core_energy_field: CoreEnergyField; // 核心能量场
  core_essence: CoreEssence; // 核心本质
  natural_strengths: NaturalStrengths; // 天生优势
  growth_areas: GrowthAreas; // 成长挑战
  life_journey_curve: LifeJourneyCurve; // 生命曲线
}

export interface BlueprintResult {
  _id: string;
  user_id: string;
  generation_status: string; // 生成状态: partial|complete
  task_id?: string; // 后台任务ID
  quick_data?: Record<string, any>; // 快速计算的五行数据
  bazi?: Bazi; // 八字排盘
  elemental_profile?: ElementalProfile; // 五行分析
  core_analysis?: CoreAnalysis; // 核心分析
  inner_blueprint?: InnerBlueprint; // 内在蓝图
  ai_analysis?: string; // AI 分析内容
  created_at: string;
  updated_at: string;
}

export interface BlueprintGenerateRequest {
  user_id: string;
  user_profile: Record<string, any>; // 用户信息
}

export interface BlueprintResponse {
  success: boolean;
  data: BlueprintResult;
  message?: string;
}

export interface BlueprintStatus {
  generation_status: string;
  progress?: number;
  estimated_time?: number;
  message?: string;
}

/**
 * Blueprint API服务类
 * 提供个人蓝图/算命相关的所有API调用方法
 */
export class BlueprintApiService {
  /**
   * 生成个人蓝图（完整算命结果）
   * @param request 蓝图生成请求数据
   * @returns 生成的蓝图结果
   */
  static async generateBlueprint(request: BlueprintGenerateRequest): Promise<BlueprintResult> {
    try {
      const url = `${API_CONFIG.KIMI_BASE_URL}${API_ENDPOINTS.BLUEPRINT.GENERATE}`;
      const response = await httpClient.post(url, request, {
        baseURL: '' // 覆盖默认baseURL以使用完整URL
      });
      return response.data.data;
    } catch (error) {
      console.error('生成个人蓝图失败:', error);
      throw error;
    }
  }

  /**
   * 获取用户的蓝图结果
   * @param userId 用户ID
   * @returns 蓝图结果
   */
  static async getBlueprint(userId: string): Promise<BlueprintResult> {
    try {
      const url = `${API_CONFIG.KIMI_BASE_URL}${API_ENDPOINTS.BLUEPRINT.GET(userId)}`;
      const response = await httpClient.get(url, {
        baseURL: '' // 覆盖默认baseURL以使用完整URL
      });
      return response.data.data;
    } catch (error) {
      console.error('获取蓝图结果失败:', error);
      throw error;
    }
  }

  /**
   * 重新生成蓝图结果
   * @param userId 用户ID
   * @param userProfile 用户信息
   * @returns 重新生成的蓝图结果
   */
  static async regenerateBlueprint(
    userId: string, 
    userProfile: Record<string, any>
  ): Promise<BlueprintResult> {
    try {
      const url = `${API_CONFIG.KIMI_BASE_URL}${API_ENDPOINTS.BLUEPRINT.REGENERATE(userId)}`;
      const response = await httpClient.post(url, {
        user_profile: userProfile
      }, {
        baseURL: '' // 覆盖默认baseURL以使用完整URL
      });
      return response.data.data;
    } catch (error) {
      console.error('重新生成蓝图失败:', error);
      throw error;
    }
  }

  /**
   * 删除用户的蓝图结果
   * @param userId 用户ID
   * @returns 删除结果
   */
  static async deleteBlueprint(userId: string): Promise<{ success: boolean; message: string }> {
    try {
      const url = `${API_CONFIG.KIMI_BASE_URL}${API_ENDPOINTS.BLUEPRINT.DELETE(userId)}`;
      const response = await httpClient.delete(url, {
        baseURL: '' // 覆盖默认baseURL以使用完整URL
      });
      return response.data;
    } catch (error) {
      console.error('删除蓝图结果失败:', error);
      throw error;
    }
  }

  /**
   * 快速生成五行计算结果
   * @param request 快速生成请求数据
   * @returns 快速生成的五行结果
   */
  static async generateBlueprintQuick(request: BlueprintGenerateRequest): Promise<BlueprintResult> {
    try {
      // 为blueprint/quick设置更长的超时时间（60秒）
      const url = `${API_CONFIG.KIMI_BASE_URL}${API_ENDPOINTS.BLUEPRINT.QUICK}`;
      const response = await httpClient.post(url, request, {
        timeout: 60000, // 60秒超时
        baseURL: '' // 覆盖默认baseURL以使用完整URL
      });
      return response.data.data;
    } catch (error) {
      console.error('快速生成五行结果失败:', error);
      throw error;
    }
  }

  /**
   * 基于五行结果生成完整蓝图
   * @param request 完整生成请求数据
   * @returns 完整的蓝图结果
   */
  static async generateBlueprintComplete(request: BlueprintGenerateRequest): Promise<BlueprintResult> {
    try {
      // 为blueprint/complete设置更长的超时时间（90秒）
      const url = `${API_CONFIG.KIMI_BASE_URL}${API_ENDPOINTS.BLUEPRINT.COMPLETE}`;
      const response = await httpClient.post(url, request, {
        timeout: 90000, // 90秒超时
        baseURL: '' // 覆盖默认baseURL以使用完整URL
      });
      return response.data.data;
    } catch (error) {
      console.error('生成完整蓝图失败:', error);
      throw error;
    }
  }

  /**
   * 获取用户的蓝图生成状态
   * @param userId 用户ID
   * @returns 生成状态信息
   */
  static async getBlueprintStatus(userId: string): Promise<BlueprintStatus> {
    try {
      const url = `${API_CONFIG.KIMI_BASE_URL}${API_ENDPOINTS.BLUEPRINT.STATUS(userId)}`;
      const response = await httpClient.get(url, {
        baseURL: '' // 覆盖默认baseURL以使用完整URL
      });
      return response.data.data;
    } catch (error) {
      console.error('获取蓝图状态失败:', error);
      throw error;
    }
  }

  /**
   * 检查蓝图是否完整
   * @param blueprint 蓝图结果
   * @returns 是否完整
   */
  static isBlueprintComplete(blueprint: BlueprintResult): boolean {
    return blueprint.generation_status === 'complete' && 
           !!blueprint.bazi && 
           !!blueprint.elemental_profile && 
           !!blueprint.core_analysis && 
           !!blueprint.inner_blueprint;
  }

  /**
   * 获取主导元素
   * @param elementalProfile 五行分析
   * @returns 主导元素名称
   */
  static getDominantElement(elementalProfile: ElementalProfile): string {
    const elements = [
      { name: '金', strength: elementalProfile.metal.strength },
      { name: '木', strength: elementalProfile.wood.strength },
      { name: '水', strength: elementalProfile.water.strength },
      { name: '火', strength: elementalProfile.fire.strength },
      { name: '土', strength: elementalProfile.earth.strength }
    ];
    
    return elements.reduce((prev, current) => 
      prev.strength > current.strength ? prev : current
    ).name;
  }

  /**
   * 格式化八字显示
   * @param bazi 八字数据
   * @returns 格式化的八字字符串
   */
  static formatBazi(bazi: Bazi): string {
    return `${bazi.year_pillar.heavenly_stem}${bazi.year_pillar.earthly_branch}年 ` +
           `${bazi.month_pillar.heavenly_stem}${bazi.month_pillar.earthly_branch}月 ` +
           `${bazi.day_pillar.heavenly_stem}${bazi.day_pillar.earthly_branch}日 ` +
           `${bazi.hour_pillar.heavenly_stem}${bazi.hour_pillar.earthly_branch}时`;
  }

  /**
   * 获取五行强度图表数据
   * @param elementalProfile 五行分析
   * @returns 图表数据
   */
  static getElementalChartData(elementalProfile: ElementalProfile): ChartDataPoint[] {
    return [
      { axis: '金', value: elementalProfile.metal.strength },
      { axis: '木', value: elementalProfile.wood.strength },
      { axis: '水', value: elementalProfile.water.strength },
      { axis: '火', value: elementalProfile.fire.strength },
      { axis: '土', value: elementalProfile.earth.strength }
    ];
  }

  /**
   * 验证用户信息完整性
   * @param userProfile 用户信息
   * @returns 是否完整
   */
  static validateUserProfile(userProfile: Record<string, any>): boolean {
    return !!(
      userProfile.gender &&
      userProfile.birth_date &&
      userProfile.birth_time &&
      userProfile.birth_location
    );
  }
}

// 导出默认实例
export default BlueprintApiService;
