// 环境配置文件
export interface EnvironmentConfig {
  // 后端API配置
  backend: {
    host: string;
    port: number;
    protocol: string;
  };
  
  // 前端配置
  frontend: {
    host: string;
    port: number;
    protocol: string;
  };
  
  // 是否为开发环境
  isDevelopment: boolean;
  
  // 是否为生产环境
  isProduction: boolean;
}

// 环境配置映射
const ENVIRONMENT_CONFIGS: Record<string, EnvironmentConfig> = {
  // 本地开发环境
  localhost: {
    backend: {
      host: 'localhost',
      port: 8080,  // 改为8080端口
      protocol: 'http'
    },
    frontend: {
      host: 'localhost',
      port: 3000,
      protocol: 'http'
    },
    isDevelopment: true,
    isProduction: false
  },
  
  // 127.0.0.1 本地环境
  '127.0.0.1': {
    backend: {
      host: '127.0.0.1',
      port: 8080,  // 改为8080端口
      protocol: 'http'
    },
    frontend: {
      host: '127.0.0.1',
      port: 3000,
      protocol: 'http'
    },
    isDevelopment: true,
    isProduction: false
  },
  
  // 网络环境 (183.173.136.51)
  '183.173.136.51': {
    backend: {
      host: '183.173.136.51',
      port: 8080,  // 更新为8080端口，提高移动网络兼容性
      protocol: 'http'
    },
    frontend: {
      host: '183.173.136.51',
      port: 3000,
      protocol: 'http'
    },
    isDevelopment: false,
    isProduction: true
  }
};

// 获取当前环境配置
export const getCurrentEnvironment = (): EnvironmentConfig => {
  const hostname = typeof window !== 'undefined' ? window.location.hostname : 'localhost';
  const currentPort = typeof window !== 'undefined' ? parseInt(window.location.port) || 3000 : 3000;
  
  // 如果找到匹配的环境配置，使用它，但更新端口
  if (ENVIRONMENT_CONFIGS[hostname]) {
    const config = { ...ENVIRONMENT_CONFIGS[hostname] };
    // 动态更新前端端口
    config.frontend.port = currentPort;
    return config;
  }
  
  // 如果没有找到匹配的配置，使用默认配置
  return {
    backend: {
      host: hostname,
      port: 8000,
      protocol: 'http'
    },
    frontend: {
      host: hostname,
      port: currentPort,
      protocol: 'http'
    },
    isDevelopment: false,
    isProduction: true
  };
};

// 构建后端API URL
export const buildBackendUrl = (): string => {
  const env = getCurrentEnvironment();
  return `${env.backend.protocol}://${env.backend.host}:${env.backend.port}`;
};

// 构建前端URL
export const buildFrontendUrl = (): string => {
  const env = getCurrentEnvironment();
  return `${env.frontend.protocol}://${env.frontend.host}:${env.frontend.port}`;
};

// 环境信息
export const getEnvironmentInfo = () => {
  const env = getCurrentEnvironment();
  const currentPort = typeof window !== 'undefined' ? window.location.port : '3000';
  
  return {
    currentHost: typeof window !== 'undefined' ? window.location.hostname : 'localhost',
    currentPort: currentPort,
    backendUrl: buildBackendUrl(),
    frontendUrl: buildFrontendUrl(),
    isDevelopment: env.isDevelopment,
    isProduction: env.isProduction,
    environment: env.isDevelopment ? 'development' : 'production'
  };
};
