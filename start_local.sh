#!/bin/bash

# 本地开发环境启动脚本
# 启动前端开发服务器在 localhost:3000
# 连接到后端 localhost:8001

echo "🚀 启动前端本地开发环境..."
echo "📍 前端服务: http://localhost:3000"
echo "📍 后端API: http://localhost:8001"
echo "📍 请确保后端服务已启动"
echo "=================================================="

# 设置环境变量
export NODE_ENV=development

# 启动开发服务器
npm run dev
