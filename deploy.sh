#!/bin/bash

# 部署脚本 - 部署到 GitHub Pages

echo "🚀 开始部署到 GitHub Pages..."

# 检查是否在正确的目录
if [ ! -f "package.json" ]; then
    echo "❌ 错误：未找到 package.json"
    exit 1
fi

# 安装依赖
echo "📦 安装依赖..."
npm install

# 构建项目
echo "🔨 构建项目..."
npm run build

# 部署到 GitHub Pages
echo "📤 部署到 GitHub Pages..."
npx gh-pages -d dist

echo "✅ 部署完成！"
echo "🌐 访问: https://icehugh.github.io"
