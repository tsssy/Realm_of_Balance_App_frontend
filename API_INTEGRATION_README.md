# API集成说明文档

## 概述
本文档说明了前端如何与后端API集成，实现新用户注册流程。

## 已实现的功能

### 1. 用户注册流程
- **引导页面** → **出生时间选择** → **出生地点选择** → **用户创建** → **元素分析**

### 2. API调用流程
1. 用户进入应用时，自动生成设备ID
2. 检查用户状态（新用户/老用户）
3. 用户填写出生信息
4. 点击"Complete Blueprint"时调用 `POST /api/v1/user/create`
5. 创建成功后保存用户ID，继续到下一步

### 3. 数据格式
```typescript
// 用户创建请求格式
{
  device_id: "device_1234567890_abc123",
  profile: {
    gender: "other", // 默认值，后续会添加性别选择
    birth_date: "1990-01-01", // YYYY-MM-DD格式
    birth_time: "12:00", // HH:MM格式
    birth_location: "New York, NY, USA"
  }
}
```

## 技术实现

### 1. 文件结构
```
src/
├── config/
│   └── api.ts                    # API配置文件
├── services/
│   ├── httpClient.ts             # HTTP客户端
│   ├── userApi.ts                # 用户API服务
│   ├── heartCompassApi.ts        # Heart Compass API服务
│   ├── dailyFortuneApi.ts        # Daily Fortune API服务
│   ├── blueprintApi.ts           # Blueprint API服务
│   ├── index.ts                  # 统一导出
│   └── apiTest.ts                # API测试工具
```

### 2. 关键组件修改
- **App.tsx**: 添加用户状态管理和API调用逻辑
- **BirthLocationSelection.tsx**: 添加加载状态和禁用逻辑

### 3. 状态管理
- `userProfile`: 用户基本信息
- `userId`: 用户ID（创建成功后设置）
- `isLoading`: 加载状态（API调用期间）

## 使用方法

### 1. 开发环境测试
在浏览器控制台中运行：
```javascript
// 测试后端连接
ApiTestService.testBackendConnection()

// 运行所有API测试
ApiTestService.runAllTests()
```

### 2. 调试信息
应用会在控制台输出详细的调试信息：
- 🔧 设备ID生成
- 🔧 用户状态检查
- 🔧 用户创建过程
- 🎉 成功信息
- ❌ 错误信息

## 注意事项

### 1. 性别字段
- 目前设置为默认值 "other"
- 后续会添加性别选择界面

### 2. 错误处理
- API调用失败时会继续流程（临时处理）
- 后续需要添加用户友好的错误提示

### 3. 设备ID
- 自动生成并存储在localStorage中
- 用于识别用户设备

## 下一步计划

1. **添加性别选择界面**
2. **完善错误处理和用户提示**
3. **集成Heart Compass API**
4. **集成Daily Fortune API**
5. **集成Blueprint API**

## 测试检查清单

- [ ] 后端服务正常运行 (http://localhost:8000)
- [ ] 前端能正常访问后端API
- [ ] 用户创建API调用成功
- [ ] 用户ID正确保存
- [ ] 页面跳转正常
- [ ] 加载状态显示正确
- [ ] 控制台无错误信息
