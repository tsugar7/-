
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Settings, ChevronDown, Wand2 } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import type { ConversionSettings as ConversionSettingsType } from "@/types";

interface ConversionSettingsPanelProps {
  onConvert: (settings: ConversionSettingsType) => void;
  isConverting: boolean;
}

const pixelSizes = [
  { value: 32, label: "32" },
  { value: 48, label: "48" },
  { value: 64, label: "64" },
  { value: 96, label: "96" },
  { value: 128, label: "128" },
];

const colorModes = [
  { value: "all" as const, label: "291色", description: "全部色号" },
  { value: "common48" as const, label: "48色", description: "常用" },
  { value: "common24" as const, label: "24色", description: "入门" },
];

export function ConversionSettingsPanel({
  onConvert,
  isConverting,
}: ConversionSettingsPanelProps) {
  const [settings, setSettings] = useState<ConversionSettingsType>({
    pixelSize: 64,
    colorMode: "all",
    brightness: 0,
    contrast: 0,
    saturation: 0,
  });
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleConvert = () => {
    onConvert(settings);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-white/[0.02] rounded-2xl p-5 border border-white/5"
    >
      <div className="flex items-center gap-2 mb-5">
        <Settings className="w-4 h-4 text-neutral-500" />
        <span className="text-sm text-neutral-400">转换设置</span>
      </div>

      <div className="space-y-5">
        {/* 像素尺寸选择 */}
        <div className="space-y-2.5">
          <span className="text-xs text-neutral-600">图纸尺寸</span>
          <div className="flex gap-1.5">
            {pixelSizes.map((size) => (
              <button
                key={size.value}
                onClick={() =>
                  setSettings((s) => ({ ...s, pixelSize: size.value }))
                }
                className={`
                  flex-1 py-2 rounded-lg text-xs font-medium transition-all duration-200
                  ${
                    settings.pixelSize === size.value
                      ? "bg-white/10 text-white"
                      : "bg-white/[0.02] text-neutral-500 hover:bg-white/[0.04] hover:text-neutral-400"
                  }
                `}
              >
                {size.label}
              </button>
            ))}
          </div>
        </div>

        {/* 色彩模式选择 */}
        <div className="space-y-2.5">
          <span className="text-xs text-neutral-600">色彩模式</span>
          <div className="flex gap-1.5">
            {colorModes.map((mode) => (
              <button
                key={mode.value}
                onClick={() =>
                  setSettings((s) => ({ ...s, colorMode: mode.value }))
                }
                className={`
                  flex-1 py-2.5 px-2 rounded-lg text-xs transition-all duration-200
                  ${
                    settings.colorMode === mode.value
                      ? "bg-white/10 text-white"
                      : "bg-white/[0.02] text-neutral-500 hover:bg-white/[0.04] hover:text-neutral-400"
                  }
                `}
              >
                <div className="font-medium">{mode.label}</div>
                <div className="text-[10px] text-neutral-600 mt-0.5">{mode.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* 高级选项 */}
        <div>
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center gap-1.5 text-neutral-600 hover:text-neutral-400 transition-colors"
          >
            <ChevronDown 
              className={`w-3.5 h-3.5 transition-transform ${showAdvanced ? "rotate-180" : ""}`} 
            />
            <span className="text-xs">高级选项</span>
          </button>

          <AnimatePresence>
            {showAdvanced && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 space-y-4 overflow-hidden"
              >
                {/* 亮度 */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-xs text-neutral-600">亮度</span>
                    <span className="text-xs text-neutral-500 font-mono">
                      {settings.brightness > 0 ? "+" : ""}{settings.brightness}%
                    </span>
                  </div>
                  <Slider
                    value={[settings.brightness]}
                    onValueChange={([v]) =>
                      setSettings((s) => ({ ...s, brightness: v }))
                    }
                    min={-50}
                    max={50}
                    step={5}
                    className="w-full"
                  />
                </div>

                {/* 对比度 */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-xs text-neutral-600">对比度</span>
                    <span className="text-xs text-neutral-500 font-mono">
                      {settings.contrast > 0 ? "+" : ""}{settings.contrast}%
                    </span>
                  </div>
                  <Slider
                    value={[settings.contrast]}
                    onValueChange={([v]) =>
                      setSettings((s) => ({ ...s, contrast: v }))
                    }
                    min={-50}
                    max={50}
                    step={5}
                    className="w-full"
                  />
                </div>

                {/* 饱和度 */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-xs text-neutral-600">饱和度</span>
                    <span className="text-xs text-neutral-500 font-mono">
                      {settings.saturation > 0 ? "+" : ""}{settings.saturation}%
                    </span>
                  </div>
                  <Slider
                    value={[settings.saturation]}
                    onValueChange={([v]) =>
                      setSettings((s) => ({ ...s, saturation: v }))
                    }
                    min={-50}
                    max={50}
                    step={5}
                    className="w-full"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 转换按钮 */}
        <button
          onClick={handleConvert}
          disabled={isConverting}
          className="w-full bg-white text-black hover:bg-neutral-200 disabled:bg-neutral-800 disabled:text-neutral-600 py-3 text-sm font-medium rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
        >
          {isConverting ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-4 h-4 border-2 border-neutral-600 border-t-transparent rounded-full"
              />
              转换中...
            </>
          ) : (
            <>
              <Wand2 className="w-4 h-4" />
              开始转换
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
}
