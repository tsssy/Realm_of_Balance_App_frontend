import { buildBackendUrl, getEnvironmentInfo } from './environment';

// API配置文件
export const API_CONFIG = {
  // 后端API基础URL - 使用环境配置系统
  get BASE_URL() {
    return buildBackendUrl();
  },
  
  // API版本路径
  API_V1: '/api/v1',
  
  // 完整的API基础URL
  get FULL_BASE_URL() {
    return `${this.BASE_URL}${this.API_V1}`;
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
  
  // Heart Compass相关
  HEART_COMPASS: {
    SEEK_GUIDANCE: '/heart-compass/seek-guidance',
    ASK_AGAIN: '/heart-compass/ask-again',
    HISTORY: (userId: string) => `/heart-compass/${userId}/history`,
    GET_BY_ID: (guidanceId: string) => `/heart-compass/guidance/${guidanceId}`,
    DELETE: (guidanceId: string) => `/heart-compass/guidance/${guidanceId}`,
  },
  
  // Daily Fortune相关
  DAILY_FORTUNE: {
    GENERATE: '/daily-fortune/generate',
    TODAY: (userId: string) => `/daily-fortune/${userId}/today`,
    HISTORY: (userId: string) => `/daily-fortune/${userId}/history`,
    BY_DATE: (userId: string, date: string) => `/daily-fortune/${userId}/date/${date}`,
    DELETE_BY_DATE: (userId: string, date: string) => `/daily-fortune/${userId}/date/${date}`,
  },
  
  // Blueprint相关
  BLUEPRINT: {
    GENERATE: '/blueprint/generate',
    GET: (userId: string) => `/blueprint/${userId}`,
    REGENERATE: (userId: string) => `/blueprint/${userId}/regenerate`,
    DELETE: (userId: string) => `/blueprint/${userId}`,
    QUICK: '/blueprint/quick',
    COMPLETE: '/blueprint/complete',
    STATUS: (userId: string) => `/blueprint/${userId}/status`,
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
  
  // 当前访问的主机名
  CURRENT_HOST: typeof window !== 'undefined' ? window.location.hostname : 'localhost',
  
  // 当前访问的端口
  CURRENT_PORT: typeof window !== 'undefined' ? window.location.port : '3000',
  
  // 是否为本地访问
  IS_LOCAL: typeof window !== 'undefined' ? 
    (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') : true,
  
  // 是否为网络访问
  IS_NETWORK: typeof window !== 'undefined' ? 
    (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') : false,
};

// 根据环境动态设置API URL
export const getApiBaseUrl = () => {
  return buildBackendUrl();
};

// 获取完整的API URL（包含版本路径）
export const getFullApiUrl = () => {
  return API_CONFIG.FULL_BASE_URL;
};

// 调试信息
export const getApiDebugInfo = () => {
  const envInfo = getEnvironmentInfo();
  return {
    ...envInfo,
    baseUrl: API_CONFIG.BASE_URL,
    fullUrl: API_CONFIG.FULL_BASE_URL,
    environment: ENV_CONFIG.IS_DEV ? 'development' : ENV_CONFIG.IS_PROD ? 'production' : 'test'
  };
};
