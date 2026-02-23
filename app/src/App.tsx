
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Wand2, Download, Palette, Image as ImageIcon, CheckCircle } from "lucide-react";
import { Header } from "@/components/Header";
import { UploadZone } from "@/components/UploadZone";
import { ImagePreview } from "@/components/ImagePreview";
import { ConversionSettingsPanel } from "@/components/ConversionSettings";
import { PixelGrid } from "@/components/PixelGrid";
import { ColorPalette } from "@/components/ColorPalette";
import { ExportPanel } from "@/components/ExportPanel";
import { useImageConversion } from "@/hooks/useImageConversion";
import type { ConversionSettings } from "@/types";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

function App() {
  const {
    uploadedImage,
    pixelData,
    colorStats,
    isConverting,
    setUploadedImage,
    convertImage,
    reset,
  } = useImageConversion();

  const handleImageUpload = (file: File, url: string, width: number, height: number) => {
    setUploadedImage({ file, url, width, height });
    toast.success("图片上传成功", {
      description: `${file.name} (${width}×${height})`,
    });
  };

  const handleConvert = async (settings: ConversionSettings) => {
    try {
      await convertImage(settings);
      toast.success("转换完成", {
        description: "像素画已生成",
      });
    } catch (error) {
      toast.error("转换失败", {
        description: error instanceof Error ? error.message : "未知错误",
      });
    }
  };

  const handleRemoveImage = () => {
    reset();
    toast.info("已重置");
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Toaster position="top-center" richColors />
      <Header />

      {/* 主内容区 */}
      <main className="pt-20 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* 标题区 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8"
            >
              <Sparkles className="w-3.5 h-3.5 text-neutral-400" />
              <span className="text-xs text-neutral-400 tracking-wide">MARD 291 COLORS</span>
            </motion.div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light text-white mb-6 tracking-tight">
              拼豆图纸
              <span className="font-medium">生成器</span>
            </h1>

            <p className="text-base text-neutral-500 max-w-lg mx-auto leading-relaxed">
              上传图片，一键转换为像素画风格
              <br />
              自动匹配 Mard 拼豆色号，生成可打印图纸
            </p>
          </motion.div>

          {/* 上传区 */}
          <AnimatePresence mode="wait">
            {!uploadedImage ? (
              <UploadZone key="upload" onImageUpload={handleImageUpload} />
            ) : (
              <motion.div
                key="preview"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid lg:grid-cols-12 gap-8"
              >
                {/* 左侧：图片预览和设置 */}
                <div className="lg:col-span-4 space-y-6">
                  <ImagePreview image={uploadedImage} onRemove={handleRemoveImage} />
                  <ConversionSettingsPanel
                    onConvert={handleConvert}
                    isConverting={isConverting}
                  />
                </div>

                {/* 右侧：像素画预览 */}
                <div className="lg:col-span-8">
                  {pixelData ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                      className="space-y-6"
                    >
                      <PixelGrid pixelData={pixelData} />
                      <ColorPalette colorStats={colorStats} />
                      <ExportPanel pixelData={pixelData} colorStats={colorStats} />
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="h-full min-h-[400px] flex items-center justify-center bg-white/[0.02] rounded-2xl border border-white/5 border-dashed"
                    >
                      <div className="text-center">
                        <Wand2 className="w-12 h-12 text-neutral-700 mx-auto mb-4" />
                        <p className="text-neutral-600 text-sm">
                          设置转换参数后点击"开始转换"
                        </p>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 使用教程 */}
          <motion.section
            id="how-to-use"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-32"
          >
            <div className="text-center mb-16">
              <h2 className="text-3xl font-light text-white mb-3">使用教程</h2>
              <p className="text-sm text-neutral-500">三步完成拼豆图纸制作</p>
            </div>

            <div className="grid md:grid-cols-3 gap-px bg-white/10 rounded-2xl overflow-hidden">
              {[
                {
                  icon: ImageIcon,
                  title: "上传图片",
                  description: "支持 JPG、PNG、WEBP 格式，拖拽或点击上传",
                  step: "01",
                },
                {
                  icon: Palette,
                  title: "调整设置",
                  description: "选择图纸尺寸、色彩模式，调整画面参数",
                  step: "02",
                },
                {
                  icon: Download,
                  title: "导出图纸",
                  description: "生成像素画，导出带色号的 PNG/PDF 图纸",
                  step: "03",
                },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-[#0a0a0a] p-10 group hover:bg-white/[0.02] transition-colors"
                >
                  <div className="flex items-start justify-between mb-8">
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                      <item.icon className="w-4 h-4 text-neutral-400" />
                    </div>
                    <span className="text-xs text-neutral-600 font-mono">{item.step}</span>
                  </div>
                  <h3 className="text-lg font-medium text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-neutral-500 leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* 特性介绍 */}
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-32"
          >
            <div className="text-center mb-16">
              <h2 className="text-3xl font-light text-white mb-3">功能特性</h2>
              <p className="text-sm text-neutral-500">专业的拼豆图纸生成工具</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 rounded-2xl overflow-hidden">
              {[
                {
                  icon: Palette,
                  title: "291色全支持",
                  description: "完整 Mard 拼豆色号数据库",
                },
                {
                  icon: Wand2,
                  title: "智能转换",
                  description: "自动匹配最接近的拼豆颜色",
                },
                {
                  icon: CheckCircle,
                  title: "多种尺寸",
                  description: "支持 32×32 到 128×128 像素",
                },
                {
                  icon: Download,
                  title: "带色号导出",
                  description: "每个格子附带色号标注",
                },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, scale: 0.98 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-[#0a0a0a] p-8 text-center hover:bg-white/[0.02] transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-5">
                    <item.icon className="w-4 h-4 text-neutral-400" />
                  </div>
                  <h3 className="text-sm font-medium text-white mb-2">{item.title}</h3>
                  <p className="text-xs text-neutral-500">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* 关于 */}
          <motion.section
            id="about"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-32 text-center"
          >
            <div className="max-w-xl mx-auto">
              <h2 className="text-2xl font-light text-white mb-4">关于拼豆工坊</h2>
              <p className="text-sm text-neutral-500 leading-relaxed mb-8">
                拼豆工坊是一个免费的在线拼豆图纸生成工具，致力于让拼豆爱好者能够轻松地将喜欢的图片转换为可制作的拼豆图纸。我们使用精确的色差算法，确保转换后的颜色与 Mard 拼豆色号完美匹配。
              </p>
              <div className="flex items-center justify-center gap-1 text-xs text-neutral-600">
                <span>Made with</span>
                <span className="text-neutral-500">♥</span>
                <span>for pixel art lovers</span>
              </div>
            </div>
          </motion.section>
        </div>
      </main>

      {/* 页脚 */}
      <footer className="py-8 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-neutral-600 text-xs">
              © 2024 拼豆工坊
            </div>
            <div className="flex items-center gap-6 text-xs text-neutral-600">
              <a href="#" className="hover:text-neutral-400 transition-colors">使用条款</a>
              <a href="#" className="hover:text-neutral-400 transition-colors">隐私政策</a>
              <a href="#" className="hover:text-neutral-400 transition-colors">联系我们</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
