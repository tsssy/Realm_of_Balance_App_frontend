import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { API_CONFIG } from '../config/api';

// 创建axios实例
const httpClient: AxiosInstance = axios.create({
  baseURL: API_CONFIG.FULL_BASE_URL, // 使用完整的API基础URL，包含/api/v1
  timeout: API_CONFIG.TIMEOUT,
  headers: API_CONFIG.HEADERS,
});

// 请求拦截器
httpClient.interceptors.request.use(
  (config) => {
    // 添加设备ID到请求头（用于用户识别）
    const deviceId = localStorage.getItem('device_id');
    if (deviceId && config.headers) {
      config.headers['Device-ID'] = deviceId;
    }
    
    // 开发环境日志
    if (import.meta.env.DEV) {
      console.log('🚀 API Request:', {
        method: config.method?.toUpperCase(),
        url: config.url,
        data: config.data,
        headers: config.headers,
      });
    }
    
    return config;
  },
  (error: AxiosError) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// 响应拦截器
httpClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // 开发环境日志
    if (import.meta.env.DEV) {
      console.log('✅ API Response:', {
        status: response.status,
        url: response.config.url,
        data: response.data,
      });
    }
    
    return response;
  },
  async (error: AxiosError) => {
    // 错误处理
    if (error.response) {
      // 服务器返回错误状态码
      const { status, data } = error.response;
      
      console.error('❌ API Error Response:', {
        status,
        url: error.config?.url,
        data,
      });
      
      // 根据状态码处理特定错误
      switch (status) {
        case 401:
          // 未授权，清除本地存储的用户信息
          localStorage.removeItem('user_id');
          localStorage.removeItem('device_id');
          break;
        case 404:
          console.warn('⚠️ 请求的资源不存在');
          break;
        case 500:
          console.error('💥 服务器内部错误');
          break;
        default:
          console.error(`💥 HTTP错误 ${status}: ${data}`);
      }
    } else if (error.request) {
      // 请求已发出但没有收到响应
      console.error('❌ Network Error: 无法连接到服务器');
    } else {
      // 请求配置错误
      console.error('❌ Request Config Error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

// 重试机制
export const retryRequest = async <T>(
  requestFn: () => Promise<T>,
  maxRetries: number = API_CONFIG.RETRY.MAX_RETRIES,
  delay: number = API_CONFIG.RETRY.RETRY_DELAY
): Promise<T> => {
  let lastError: Error;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await requestFn();
    } catch (error) {
      lastError = error as Error;
      
      if (attempt === maxRetries) {
        throw lastError;
      }
      
      // 等待后重试
      await new Promise(resolve => setTimeout(resolve, delay * attempt));
      
      console.log(`🔄 重试请求 (${attempt}/${maxRetries})`);
    }
  }
  
  throw lastError!;
};

// 导出HTTP客户端实例
export default httpClient;

// 导出类型
export type { AxiosInstance, AxiosResponse, AxiosError };
