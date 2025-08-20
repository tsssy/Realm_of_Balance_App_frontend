# 图片资源下载指南

要让应用正常运行，请将以下图片下载并放置到对应路径：

## 需要下载的图片文件

### 1. `/public/images/lotus-background.jpg`
- **下载链接**: https://images.unsplash.com/photo-1668688437937-0b39145ce9d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb3R1cyUyMGxlYXZlcyUyMHdhdGVyJTIwcGVhY2VmdWwlMjBtZWRpdGF0aW9ufGVufDF8fHx8MTc1NTY3MjU2NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral
- **用途**: ElementalAnalysis组件的背景图片
- **描述**: 莲花荷叶水面背景

### 2. `/public/images/ink-painting-background.jpg`
- **下载链接**: https://images.unsplash.com/photo-1684871430852-3413cb17e040?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwY2hpbmVzZSUyMGluayUyMHBhaW50aW5nJTIwbGFuZHNjYXBlfGVufDF8fHx8MTc1NTY3MjU5M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral
- **用途**: OnboardingScreen组件的背景图片
- **描述**: 中国古代水墨画风景

### 3. `/public/images/moon-image.jpg`
- **下载链接**: https://images.unsplash.com/photo-1637552242889-6396506c116e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdWxsJTIwbW9vbiUyMG5pZ2h0JTIwcGVhY2VmdWwlMjB6ZW58ZW58MXx8fHwxNzU1NjcyNTk4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral
- **用途**: OnboardingScreen组件的月亮图片
- **描述**: 宁静夜晚的满月

### 4. `/public/images/traditional-art.jpg`
- **下载链接**: https://images.unsplash.com/photo-1618920909754-b296b59ca5e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGluZXNlJTIwdHJhZGl0aW9uYWwlMjBwYWludGluZyUyMGhvcnNlJTIwYXJ0d29ya3xlbnwxfHx8fDE3NTU2NzI2NTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral
- **用途**: DailyFortune组件的传统艺术图片
- **描述**: 中国传统马匹艺术作品（备用）

### 5. `/public/images/example-image.png`
- **用途**: DailyFortune组件的示例图片
- **描述**: 您提供的Figma资源图片 (figma:asset/a59eadd340a5a202fc1c0b836ba8541ad0578d1a.png)
- **注意**: 请将您的原始图片重命名为 `example-image.png` 并放置在此路径

## 下载步骤

1. 创建 `/public/images/` 文件夹（如果不存在）
2. 逐个下载上述链接的图片
3. 将图片重命名为对应的文件名
4. 确保图片格式正确（.jpg 或 .png）
5. 将图片放置到 `/public/images/` 文件夹中

## 文件结构检查

下载完成后，您的文件结构应该如下：

```
/public/
  /images/
    lotus-background.jpg
    ink-painting-background.jpg
    moon-image.jpg
    traditional-art.jpg
    example-image.png
```

## 故障排除

如果图片无法正常显示：
1. 检查文件路径是否正确
2. 确认文件名大小写匹配
3. 验证图片文件没有损坏
4. 重启开发服务器

完成后，应用中的所有图片资源都将正常显示！