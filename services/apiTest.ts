// API服务测试文件
// 用于测试各个API服务是否正常工作

import { UserApiService, HeartCompassApiService, DailyFortuneApiService, BlueprintApiService } from './index';

/**
 * API服务测试类
 * 提供测试各个API服务的方法
 */
export class ApiTestService {
  /**
   * 测试用户API服务
   */
  static async testUserApi() {
    console.log('🧪 开始测试用户API服务...');
    
    try {
      // 生成设备ID
      const deviceId = UserApiService.generateDeviceId();
      console.log('✅ 设备ID生成成功:', deviceId);
      
      // 检查用户状态
      const userStatus = await UserApiService.checkUserStatus(deviceId);
      console.log('✅ 用户状态检查成功:', userStatus);
      
      return { success: true, deviceId, userStatus };
    } catch (error) {
      console.error('❌ 用户API测试失败:', error);
      return { success: false, error };
    }
  }

  /**
   * 测试Heart Compass API服务
   */
  static async testHeartCompassApi() {
    console.log('🧪 开始测试Heart Compass API服务...');
    
    try {
      // 获取问题示例
      const examples = HeartCompassApiService.getQuestionExamples();
      console.log('✅ 问题示例获取成功:', examples);
      
      // 验证问题文本
      const isValid = HeartCompassApiService.validateQuestion("这是一个测试问题");
      console.log('✅ 问题验证成功:', isValid);
      
      return { success: true, examples, isValid };
    } catch (error) {
      console.error('❌ Heart Compass API测试失败:', error);
      return { success: false, error };
    }
  }

  /**
   * 测试Daily Fortune API服务
   */
  static async testDailyFortuneApi() {
    console.log('🧪 开始测试Daily Fortune API服务...');
    
    try {
      // 获取当前日期
      const currentDate = DailyFortuneApiService.getCurrentDateString();
      console.log('✅ 当前日期获取成功:', currentDate);
      
      // 验证日期格式
      const isValidDate = DailyFortuneApiService.validateDate(currentDate);
      console.log('✅ 日期验证成功:', isValidDate);
      
      // 获取幸运等级
      const luckLevel = DailyFortuneApiService.getLuckLevel(85);
      console.log('✅ 幸运等级获取成功:', luckLevel);
      
      return { success: true, currentDate, isValidDate, luckLevel };
    } catch (error) {
      console.error('❌ Daily Fortune API测试失败:', error);
      return { success: false, error };
    }
  }

  /**
   * 测试Blueprint API服务
   */
  static async testBlueprintApi() {
    console.log('🧪 开始测试Blueprint API服务...');
    
    try {
      // 验证用户信息完整性
      const testProfile = {
        gender: 'male',
        birth_date: '1990-01-01',
        birth_time: '12:00',
        birth_location: '北京'
      };
      
      const isValidProfile = BlueprintApiService.validateUserProfile(testProfile);
      console.log('✅ 用户信息验证成功:', isValidProfile);
      
      return { success: true, isValidProfile };
    } catch (error) {
      console.error('❌ Blueprint API测试失败:', error);
      return { success: false, error };
    }
  }

  /**
   * 运行所有API测试
   */
  static async runAllTests() {
    console.log('🚀 开始运行所有API测试...');
    
    const results = {
      userApi: await this.testUserApi(),
      heartCompassApi: await this.testHeartCompassApi(),
      dailyFortuneApi: await this.testDailyFortuneApi(),
      blueprintApi: await this.testBlueprintApi()
    };
    
    console.log('📊 API测试结果汇总:', results);
    
    const allPassed = Object.values(results).every(result => result.success);
    
    if (allPassed) {
      console.log('🎉 所有API测试通过！');
    } else {
      console.log('⚠️ 部分API测试失败，请检查错误信息');
    }
    
    return { allPassed, results };
  }

  /**
   * 测试后端连接
   */
  static async testBackendConnection() {
    console.log('🧪 测试后端连接...');
    
    try {
      const response = await fetch('http://localhost:8000/health');
      
      if (response.ok) {
        const data = await response.json();
        console.log('✅ 后端连接成功:', data);
        return { success: true, data };
      } else {
        console.error('❌ 后端连接失败:', response.status, response.statusText);
        return { success: false, status: response.status, statusText: response.statusText };
      }
    } catch (error) {
      console.error('❌ 后端连接测试失败:', error);
      return { success: false, error };
    }
  }
}

// 导出测试服务
export default ApiTestService;

// 如果直接运行此文件，执行测试
if (import.meta.env.DEV) {
  // 延迟执行，确保页面加载完成
  setTimeout(() => {
    console.log('🔧 开发环境检测到，准备执行API测试...');
    // 可以在控制台手动调用：ApiTestService.runAllTests()
  }, 2000);
}
