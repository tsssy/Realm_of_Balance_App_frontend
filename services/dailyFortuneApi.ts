import httpClient from './httpClient';
import { API_ENDPOINTS, API_CONFIG } from '../config/api';
import { UserProfile } from './userApi';

// Daily Fortune相关类型定义
export interface Hexagram {
  code: string; // 卦序
  name: string; // 卦名
  pinyin: string; // 拼音
  title: string; // 英文标题
  energy: string; // 能量描述
  luck: number; // 幸运指数 (0-100)
}

export interface TimeAdvice {
  period: string; // 时间段
  start_time: string; // 开始时间
  end_time: string; // 结束时间
  activity: string; // 建议活动
  description: string; // 详细描述
  energy: string; // 能量状态
  priority: string; // 优先级
}

export interface LuckyElements {
  color: string; // 幸运颜色
  direction: string; // 幸运方向
  number: number; // 幸运数字
  element: string; // 幸运元素
  gemstone: string; // 幸运宝石
}

export interface DailyFortune {
  _id: string;
  user_id: string;
  date: string; // 运势日期
  hexagram: Hexagram; // 当日卦象
  time_advice: TimeAdvice[]; // 时段建议
  lucky_elements: LuckyElements; // 幸运元素
  personal_advice: string; // 个性化建议
  ai_generated: string; // Gemini AI 生成的运势内容
  created_at: string;
  updated_at: string;
}

export interface DailyFortuneRequest {
  user_id: string;
  user_profile: UserProfile;
  date?: string; // 运势日期，格式：YYYY-MM-DD，默认为今天
}

export interface DailyFortuneResponse {
  success: boolean;
  data: DailyFortune;
  message?: string;
}

export interface DailyFortuneHistoryResponse {
  success: boolean;
  data: DailyFortune[];
  total: number;
  message?: string;
}

/**
 * Daily Fortune API服务类
 * 提供每日运势相关的所有API调用方法
 */
export class DailyFortuneApiService {
  /**
   * 生成今日运势
   * @param request 运势生成请求数据
   * @returns 生成的运势记录
   */
  static async generateDailyFortune(request: DailyFortuneRequest): Promise<DailyFortune> {
    try {
      const url = `${API_CONFIG.KIMI_BASE_URL}${API_ENDPOINTS.DAILY_FORTUNE.GENERATE}`;
      const response = await httpClient.post(url, request, {
        baseURL: '' // 覆盖默认baseURL以使用完整URL
      });
      return response.data.data;
    } catch (error) {
      console.error('生成运势失败:', error);
      throw error;
    }
  }

  /**
   * 获取今日运势
   * @param userId 用户ID
   * @returns 今日运势记录
   */
  static async getTodayFortune(userId: string): Promise<DailyFortune> {
    try {
      const url = `${API_CONFIG.KIMI_BASE_URL}${API_ENDPOINTS.DAILY_FORTUNE.TODAY(userId)}`;
      const response = await httpClient.get(url, {
        baseURL: '' // 覆盖默认baseURL以使用完整URL
      });
      return response.data.data;
    } catch (error) {
      console.error('获取今日运势失败:', error);
      throw error;
    }
  }

  /**
   * 获取运势历史
   * @param userId 用户ID
   * @param startDate 开始日期（可选）
   * @param endDate 结束日期（可选）
   * @returns 运势历史记录
   */
  static async getFortuneHistory(
    userId: string,
    startDate?: string,
    endDate?: string
  ): Promise<DailyFortuneHistoryResponse> {
    try {
      const params: any = {};
      if (startDate) params.start_date = startDate;
      if (endDate) params.end_date = endDate;
      
      const url = `${API_CONFIG.KIMI_BASE_URL}${API_ENDPOINTS.DAILY_FORTUNE.HISTORY(userId)}`;
      const response = await httpClient.get(url, {
        params,
        baseURL: '' // 覆盖默认baseURL以使用完整URL
      });
      return response.data;
    } catch (error) {
      console.error('获取运势历史失败:', error);
      throw error;
    }
  }

