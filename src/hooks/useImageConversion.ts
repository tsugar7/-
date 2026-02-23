import { useState, useCallback } from "react";
import type { UploadedImage, PixelData, ColorStat, ConversionSettings } from "@/types";
import { convertToPixelArt } from "@/lib/imageProcessor";

interface UseImageConversionReturn {
  uploadedImage: UploadedImage | null;
  pixelData: PixelData | null;
  colorStats: ColorStat[];
  isConverting: boolean;
  progress: number;
  error: string | null;
  setUploadedImage: (image: UploadedImage | null) => void;
  convertImage: (settings: ConversionSettings) => Promise<void>;
  reset: () => void;
}

export function useImageConversion(): UseImageConversionReturn {
  const [uploadedImage, setUploadedImage] = useState<UploadedImage | null>(null);
  const [pixelData, setPixelData] = useState<PixelData | null>(null);
  const [colorStats, setColorStats] = useState<ColorStat[]>([]);
  const [isConverting, setIsConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const convertImage = useCallback(
    async (settings: ConversionSettings) => {
      if (!uploadedImage) {
        setError("请先上传图片");
        return;
      }

      setIsConverting(true);
      setProgress(0);
      setError(null);

      try {
        const { pixelData, colorStats } = await convertToPixelArt(
          uploadedImage.url,
          settings,
          (p) => setProgress(Math.round(p))
        );
        setPixelData(pixelData);
        setColorStats(colorStats);
      } catch (err) {
        setError(err instanceof Error ? err.message : "转换失败");
      } finally {
        setIsConverting(false);
        setProgress(100);
      }
    },
    [uploadedImage]
  );

  const reset = useCallback(() => {
    setUploadedImage(null);
    setPixelData(null);
    setColorStats([]);
    setIsConverting(false);
    setProgress(0);
    setError(null);
  }, []);

  return {
    uploadedImage,
    pixelData,
    colorStats,
    isConverting,
    progress,
    error,
    setUploadedImage,
    convertImage,
    reset,
  };
}
