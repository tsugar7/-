import { findNearestColor, mardColors, common48Colors, common24Colors } from "./mardColors";
import type { MardColor, PixelData, ColorStat, ConversionSettings } from "@/types";

// 获取颜色调色板
function getPalette(colorMode: "all" | "common48" | "common24"): MardColor[] {
  switch (colorMode) {
    case "common24":
      return common24Colors;
    case "common48":
      return common48Colors;
    default:
      return mardColors;
  }
}

// 调整亮度
function adjustBrightness(r: number, g: number, b: number, brightness: number): { r: number; g: number; b: number } {
  const factor = 1 + brightness / 100;
  return {
    r: Math.min(255, Math.max(0, Math.round(r * factor))),
    g: Math.min(255, Math.max(0, Math.round(g * factor))),
    b: Math.min(255, Math.max(0, Math.round(b * factor))),
  };
}

// 调整对比度
function adjustContrast(r: number, g: number, b: number, contrast: number): { r: number; g: number; b: number } {
  const factor = (259 * (contrast + 255)) / (255 * (259 - contrast));
  return {
    r: Math.min(255, Math.max(0, Math.round(factor * (r - 128) + 128))),
    g: Math.min(255, Math.max(0, Math.round(factor * (g - 128) + 128))),
    b: Math.min(255, Math.max(0, Math.round(factor * (b - 128) + 128))),
  };
}

// 调整饱和度
function adjustSaturation(r: number, g: number, b: number, saturation: number): { r: number; g: number; b: number } {
  const gray = 0.2989 * r + 0.5870 * g + 0.1140 * b;
  const factor = 1 + saturation / 100;
  return {
    r: Math.min(255, Math.max(0, Math.round(gray + (r - gray) * factor))),
    g: Math.min(255, Math.max(0, Math.round(gray + (g - gray) * factor))),
    b: Math.min(255, Math.max(0, Math.round(gray + (b - gray) * factor))),
  };
}

// 将图片转换为像素画
export async function convertToPixelArt(
  imageUrl: string,
  settings: ConversionSettings,
  onProgress?: (progress: number) => void
): Promise<{ pixelData: PixelData; colorStats: ColorStat[] }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    
    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("无法创建 canvas 上下文"));
          return;
        }

        // 设置 canvas 尺寸为目标像素尺寸
        canvas.width = settings.pixelSize;
        canvas.height = Math.round(settings.pixelSize * (img.height / img.width));

        // 禁用平滑缩放
        ctx.imageSmoothingEnabled = false;

        // 绘制缩放后的图片
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // 获取像素数据
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        // 获取调色板
        const palette = getPalette(settings.colorMode);

        // 创建像素数据
        const pixels: MardColor[][] = [];
        const colorCountMap = new Map<string, number>();

        for (let y = 0; y < canvas.height; y++) {
          const row: MardColor[] = [];
          for (let x = 0; x < canvas.width; x++) {
            const i = (y * canvas.width + x) * 4;
            let r = data[i];
            let g = data[i + 1];
            let b = data[i + 2];

            // 应用调整
            if (settings.brightness !== 0) {
              const adjusted = adjustBrightness(r, g, b, settings.brightness);
              r = adjusted.r;
              g = adjusted.g;
              b = adjusted.b;
            }

            if (settings.contrast !== 0) {
              const adjusted = adjustContrast(r, g, b, settings.contrast);
              r = adjusted.r;
              g = adjusted.g;
              b = adjusted.b;
            }

            if (settings.saturation !== 0) {
              const adjusted = adjustSaturation(r, g, b, settings.saturation);
              r = adjusted.r;
              g = adjusted.g;
              b = adjusted.b;
            }

            // 找到最近的颜色
            const nearestColor = findNearestColor(r, g, b, palette);
            row.push(nearestColor);

            // 统计颜色使用次数
            const count = colorCountMap.get(nearestColor.code) || 0;
            colorCountMap.set(nearestColor.code, count + 1);

            // 报告进度
            if (onProgress) {
              const progress = ((y * canvas.width + x) / (canvas.width * canvas.height)) * 100;
              onProgress(progress);
            }
          }
          pixels.push(row);
        }

        const pixelData: PixelData = {
          width: canvas.width,
          height: canvas.height,
          pixels,
        };

        // 生成颜色统计，按使用次数排序
        const colorStats: ColorStat[] = Array.from(colorCountMap.entries())
          .map(([code, count]) => {
            const color = palette.find((c) => c.code === code)!;
            return { color, count };
          })
          .sort((a, b) => b.count - a.count);

        resolve({ pixelData, colorStats });
      } catch (error) {
        reject(error);
      }
    };

    img.onerror = () => {
      reject(new Error("图片加载失败"));
    };

    img.src = imageUrl;
  });
}

// 渲染像素画到 canvas
export function renderPixelArt(
  canvas: HTMLCanvasElement,
  pixelData: PixelData,
  options: {
    showGrid?: boolean;
  } = {}
): void {
  const { showGrid = false } = options;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  // 设置 canvas 尺寸
  const pixelSize = 20; // 每个像素的显示大小
  canvas.width = pixelData.width * pixelSize;
  canvas.height = pixelData.height * pixelSize;

  // 绘制像素
  for (let y = 0; y < pixelData.height; y++) {
    for (let x = 0; x < pixelData.width; x++) {
      const color = pixelData.pixels[y][x];
      ctx.fillStyle = color.hex;
      ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);

      // 绘制网格线
      if (showGrid) {
        ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
        ctx.lineWidth = 1;
        ctx.strokeRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
      }
    }
  }
}

// 导出像素画为 PNG
export function exportAsPNG(
  pixelData: PixelData,
  options: {
    scale?: number;
    showGrid?: boolean;
    showColorCode?: boolean;
  } = {}
): string {
  const { scale = 1, showGrid = false, showColorCode = false } = options;
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";

  const pixelSize = 20 * scale;
  canvas.width = pixelData.width * pixelSize;
  canvas.height = pixelData.height * pixelSize;

  // 绘制像素
  for (let y = 0; y < pixelData.height; y++) {
    for (let x = 0; x < pixelData.width; x++) {
      const color = pixelData.pixels[y][x];
      ctx.fillStyle = color.hex;
      ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);

      // 绘制网格线
      if (showGrid) {
        ctx.strokeStyle = "rgba(0, 0, 0, 0.1)";
        ctx.lineWidth = 1;
        ctx.strokeRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
      }

      // 绘制色号
      if (showColorCode && scale >= 2) {
        ctx.fillStyle = "#000000";
        ctx.font = `${Math.max(8, pixelSize / 3)}px monospace`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(color.code, x * pixelSize + pixelSize / 2, y * pixelSize + pixelSize / 2);
      }
    }
  }

  return canvas.toDataURL("image/png");
}
