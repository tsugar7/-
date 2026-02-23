
import { motion } from "framer-motion";
import { Image as ImageIcon, X } from "lucide-react";
import type { UploadedImage } from "@/types";

interface ImagePreviewProps {
  image: UploadedImage;
  onRemove: () => void;
}

export function ImagePreview({ image, onRemove }: ImagePreviewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.3 }}
      className="bg-white/[0.02] rounded-2xl p-5 border border-white/5"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <ImageIcon className="w-4 h-4 text-neutral-500" />
          <span className="text-sm text-neutral-400">原图预览</span>
        </div>
        <button
          onClick={onRemove}
          className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
        >
          <X className="w-3.5 h-3.5 text-neutral-500" />
        </button>
      </div>

      <div className="relative rounded-xl overflow-hidden bg-black/20">
        <img
          src={image.url}
          alt="上传的图片"
          className="w-full h-auto max-h-[280px] object-contain"
        />
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2">
        <div className="p-2.5 bg-white/[0.02] rounded-lg text-center">
          <div className="text-[10px] text-neutral-600 mb-0.5">尺寸</div>
          <div className="text-xs text-neutral-400 font-mono">{image.width}×{image.height}</div>
        </div>
        <div className="p-2.5 bg-white/[0.02] rounded-lg text-center">
          <div className="text-[10px] text-neutral-600 mb-0.5">大小</div>
          <div className="text-xs text-neutral-400 font-mono">{(image.file.size / 1024 / 1024).toFixed(2)} MB</div>
        </div>
        <div className="p-2.5 bg-white/[0.02] rounded-lg text-center">
          <div className="text-[10px] text-neutral-600 mb-0.5">格式</div>
          <div className="text-xs text-neutral-400 font-mono uppercase">{image.file.name.split('.').pop()}</div>
        </div>
      </div>
    </motion.div>
  );
}