  /**
   * 获取指定日期的运势
   * @param userId 用户ID
   * @param date 日期，格式：YYYY-MM-DD
   * @returns 指定日期的运势记录
   */
  static async getFortuneByDate(userId: string, date: string): Promise<DailyFortune> {
    try {
      const url = `${API_CONFIG.KIMI_BASE_URL}${API_ENDPOINTS.DAILY_FORTUNE.BY_DATE(userId, date)}`;
      const response = await httpClient.get(url, {
        baseURL: '' // 覆盖默认baseURL以使用完整URL
      });
      return response.data.data;
    } catch (error) {
      console.error('获取指定日期运势失败:', error);
      throw error;
    }
  }

  /**
   * 删除指定日期的运势
   * @param userId 用户ID
   * @param date 日期，格式：YYYY-MM-DD
   * @returns 删除结果
   */
  static async deleteFortuneByDate(
    userId: string, 
    date: string
  ): Promise<{ success: boolean; message: string }> {
    try {
      const url = `${API_CONFIG.KIMI_BASE_URL}${API_ENDPOINTS.DAILY_FORTUNE.DELETE_BY_DATE(userId, date)}`;
      const response = await httpClient.delete(url, {
        baseURL: '' // 覆盖默认baseURL以使用完整URL
      });
      return response.data;
    } catch (error) {
      console.error('删除指定日期运势失败:', error);
      throw error;
    }
  }

  /**
   * 格式化日期显示
   * @param dateString 日期字符串
   * @returns 格式化的日期显示
   */
  static formatDateDisplay(dateString: string): string {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return '今天';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return '昨天';
    } else {
      return date.toLocaleDateString('zh-CN', {
        month: 'long',
        day: 'numeric',
        weekday: 'long'
      });
    }
  }

  /**
   * 获取幸运等级描述
   * @param luckScore 幸运指数
   * @returns 幸运等级描述
   */
  static getLuckLevel(luckScore: number): { level: string; color: string; description: string } {
    if (luckScore >= 90) {
      return { level: '极佳', color: '#FFD700', description: '今天运势极佳，适合做重要决定' };
    } else if (luckScore >= 80) {
      return { level: '很好', color: '#32CD32', description: '今天运势很好，可以大胆尝试新事物' };
    } else if (luckScore >= 70) {
      return { level: '良好', color: '#87CEEB', description: '今天运势良好，保持积极心态' };
    } else if (luckScore >= 60) {
      return { level: '一般', color: '#FFA500', description: '今天运势一般，需要谨慎行事' };
    } else if (luckScore >= 50) {
      return { level: '普通', color: '#808080', description: '今天运势普通，保持平常心' };
    } else {
      return { level: '需谨慎', color: '#FF6347', description: '今天需要特别谨慎，避免冒险' };
    }
  }

  /**
   * 获取时段建议的图标
   * @param period 时段名称
   * @returns 对应的图标标识
   */
  static getTimePeriodIcon(period: string): string {
    if (period.includes('早晨') || period.includes('Morning')) {
      return '🌅';
    } else if (period.includes('上午') || period.includes('Morning')) {
      return '☀️';
    } else if (period.includes('下午') || period.includes('Afternoon')) {
      return '🌤️';
    } else if (period.includes('傍晚') || period.includes('Evening')) {
      return '🌆';
    } else if (period.includes('晚上') || period.includes('Night')) {
      return '🌙';
    } else {
      return '⏰';
    }
  }

  /**
   * 验证日期格式
   * @param dateString 日期字符串
   * @returns 是否有效
   */
  static validateDate(dateString: string): boolean {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(dateString)) return false;
    
    const date = new Date(dateString);
    return !isNaN(date.getTime());
  }

  /**
   * 获取当前日期字符串
   * @returns 当前日期字符串，格式：YYYY-MM-DD
   */
  static getCurrentDateString(): string {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }
}

// 导出默认实例
export default DailyFortuneApiService;
