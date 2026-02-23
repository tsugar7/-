
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, Image as ImageIcon } from "lucide-react";
import { motion } from "framer-motion";

interface UploadZoneProps {
  onImageUpload: (file: File, url: string, width: number, height: number) => void;
}

export function UploadZone({ onImageUpload }: UploadZoneProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) return;

      const file = acceptedFiles[0];
      const url = URL.createObjectURL(file);

      const img = new Image();
      img.onload = () => {
        onImageUpload(file, url, img.width, img.height);
      };
      img.src = url;
    },
    [onImageUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpg", ".jpeg", ".png", ".webp", ".gif"],
    },
    maxFiles: 1,
    multiple: false,
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full"
    >
      <div
        {...getRootProps()}
        className={`
          relative border border-dashed rounded-2xl p-16 text-center cursor-pointer
          transition-all duration-300 ease-out
          ${isDragActive 
            ? "border-white/30 bg-white/[0.03]" 
            : "border-white/10 bg-white/[0.01] hover:border-white/20 hover:bg-white/[0.02]"
          }
        `}
      >
        <input {...getInputProps()} />

        <motion.div
          animate={{ y: isDragActive ? -4 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex flex-col items-center gap-5"
        >
          <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
            {isDragActive ? (
              <ImageIcon className="w-6 h-6 text-neutral-400" />
            ) : (
              <Upload className="w-6 h-6 text-neutral-500" />
            )}
          </div>

          <div className="space-y-2">
            <p className="text-sm text-neutral-300">
              {isDragActive ? "释放图片到此处" : "拖拽图片到此处"}
            </p>
            <p className="text-xs text-neutral-600">
              或点击选择文件，支持 JPG、PNG、WEBP
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
