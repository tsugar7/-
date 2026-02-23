
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ZoomIn, ZoomOut, Grid3X3, Hash } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import type { PixelData, MardColor } from "@/types";

interface PixelGridProps {
  pixelData: PixelData;
}

export function PixelGrid({ pixelData }: PixelGridProps) {
  const [showGrid, setShowGrid] = useState(true);
  const [showColorCode, setShowColorCode] = useState(true);
  const [hoveredPixel, setHoveredPixel] = useState<{ x: number; y: number; color: MardColor } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const maxZoom = 4;
  const minZoom = 0.2;
  const zoomStep = 0.2;

  // 根据图纸大小计算初始缩放比例，确保能完整显示
  const calculateInitialZoom = () => {
    const maxContainerWidth = 760; // 容器最大宽度
    const maxContainerHeight = 500; // 容器最大高度
    const basePixelSize = 24;
    
    const zoomX = maxContainerWidth / (pixelData.width * basePixelSize);
    const zoomY = maxContainerHeight / (pixelData.height * basePixelSize);
    
    // 取较小值确保完整显示，但不小于 minZoom
    return Math.max(minZoom, Math.min(1, zoomX, zoomY));
  };

  const [zoom, setZoom] = useState(calculateInitialZoom);

  const handleZoomIn = () => setZoom((z) => Math.min(z + zoomStep, maxZoom));
  const handleZoomOut = () => setZoom((z) => Math.max(z - zoomStep, minZoom));

  const pixelSize = 24 * zoom;
  const gridWidth = pixelData.width * pixelSize;
  const gridHeight = pixelData.height * pixelSize;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/[0.02] rounded-2xl p-5 border border-white/5"
    >
      {/* 标题栏 */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-neutral-400">像素画预览</span>
          <span className="text-xs text-neutral-600 font-mono">
            {pixelData.width}×{pixelData.height}
          </span>
        </div>
      </div>

      {/* 工具栏 */}
      <div className="flex items-center justify-between mb-4 p-3 bg-white/[0.02] rounded-xl">
        <div className="flex items-center gap-4">
          {/* 缩放控制 */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={handleZoomOut}
              disabled={zoom <= minZoom}
              className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center hover:bg-white/10 disabled:opacity-30 transition-colors"
            >
              <ZoomOut className="w-3.5 h-3.5 text-neutral-500" />
            </button>
            <span className="text-xs text-neutral-500 font-mono w-10 text-center">{Math.round(zoom * 100)}%</span>
            <button
              onClick={handleZoomIn}
              disabled={zoom >= maxZoom}
              className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center hover:bg-white/10 disabled:opacity-30 transition-colors"
            >
              <ZoomIn className="w-3.5 h-3.5 text-neutral-500" />
            </button>
          </div>

          <div className="w-px h-4 bg-white/10" />

          {/* 网格线开关 */}
          <div className="flex items-center gap-2">
            <Grid3X3 className="w-3.5 h-3.5 text-neutral-600" />
            <Switch
              id="grid"
              checked={showGrid}
              onCheckedChange={setShowGrid}
              className="scale-75 origin-left"
            />
          </div>

          <div className="w-px h-4 bg-white/10" />

          {/* 色号标注开关 */}
          <div className="flex items-center gap-2">
            <Hash className="w-3.5 h-3.5 text-neutral-600" />
            <Switch
              id="colorCode"
              checked={showColorCode}
              onCheckedChange={setShowColorCode}
              className="scale-75 origin-left"
            />
          </div>
        </div>
      </div>

      {/* 像素画网格 */}
      <div
        ref={containerRef}
        className="relative overflow-auto max-h-[500px] bg-black/20 rounded-xl border border-white/5"
      >
        <div
          className="relative"
          style={{
            width: gridWidth,
            height: gridHeight,
          }}
        >
          {pixelData.pixels.map((row, y) =>
            row.map((color, x) => (
              <motion.div
                key={`${x}-${y}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.05,
                  delay: (y * pixelData.width + x) * 0.0003,
                }}
                className="absolute cursor-pointer hover:brightness-110 hover:scale-105 hover:z-10 transition-all"
                style={{
                  left: x * pixelSize,
                  top: y * pixelSize,
                  width: pixelSize,
                  height: pixelSize,
                  backgroundColor: color.hex,
                  boxShadow: showGrid ? "inset 0 0 0 0.5px rgba(255,255,255,0.08)" : "none",
                }}
                onMouseEnter={() => setHoveredPixel({ x, y, color })}
                onMouseLeave={() => setHoveredPixel(null)}
              >
                {showColorCode && zoom >= 1.5 && (
                  <span
                    className="absolute inset-0 flex items-center justify-center text-[8px] font-mono font-medium"
                    style={{
                      color:
                        (color.r * 299 + color.g * 587 + color.b * 114) / 1000 > 128
                          ? "rgba(0,0,0,0.7)"
                          : "rgba(255,255,255,0.9)",
                    }}
                  >
                    {color.code}
                  </span>
                )}
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* 悬停信息 */}
      {hoveredPixel && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-3 bg-white/[0.02] rounded-xl flex items-center gap-3"
        >
          <div
            className="w-8 h-8 rounded-lg shadow-sm"
            style={{ backgroundColor: hoveredPixel.color.hex }}
          />
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <span className="font-mono text-white text-sm font-medium">
                {hoveredPixel.color.code}
              </span>
              <span className="text-neutral-500 text-sm">{hoveredPixel.color.name}</span>
            </div>
            <div className="text-[10px] text-neutral-600 font-mono mt-0.5">
              {hoveredPixel.color.hex} · ({hoveredPixel.x + 1}, {hoveredPixel.y + 1})
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
