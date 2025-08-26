# API配置指南

## 概述

本指南说明如何配置前端应用以支持不同的访问环境（本地开发、网络访问等）。

## 问题描述

之前的前端配置硬编码了 `http://localhost:8000` 作为后端地址，导致：
- 本地访问 `http://localhost:3000` 时能正常连接后端
- 网络访问 `http://183.173.136.51:3000` 时无法连接后端

## 解决方案

### 1. 环境配置系统

我们创建了一个智能的环境配置系统，能够自动检测访问环境并配置相应的后端地址：

```typescript
// config/environment.ts
const ENVIRONMENT_CONFIGS = {
  // 本地开发环境
  localhost: {
    backend: { host: 'localhost', port: 8000, protocol: 'http' },
    // ...
  },
  
  // 网络环境
  '183.173.136.51': {
    backend: { host: '183.173.136.51', port: 8000, protocol: 'http' },
    // ...
  }
};
```

### 2. 动态API地址

API配置现在会根据访问环境自动选择正确的后端地址：

```typescript
// config/api.ts
export const API_CONFIG = {
  get BASE_URL() {
    return buildBackendUrl(); // 自动检测环境
  }
};
```

## 配置说明

### 本地开发环境
- 访问地址：`http://localhost:3000`
- 后端地址：`http://localhost:8000`
- 用途：本地开发和测试

### 网络访问环境
- 访问地址：`http://183.173.136.51:3000`
- 后端地址：`http://183.173.136.51:8000`
- 用途：网络用户访问

### 其他环境
- 自动检测主机名，使用 `http://{hostname}:8000` 作为后端地址
- 支持自定义域名和IP地址

## 使用方法

### 1. 开发环境
```bash
# 启动前端开发服务器
npm run dev

# 访问 http://localhost:3000
# 后端将自动连接到 http://localhost:8000
```

### 2. 生产环境
```bash
# 构建前端应用
npm run build

# 部署到服务器
# 访问 http://183.173.136.51:3000
# 后端将自动连接到 http://183.173.136.51:8000
```

### 3. 调试配置

在开发环境中，页面右下角会显示一个"显示 API配置"按钮，点击可以查看：
- 当前访问的主机和端口
- 后端API地址
- 环境信息
- 测试后端连接功能

## 添加新的环境配置

如果需要支持新的环境，可以在 `config/environment.ts` 中添加配置：

```typescript
const ENVIRONMENT_CONFIGS = {
  // 现有配置...
  
  // 新环境配置
  'your-domain.com': {
    backend: {
      host: 'your-domain.com',
      port: 8000,
      protocol: 'https' // 支持HTTPS
    },
    frontend: {
      host: 'your-domain.com',
      port: 443,
      protocol: 'https'
    },
    isDevelopment: false,
    isProduction: true
  }
};
```

## 注意事项

1. **后端配置**：确保后端服务器配置了正确的监听地址（`0.0.0.0:8000`）
2. **防火墙设置**：确保服务器防火墙允许8000端口的访问
3. **CORS配置**：后端已配置允许所有来源的CORS
4. **端口一致性**：前端使用3000端口，后端使用8000端口

## 故障排除

### 1. 网络访问无法连接后端
- 检查后端服务器是否正在运行
- 检查防火墙设置
- 检查后端是否监听在 `0.0.0.0:8000`

### 2. 配置不生效
- 清除浏览器缓存
- 检查浏览器控制台是否有错误
- 使用调试组件查看当前配置

### 3. 后端连接测试失败
- 检查后端服务状态
- 检查网络连接
- 检查端口是否被占用

## 技术实现

- **环境检测**：使用 `window.location.hostname` 检测当前访问的主机
- **动态配置**：使用JavaScript getter函数实现动态配置
- **类型安全**：使用TypeScript接口定义配置结构
- **调试支持**：提供可视化的配置调试组件
