// API服务统一导出文件
// 提供所有API服务的统一入口点

// 导出HTTP客户端
export { default as httpClient } from './httpClient';
export { retryRequest } from './httpClient';

// 导出用户API服务
export { default as UserApiService } from './userApi';
export type {
  UserProfile,
  CreateUserRequest,
  UpdateUserRequest,
  UserResponse,
  UserStatusData,
  UserStatusResponse,
  ApiResponse
} from './userApi';

// 导出Heart Compass API服务
export { default as HeartCompassApiService } from './heartCompassApi';
export type {
  FocusYao,
  Hexagram,
  DialogueFlow,
  DeepWisdom,
  ActionGuide,
  DecisionProtocol,
  HeartCompassRecord,
  HeartCompassRequest,
  AskAgainRequest,
  HeartCompassResponse,
  HeartCompassHistoryResponse
} from './heartCompassApi';

// 导出Daily Fortune API服务
export { default as DailyFortuneApiService } from './dailyFortuneApi';
export type {
  TimeAdvice,
  LuckyElements,
  DailyFortune,
  DailyFortuneRequest,
  DailyFortuneResponse,
  DailyFortuneHistoryResponse
} from './dailyFortuneApi';

// 导出Blueprint API服务
export { default as BlueprintApiService } from './blueprintApi';
export type {
  BaziPillar,
  Bazi,
  ElementalStrength,
  ElementalProfile,
  Compatibility,
  CoreAnalysis,
  ChartDataPoint,
  CoreEnergyField,
  CoreEssence,
  NaturalStrengths,
  BalancePath,
  GrowthAreas,
  LifeJourneyDataPoint,
  LifeJourneyCurve,
  InnerBlueprint,
  BlueprintResult,
  BlueprintGenerateRequest,
  BlueprintResponse,
  BlueprintStatus
} from './blueprintApi';

// 导出API配置
export { API_CONFIG, API_ENDPOINTS, ENV_CONFIG, getApiBaseUrl } from '../config/api';
