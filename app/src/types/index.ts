import type { MardColor } from "@/lib/mardColors";

// 重新导出MardColor类型
export type { MardColor };

// 像素数据
export interface PixelData {
  width: number;
  height: number;
  pixels: MardColor[][]; // 二维数组，每个元素是一个色号
}

// 颜色统计
export interface ColorStat {
  color: MardColor;
  count: number;
}

// 转换设置
export interface ConversionSettings {
  pixelSize: number; // 32, 48, 64, 96, 128
  colorMode: "all" | "common48" | "common24";
  brightness: number; // -50 to 50
  contrast: number; // -50 to 50
  saturation: number; // -50 to 50
}

// 导出设置
export interface ExportSettings {
  format: "png" | "pdf" | "svg";
  scale: number; // 1, 2, 4
  showGrid: boolean;
  showColorCode: boolean;
  showColorPreview: boolean;
}

// 上传的图片
export interface UploadedImage {
  file: File;
  url: string;
  width: number;
  height: number;
}

// 应用状态
export interface AppState {
  uploadedImage: UploadedImage | null;
  pixelData: PixelData | null;
  settings: ConversionSettings;
  colorStats: ColorStat[];
  isConverting: boolean;
  conversionProgress: number;
}
