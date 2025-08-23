import httpClient from './httpClient';
import { API_ENDPOINTS } from '../config/api';

// 用户相关类型定义
export interface UserProfile {
  gender: 'male' | 'female' | 'other';
  birth_date: string; // YYYY-MM-DD格式
  birth_time: string; // HH:MM格式
  birth_location: string;
}

export interface CreateUserRequest {
  device_id: string;
  profile: UserProfile;
}

export interface UpdateUserRequest {
  profile: UserProfile;
}

export interface UserResponse {
  user_id: string;
  device_id: string;
  gender: 'male' | 'female' | 'other';
  birth_date: string;
  birth_time: string;
  birth_location: string;
  is_new_user: boolean;
  created_at: string;
  updated_at: string;
  last_login_at?: string;
}

export interface UserStatusData {
  is_new_user: boolean;
  user_profile?: UserProfile;
  has_blueprint: boolean;
}

export interface UserStatusResponse {
  success: boolean;
  data: UserStatusData;
  message?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

/**
 * 用户API服务类
 * 提供用户管理相关的所有API调用方法
 */
export class UserApiService {
  /**
   * 检查用户状态
   * @param deviceId 设备唯一标识
   * @returns 用户状态信息
   */
  static async checkUserStatus(deviceId: string): Promise<UserStatusResponse> {
    try {
      const response = await httpClient.get(API_ENDPOINTS.USER.STATUS, {
        params: { device_id: deviceId }
      });
      return response.data;
    } catch (error) {
      console.error('检查用户状态失败:', error);
      throw error;
    }
  }

  /**
   * 创建新用户
   * @param userData 用户创建数据
   * @returns 创建的用户信息
   */
  static async createUser(userData: CreateUserRequest): Promise<UserResponse> {
    try {
      const response = await httpClient.post(API_ENDPOINTS.USER.CREATE, userData);
      return response.data;
    } catch (error) {
      console.error('创建用户失败:', error);
      throw error;
    }
  }

  /**
   * 更新用户信息
   * @param userId 用户ID
   * @param userData 更新的用户数据
   * @returns 更新后的用户信息
   */
  static async updateUser(userId: string, userData: UpdateUserRequest): Promise<UserResponse> {
    try {
      const response = await httpClient.put(API_ENDPOINTS.USER.UPDATE(userId), userData);
      return response.data;
    } catch (error) {
      console.error('更新用户失败:', error);
      throw error;
    }
  }

  /**
   * 获取用户信息
   * @param userId 用户ID
   * @returns 用户信息
   */
  static async getUser(userId: string): Promise<UserResponse> {
    try {
      const response = await httpClient.get(API_ENDPOINTS.USER.GET(userId));
      return response.data;
    } catch (error) {
      console.error('获取用户信息失败:', error);
      throw error;
    }
  }

  /**
   * 删除用户
   * @param userId 用户ID
   * @returns 删除结果
   */
  static async deleteUser(userId: string): Promise<{ success: boolean; message: string }> {
    try {
      const response = await httpClient.delete(API_ENDPOINTS.USER.DELETE(userId));
      return response.data;
    } catch (error) {
      console.error('删除用户失败:', error);
      throw error;
    }
  }

  /**
   * 获取用户状态摘要
   * @param userId 用户ID
   * @returns 用户状态摘要
   */
  static async getUserStatusSummary(userId: string): Promise<{ success: boolean; data: any }> {
    try {
      const response = await httpClient.get(API_ENDPOINTS.USER.STATUS_SUMMARY(userId));
      return response.data;
    } catch (error) {
      console.error('获取用户状态摘要失败:', error);
      throw error;
    }
  }

  /**
   * 生成设备ID（如果本地没有存储）
   * @returns 设备ID
   */
  static generateDeviceId(): string {
    let deviceId = localStorage.getItem('device_id');
    
    if (!deviceId) {
      // 生成唯一的设备ID
      deviceId = 'device_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('device_id', deviceId);
    }
    
    return deviceId;
  }

  /**
   * 获取当前设备ID
   * @returns 设备ID或null
   */
  static getCurrentDeviceId(): string | null {
    return localStorage.getItem('device_id');
  }

  /**
   * 获取当前用户ID
   * @returns 用户ID或null
   */
  static getCurrentUserId(): string | null {
    return localStorage.getItem('user_id');
  }

  /**
   * 设置当前用户ID
   * @param userId 用户ID
   */
  static setCurrentUserId(userId: string): void {
    localStorage.setItem('user_id', userId);
  }

  /**
   * 清除用户登录状态
   */
  static clearUserSession(): void {
    localStorage.removeItem('user_id');
    // 注意：不删除device_id，因为设备ID应该保持不变
  }

  /**
   * 检查用户是否已登录
   * @returns 是否已登录
   */
  static isUserLoggedIn(): boolean {
    return !!localStorage.getItem('user_id');
  }
}

// 导出默认实例
export default UserApiService;
