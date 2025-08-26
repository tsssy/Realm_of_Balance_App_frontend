import React, { useState, useEffect } from 'react';
import { getApiDebugInfo } from '../config/api';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Separator } from './ui/separator';

// API配置调试组件
const ApiConfigDebug: React.FC = () => {
  const [debugInfo, setDebugInfo] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // 获取调试信息
    const info = getApiDebugInfo();
    setDebugInfo(info);
  }, []);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const testBackendConnection = async () => {
    try {
      const response = await fetch(`${debugInfo?.baseUrl}/health`);
      const data = await response.json();
      alert(`后端连接测试成功！\n状态: ${data.status}\n版本: ${data.version}`);
    } catch (error) {
      alert(`后端连接测试失败！\n错误: ${error}`);
    }
  };

  if (!debugInfo) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* 切换按钮 */}
      <Button
        onClick={toggleVisibility}
        variant="outline"
        size="sm"
        className="mb-2"
      >
        {isVisible ? '隐藏' : '显示'} API配置
      </Button>

      {/* 配置信息卡片 */}
      {isVisible && (
        <Card className="w-80 bg-white/95 backdrop-blur-sm border-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              🔧 API配置调试
              <Badge variant={debugInfo.isDevelopment ? "default" : "secondary"}>
                {debugInfo.environment}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-xs">
            {/* 当前访问信息 */}
            <div>
              <div className="font-semibold text-gray-700 mb-1">当前访问:</div>
              <div className="space-y-1">
                <div>主机: <code className="bg-gray-100 px-1 rounded">{debugInfo.currentHost}</code></div>
                <div>端口: <code className="bg-gray-100 px-1 rounded">{debugInfo.currentPort}</code></div>
              </div>
            </div>

            <Separator />

            {/* 后端配置 */}
            <div>
              <div className="font-semibold text-gray-700 mb-1">后端API:</div>
              <div className="space-y-1">
                <div>基础URL: <code className="bg-blue-100 px-1 rounded text-blue-800">{debugInfo.backendUrl}</code></div>
                <div>完整URL: <code className="bg-green-100 px-1 rounded text-green-800">{debugInfo.fullUrl}</code></div>
              </div>
            </div>

            <Separator />

            {/* 环境信息 */}
            <div>
              <div className="font-semibold text-gray-700 mb-1">环境信息:</div>
              <div className="space-y-1">
                <div>开发环境: <Badge variant={debugInfo.isDevelopment ? "default" : "outline"}>{debugInfo.isDevelopment ? "是" : "否"}</Badge></div>
                <div>生产环境: <Badge variant={debugInfo.isProduction ? "default" : "outline"}>{debugInfo.isProduction ? "是" : "否"}</Badge></div>
              </div>
            </div>

            {/* 测试按钮 */}
            <div className="pt-2">
              <Button
                onClick={testBackendConnection}
                size="sm"
                className="w-full"
                variant="outline"
              >
                🧪 测试后端连接
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ApiConfigDebug;
