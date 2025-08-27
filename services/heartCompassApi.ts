import httpClient from './httpClient';
import { API_ENDPOINTS } from '../config/api';
import { UserProfile } from './userApi';

// Heart Compass相关类型定义
export interface FocusYao {
  yao_number: number; // 爻位 (1-6)
  yao_text: string; // 爻辞内容
}

export interface Hexagram {
  code: string; // 卦序 (如 '1')
  name: string; // 卦名
  pinyin: string; // 拼音
  title: string; // 英文标题
  focus_yao: FocusYao; // 焦点爻辞
}

export interface Insight {
  revelation: string; // 启示 - 短诗或箴言
  analysis: string; // 分析 - 基于象辞的处境分析
  guidance: string; // 指引 - 行动方向或心态建议
  encouragement: string; // 鼓励 - 温暖治愈的话语
}

export interface DeepWisdom {
  title: string; // 标题
  explanation: string; // 详细解释
  philosophical_meaning: string; // 哲学含义
  personal_interpretation: string; // 个人解读
}

export interface ActionGuide {
  title: string; // 标题
  main_actions: string[]; // 主要行动
  supporting_actions: string[]; // 支持行动
  inspirational_message: string; // 激励话语
}

export interface Summary {
  title: string; // 固定标题，应为 "Summary"
  situation_code: string; // 情境代码 (如 '乾卦 (#1)')
  core_strategy: string; // 核心策略 (四字短语)
  action_guide: string[]; // 行动指南 (2-3条具体建议)
}

export interface HeartCompassRecord {
  _id: string;
  user_id: string;
  question: string; // 用户问题/困惑文本
  hexagram: Hexagram; // 对应的卦象信息
  insight: Insight; // 洞察 (四个环节)
  deep_wisdom: DeepWisdom; // 深层智慧
  action_guide: ActionGuide; // 行动指南
  summary: Summary; // 总结
  ai_generated: string; // Gemini AI 生成的完整指导
  created_at: string;
  updated_at: string;
}

export interface HeartCompassRequest {
  user_id: string;
  question: string; // 用户的具体困惑文本
  user_profile: UserProfile; // 用户信息，用于个性化分析
}

export interface AskAgainRequest {
  user_id: string;
  question: string; // 新的问题或深入探讨
  previous_guidance_id?: string; // 之前的指导ID，用于上下文关联
}

export interface HeartCompassResponse {
  success: boolean;
  data: HeartCompassRecord;
  message?: string;
}

export interface HeartCompassHistoryResponse {
  success: boolean;
  data: HeartCompassRecord[];
  total: number;
  page: number;
  limit: number;
  message?: string;
}

/**
 * Heart Compass API服务类
 * 提供易经指导相关的所有API调用方法
 */
export class HeartCompassApiService {
  /**
   * 寻求指导
   * @param request 指导请求数据
   * @returns 指导记录
   */
  static async seekGuidance(request: HeartCompassRequest): Promise<HeartCompassRecord> {
    try {
      const response = await httpClient.post(API_ENDPOINTS.HEART_COMPASS.SEEK_GUIDANCE, request);
      return response.data.data;
    } catch (error) {
      console.error('寻求指导失败:', error);
      throw error;
    }
  }

  /**
   * 重新提问
   * @param request 重新提问请求数据
   * @returns 新的指导记录
   */
  static async askAgain(request: AskAgainRequest): Promise<HeartCompassRecord> {
    try {
      const response = await httpClient.post(API_ENDPOINTS.HEART_COMPASS.ASK_AGAIN, request);
      return response.data.data;
    } catch (error) {
      console.error('重新提问失败:', error);
      throw error;
    }
  }

  /**
   * 获取指导历史
   * @param userId 用户ID
   * @param page 页码，从1开始
   * @param limit 每页记录数，最大100
   * @returns 指导历史记录
   */
  static async getGuidanceHistory(
    userId: string, 
    page: number = 1, 
    limit: number = 10
  ): Promise<HeartCompassHistoryResponse> {
    try {
      const response = await httpClient.get(API_ENDPOINTS.HEART_COMPASS.HISTORY(userId), {
        params: { page, limit }
      });
      return response.data;
    } catch (error) {
      console.error('获取指导历史失败:', error);
      throw error;
    }
  }

  /**
   * 根据ID获取指导记录
   * @param guidanceId 指导记录ID
   * @returns 指导记录
   */
  static async getGuidanceById(guidanceId: string): Promise<HeartCompassRecord> {
    try {
      const response = await httpClient.get(API_ENDPOINTS.HEART_COMPASS.GET_BY_ID(guidanceId));
      return response.data.data;
    } catch (error) {
      console.error('获取指导记录失败:', error);
      throw error;
    }
  }

  /**
   * 删除指导记录
   * @param guidanceId 指导记录ID
   * @param userId 用户ID（用于验证权限）
   * @returns 删除结果
   */
  static async deleteGuidance(
    guidanceId: string, 
    userId: string
  ): Promise<{ success: boolean; message: string }> {
    try {
      const response = await httpClient.delete(API_ENDPOINTS.HEART_COMPASS.DELETE(guidanceId), {
        params: { user_id: userId }
      });
      return response.data;
    } catch (error) {
      console.error('删除指导记录失败:', error);
      throw error;
    }
  }

  /**
   * 格式化卦象显示名称
   * @param hexagram 卦象信息
   * @returns 格式化的显示名称
   */
  static formatHexagramDisplay(hexagram: Hexagram): string {
    return `${hexagram.name} (${hexagram.pinyin})`;
  }

  /**
   * 获取卦象的简短描述
   * @param hexagram 卦象信息
   * @returns 简短描述
   */
  static getHexagramSummary(hexagram: Hexagram): string {
    return `${hexagram.title} - ${hexagram.focus_yao.yao_text}`;
  }

  /**
   * 验证问题文本
   * @param question 问题文本
   * @returns 是否有效
   */
  static validateQuestion(question: string): boolean {
    return question.trim().length >= 5 && question.trim().length <= 500;
  }

  /**
   * 获取问题提示示例
   * @returns 问题提示数组
   */
  static getQuestionExamples(): string[] {
    return [
      "我最近在事业上遇到了瓶颈，该如何突破？",
      "感情中出现了信任危机，我该如何面对？",
      "人生方向迷茫，找不到前进的动力，请给我指引",
      "工作压力很大，如何平衡工作与生活？",
      "与家人关系紧张，如何改善家庭氛围？",
      "对未来充满恐惧，如何建立信心？"
    ];
  }
}

// 导出默认实例
export default HeartCompassApiService;
