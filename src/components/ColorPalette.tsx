
import { motion } from "framer-motion";
import type { ColorStat } from "@/types";

interface ColorPaletteProps {
  colorStats: ColorStat[];
}

export function ColorPalette({ colorStats }: ColorPaletteProps) {
  // 按色号字母顺序排序
  const sortedColorStats = [...colorStats].sort((a, b) => a.color.code.localeCompare(b.color.code));
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-white/[0.02] rounded-2xl p-5 border border-white/5"
    >
      {/* 标题栏 */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <span className="text-sm text-neutral-400">色号清单</span>
          <span className="text-xs text-neutral-600">
            共 {colorStats.length} 色
          </span>
        </div>
        <span className="text-xs text-neutral-600">
          总计 {colorStats.reduce((sum, s) => sum + s.count, 0)} 颗
        </span>
      </div>

      {/* 颜色网格 */}
      <div className="grid grid-cols-8 sm:grid-cols-10 md:grid-cols-12 gap-1.5 mb-5">
        {sortedColorStats.map(({ color, count }, index) => (
          <motion.div
            key={color.code}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.2,
              delay: index * 0.01,
            }}
            whileHover={{ scale: 1.1, zIndex: 10 }}
            className="group relative aspect-square"
          >
            <div
              className="w-full h-full rounded-md cursor-pointer transition-shadow duration-200 group-hover:shadow-lg"
              style={{ backgroundColor: color.hex }}
            >
              {/* 色号标签 */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span
                  className="text-[8px] font-mono font-medium px-1 py-0.5 rounded"
                  style={{
                    backgroundColor: (color.r * 299 + color.g * 587 + color.b * 114) / 1000 > 128
                      ? "rgba(0,0,0,0.8)"
                      : "rgba(255,255,255,0.9)",
                    color: (color.r * 299 + color.g * 587 + color.b * 114) / 1000 > 128
                      ? "#fff"
                      : "#000",
                  }}
                >
                  {color.code}
                </span>
              </div>

              {/* 数量标记 */}
              {count > 20 && (
                <div className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-white rounded-full flex items-center justify-center">
                  <span className="text-[7px] font-bold text-black">
                    {count > 99 ? "+" : count}
                  </span>
                </div>
              )}
            </div>

            {/* 悬停提示 */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 px-2 py-1.5 bg-neutral-900 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 whitespace-nowrap z-20 border border-white/10">
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded"
                  style={{ backgroundColor: color.hex }}
                />
                <span className="font-mono text-white text-xs">{color.code}</span>
                <span className="text-neutral-400 text-xs">{color.name}</span>
              </div>
              <div className="text-[10px] text-neutral-500 mt-0.5">
                {count} 颗 · {color.hex}
              </div>
              <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-neutral-900" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* 详细列表 */}
      <div className="border-t border-white/5 pt-4">
        <div className="max-h-36 overflow-y-auto space-y-0.5 pr-2 custom-scrollbar">
          {sortedColorStats.map(({ color, count }) => (
            <div
              key={color.code}
              className="flex items-center justify-between p-2 rounded-lg hover:bg-white/[0.02] transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <div
                  className="w-5 h-5 rounded-md shadow-sm"
                  style={{ backgroundColor: color.hex }}
                />
                <div className="flex items-center gap-2">
                  <span className="font-mono text-neutral-300 text-xs">{color.code}</span>
                  <span className="text-neutral-600 text-xs">{color.name}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-neutral-700 text-[10px] font-mono">{color.hex}</span>
                <span className="text-neutral-400 text-xs font-mono w-10 text-right">
                  {count}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
