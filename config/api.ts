// API配置文件
export const API_CONFIG = {
  // 后端API基础URL - 本地开发环境
  BASE_URL: 'http://localhost:8001', // 本地开发直连后端（8001端口避免与Cursor冲突）
  
  // 生产环境配置（注释保留）
  // BASE_URL: window.location.origin, // 使用当前域名，nginx会代理到后端
  
  // API版本路径
  API_V1: '/api/v1',
  API_V2: '/api/v2',
  
  // 完整的API基础URL
  get FULL_BASE_URL() {
    return `${this.BASE_URL}${this.API_V1}`;
  },
  
  // Kimi API基础URL
  get KIMI_BASE_URL() {
    return `${this.BASE_URL}${this.API_V2}`;
  },
  
  // 请求超时时间（毫秒）
  TIMEOUT: 30000,
  
  // 请求头配置
  HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  
  // 重试配置
  RETRY: {
    MAX_RETRIES: 3,
    RETRY_DELAY: 1000,
  }
};

// API端点配置
export const API_ENDPOINTS = {
  // 用户相关
  USER: {
    STATUS: '/user/status',
    CREATE: '/user/create',
    UPDATE: (userId: string) => `/user/${userId}`,
    GET: (userId: string) => `/user/${userId}`,
    DELETE: (userId: string) => `/user/${userId}`,
    STATUS_SUMMARY: (userId: string) => `/user/${userId}/status`,
  },
  
  // Heart Compass相关 - Kimi版本
  HEART_COMPASS: {
    SEEK_GUIDANCE: '/kimi-heart-compass/seek-guidance',
    ASK_AGAIN: '/kimi-heart-compass/ask-again',
    HISTORY: (userId: string) => `/kimi-heart-compass/${userId}/history`,
    GET_BY_ID: (guidanceId: string) => `/kimi-heart-compass/guidance/${guidanceId}`,
    DELETE: (guidanceId: string) => `/kimi-heart-compass/guidance/${guidanceId}`,
  },
  
  // Daily Fortune相关 - Kimi版本
  DAILY_FORTUNE: {
    GENERATE: '/kimi-daily-fortune/generate',
    TODAY: (userId: string) => `/kimi-daily-fortune/${userId}/today`,
    HISTORY: (userId: string) => `/kimi-daily-fortune/${userId}/history`,
    BY_DATE: (userId: string, date: string) => `/kimi-daily-fortune/${userId}/date/${date}`,
    DELETE_BY_DATE: (userId: string, date: string) => `/kimi-daily-fortune/${userId}/date/${date}`,
  },
  
  // Blueprint相关 - Kimi版本
  BLUEPRINT: {
    GENERATE: '/kimi-blueprint/generate',
    GET: (userId: string) => `/kimi-blueprint/${userId}`,
    REGENERATE: (userId: string) => `/kimi-blueprint/${userId}/regenerate`,
    DELETE: (userId: string) => `/kimi-blueprint/${userId}`,
    QUICK: '/kimi-blueprint/quick',
    COMPLETE: '/kimi-blueprint/complete',
    STATUS: (userId: string) => `/kimi-blueprint/${userId}/status`,
  },
  
  // 健康检查
  HEALTH: '/health',
};

// 环境配置
export const ENV_CONFIG = {
  // 是否为开发环境
  IS_DEV: import.meta.env.DEV,
  
  // 是否为生产环境
  IS_PROD: import.meta.env.PROD,
  
  // 是否为测试环境
  IS_TEST: import.meta.env.MODE === 'test',
};

// 根据环境动态设置API URL
export const getApiBaseUrl = () => {
  if (ENV_CONFIG.IS_DEV) {
    // 本地开发环境直接连接本地后端（8001端口避免与Cursor冲突）
    return 'http://localhost:8001';
  }
  
  // 生产环境使用nginx代理
  // return window.location.origin;
  return API_CONFIG.BASE_URL;
};
