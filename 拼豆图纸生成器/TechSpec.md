# 拼豆图纸生成器 - 技术规格文档

## 1. 组件清单

### shadcn/ui 组件
- Button - 按钮
- Card - 卡片容器
- Slider - 滑块控件
- Switch - 开关
- Select - 下拉选择
- Tabs - 标签页
- Tooltip - 提示框
- Dialog - 对话框
- Progress - 进度条
- Badge - 标签
- Separator - 分隔线
- ScrollArea - 滚动区域
- Collapsible - 可折叠区域

### 自定义组件
- UploadZone - 图片上传区域（支持拖拽）
- PixelGrid - 像素画网格显示
- ColorPalette - 色号列表
- ColorBlock - 单个色块
- ExportPanel - 导出选项面板
- ImagePreview - 图片预览（支持缩放拖拽）
- ConversionSettings - 转换参数设置
- LoadingOverlay - 加载遮罩

## 2. 动画实现表

| 动画 | 库 | 实现方式 | 复杂度 |
|------|------|----------|--------|
| 页面入场动画 | Framer Motion | AnimatePresence + motion.div | 中 |
| 按钮悬停效果 | Tailwind CSS | hover: 类 + transition | 低 |
| 卡片悬停效果 | Tailwind CSS | hover: 类 + transform | 低 |
| 像素格渲染动画 | Framer Motion | staggerChildren + fadeIn | 高 |
| 色块列表动画 | Framer Motion | staggerChildren + scale | 中 |
| 上传拖拽反馈 | React DnD | 拖拽状态样式变化 | 中 |
| 图片缩放拖拽 | 原生 JS | transform + wheel事件 | 中 |
| 加载动画 | Framer Motion | 旋转 + 脉冲动画 | 低 |
| Tooltip显示 | Framer Motion | AnimatePresence + fade | 低 |
| 模态框动画 | Framer Motion | AnimatePresence + scale | 中 |

## 3. 项目文件结构

```
app/
├── src/
│   ├── components/
│   │   ├── ui/                    # shadcn/ui 组件
│   │   ├── UploadZone.tsx         # 上传区域
│   │   ├── PixelGrid.tsx          # 像素画网格
│   │   ├── ColorPalette.tsx       # 色号列表
│   │   ├── ColorBlock.tsx         # 色块组件
│   │   ├── ExportPanel.tsx        # 导出面板
│   │   ├── ImagePreview.tsx       # 图片预览
│   │   ├── ConversionSettings.tsx # 转换设置
│   │   ├── LoadingOverlay.tsx     # 加载遮罩
│   │   └── Header.tsx             # 页面头部
│   ├── hooks/
│   │   ├── useImageConversion.ts  # 图片转换逻辑
│   │   ├── usePixelData.ts        # 像素数据处理
│   │   └── useExport.ts           # 导出功能
│   ├── lib/
│   │   ├── mardColors.ts          # Mard色号数据库
│   │   ├── colorUtils.ts          # 颜色工具函数
│   │   ├── imageProcessor.ts      # 图片处理
│   │   └── utils.ts               # 通用工具
│   ├── types/
│   │   └── index.ts               # TypeScript类型
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── public/
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## 4. 依赖列表

### 核心依赖
- react ^18.2.0
- react-dom ^18.2.0
- typescript ^5.0.0
- vite ^5.0.0

### UI 依赖
- tailwindcss ^3.4.0
- @radix-ui/* (shadcn/ui 依赖)
- lucide-react (图标)
- class-variance-authority
- clsx
- tailwind-merge

### 动画依赖
- framer-motion ^11.0.0

### 功能依赖
- react-dropzone (文件上传)
- html2canvas (截图导出)
- jspdf (PDF导出)
- file-saver (文件保存)

## 5. 核心算法

### 颜色匹配算法
```typescript
// 欧几里得距离计算最近颜色
function findNearestColor(r: number, g: number, b: number, palette: Color[]): Color {
  let minDistance = Infinity;
  let nearestColor = palette[0];
  
  for (const color of palette) {
    const dr = r - color.r;
    const dg = g - color.g;
    const db = b - color.b;
    const distance = Math.sqrt(dr * dr + dg * dg + db * db);
    
    if (distance < minDistance) {
      minDistance = distance;
      nearestColor = color;
    }
  }
  
  return nearestColor;
}
```

### 像素画生成流程
1. 加载图片到 canvas
2. 缩放 canvas 到目标像素尺寸
3. 获取 ImageData
4. 遍历每个像素，匹配到最近色号
5. 生成像素画数据
6. 渲染到显示 canvas

## 6. 状态管理

使用 React Context + useState 管理：
- uploadedImage: 上传的图片
- pixelData: 像素画数据
- settings: 转换设置
- colorStats: 颜色统计
- isConverting: 转换状态

## 7. 性能优化

- 使用 Web Worker 进行图片处理（大图片）
- 虚拟滚动显示大色号列表
- Canvas 离屏渲染
- 防抖处理滑块输入
- 图片懒加载
