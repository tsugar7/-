
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Download, Image as ImageIcon, FileText, Table, Check } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { PixelData, ColorStat } from "@/types";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

interface ExportPanelProps {
  pixelData: PixelData;
  colorStats: ColorStat[];
}

export function ExportPanel({ pixelData, colorStats }: ExportPanelProps) {
  const [isExporting, setIsExporting] = useState(false);
  const [exported, setExported] = useState(false);
  const [includePalette, setIncludePalette] = useState(true);
  const paletteRef = useRef<HTMLDivElement>(null);

  // 按色号字母顺序排序
  const sortedColorStats = [...colorStats].sort((a, b) => a.color.code.localeCompare(b.color.code));

  // 导出PNG - 每个格子都带色号，可选择是否附上色卡
  const handleExportPNG = async () => {
    setIsExporting(true);
    try {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // 设置画布尺寸
      const pixelSize = 40;
      const gridWidth = pixelData.width * pixelSize;
      
      // 标题区域
      const titleHeight = 60;
      const padding = 30;
      
      // 根据是否包含色号表计算画布高度
      let canvasHeight: number;
      if (includePalette) {
        // 色卡区域设置 - 动态计算列数和行数
        const availableWidth = Math.max(gridWidth, 800);
        const colorCardItemWidth = Math.min(140, Math.floor((availableWidth - padding * 2) / Math.min(8, sortedColorStats.length)));
        const colorCardCols = Math.floor((availableWidth - padding * 2) / colorCardItemWidth);
        const colorCardRows = Math.ceil(sortedColorStats.length / colorCardCols);
        const colorCardItemHeight = 60; // 更大的色卡高度
        const colorCardPadding = 25;
        const colorCardAreaHeight = colorCardPadding * 2 + colorCardRows * colorCardItemHeight;
        canvasHeight = titleHeight + pixelData.height * pixelSize + 40 + colorCardAreaHeight + padding;
      } else {
        canvasHeight = titleHeight + pixelData.height * pixelSize + padding;
      }
      
      canvas.width = Math.max(gridWidth, includePalette ? 800 : gridWidth) + padding * 2;
      canvas.height = canvasHeight;

      // 白色背景
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 绘制标题
      ctx.fillStyle = "#1a1a1a";
      ctx.font = "bold 24px sans-serif";
      ctx.textAlign = "left";
      ctx.fillText("拼豆图纸", padding, 40);
      
      // 绘制尺寸信息
      ctx.fillStyle = "#666666";
      ctx.font = "14px sans-serif";
      ctx.fillText(`${pixelData.width}×${pixelData.height} 像素 · ${colorStats.length} 种颜色`, padding, 58);

      // 计算图纸居中位置
      const gridStartX = (canvas.width - gridWidth) / 2;
      const gridStartY = titleHeight;

      // 绘制每个像素格
      for (let y = 0; y < pixelData.height; y++) {
        for (let x = 0; x < pixelData.width; x++) {
          const color = pixelData.pixels[y][x];
          const px = gridStartX + x * pixelSize;
          const py = gridStartY + y * pixelSize;

          // 填充颜色
          ctx.fillStyle = color.hex;
          ctx.fillRect(px, py, pixelSize, pixelSize);

          // 绘制细边框
          ctx.strokeStyle = "rgba(0,0,0,0.08)";
          ctx.lineWidth = 0.5;
          ctx.strokeRect(px, py, pixelSize, pixelSize);

          // 绘制色号文字
          ctx.font = "bold 11px monospace";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          
          // 根据背景色决定文字颜色
          const brightness = (color.r * 299 + color.g * 587 + color.b * 114) / 1000;
          ctx.fillStyle = brightness > 128 ? "rgba(0,0,0,0.7)" : "rgba(255,255,255,0.95)";
          
          // 绘制色号
          ctx.fillText(color.code, px + pixelSize / 2, py + pixelSize / 2);
        }
      }

      // 如果包含色号表，绘制色卡
      if (includePalette) {
        // 绘制分隔线
        const separatorY = gridStartY + pixelData.height * pixelSize + 20;
        ctx.strokeStyle = "#e5e5e5";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(padding, separatorY);
        ctx.lineTo(canvas.width - padding, separatorY);
        ctx.stroke();

        // 绘制色卡标题
        const colorCardStartY = separatorY + 30;
        ctx.fillStyle = "#1a1a1a";
        ctx.font = "bold 16px sans-serif";
        ctx.textAlign = "left";
        ctx.fillText("色号对照表", padding, colorCardStartY);

        // 绘制色卡 - 横排占满宽度，更大的色卡
        const availableWidth = canvas.width - padding * 2;
        const colorCardItemWidth = Math.min(140, Math.floor(availableWidth / Math.min(8, sortedColorStats.length)));
        const colorCardCols = Math.floor(availableWidth / colorCardItemWidth);
        const colorCardItemHeight = 60; // 更大的色卡高度
        const colorCardStartY2 = colorCardStartY + 25;
        
        sortedColorStats.forEach(({ color }, index) => {
          const col = index % colorCardCols;
          const row = Math.floor(index / colorCardCols);
          const x = padding + col * colorCardItemWidth;
          const y = colorCardStartY2 + row * colorCardItemHeight;

          // 颜色方块 - 更大
          ctx.fillStyle = color.hex;
          ctx.fillRect(x, y, 32, 32);
          
          // 方块边框
          ctx.strokeStyle = "rgba(0,0,0,0.15)";
          ctx.lineWidth = 0.5;
          ctx.strokeRect(x, y, 32, 32);

          // 色号 - 更大字体
          ctx.fillStyle = "#333333";
          ctx.font = "bold 13px monospace";
          ctx.textAlign = "left";
          ctx.textBaseline = "top";
          ctx.fillText(color.code, x + 38, y);

          // 颜色名称 - 更大字体
          ctx.fillStyle = "#666666";
          ctx.font = "12px sans-serif";
          ctx.fillText(color.name || "", x + 38, y + 16);
        });
      }

      // 下载
      canvas.toBlob((blob) => {
        if (blob) {
          saveAs(blob, `拼豆图纸_${pixelData.width}x${pixelData.height}.png`);
          setExported(true);
          setTimeout(() => setExported(false), 2000);
        }
      }, "image/png");
    } finally {
      setIsExporting(false);
    }
  };

  // 导出PDF - 使用 html2canvas 渲染色号表避免中文乱码
  const handleExportPDF = async () => {
    setIsExporting(true);
    try {
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
      });

      const pageWidth = pdf.internal.pageSize.width;
      const pageHeight = pdf.internal.pageSize.height;
      const margin = 15;

      // 标题
      pdf.setTextColor(0, 0, 0);
      pdf.setFontSize(16);
      pdf.text("Pin Dou Tu Zhi", margin, 20);

      // 信息（使用英文避免乱码）
      pdf.setFontSize(9);
      pdf.setTextColor(100, 100, 100);
      pdf.text(`${pixelData.width}x${pixelData.height} pixels · ${colorStats.length} colors`, margin, 27);

      // 计算图纸显示区域
      const titleHeight = 35;
      const availableWidth = pageWidth - margin * 2;
      
      // 如果不包含色号表，可以使用更多空间显示图纸
      const availableHeight = includePalette 
        ? pageHeight - titleHeight - margin - 50
        : pageHeight - titleHeight - margin - 10;
      
      const pixelSize = Math.min(
        availableWidth / pixelData.width,
        availableHeight / pixelData.height,
        6
      );
      
      const gridWidth = pixelData.width * pixelSize;
      const startX = (pageWidth - gridWidth) / 2;
      const startY = titleHeight;

      // 绘制像素格
      for (let y = 0; y < pixelData.height; y++) {
        for (let x = 0; x < pixelData.width; x++) {
          const color = pixelData.pixels[y][x];
          const px = startX + x * pixelSize;
          const py = startY + y * pixelSize;

          // 填充颜色
          pdf.setFillColor(color.r, color.g, color.b);
          pdf.rect(px, py, pixelSize, pixelSize, "F");

          // 绘制边框
          pdf.setDrawColor(220, 220, 220);
          pdf.setLineWidth(0.1);
          pdf.rect(px, py, pixelSize, pixelSize, "S");

          // 如果格子足够大，显示色号
          if (pixelSize >= 4) {
            const brightness = (color.r * 299 + color.g * 587 + color.b * 114) / 1000;
            pdf.setTextColor(brightness > 128 ? 0 : 255, brightness > 128 ? 0 : 255, brightness > 128 ? 0 : 255);
            pdf.setFontSize(Math.max(3, pixelSize * 0.35));
            pdf.text(
              color.code,
              px + pixelSize / 2,
              py + pixelSize / 2,
              { align: "center", baseline: "middle" }
            );
          }
        }
      }

      // 如果包含色号表，使用 html2canvas 渲染
      if (includePalette && paletteRef.current) {
        const paletteCanvas = await html2canvas(paletteRef.current, {
          backgroundColor: "#ffffff",
          scale: 2,
        });

        const gridEndY = startY + pixelData.height * pixelSize;
        const paletteHeight = (paletteCanvas.height / paletteCanvas.width) * (pageWidth - margin * 2);

        // 检查是否需要新页面
        if (gridEndY + 15 + paletteHeight > pageHeight - margin) {
          pdf.addPage();
          pdf.addImage(
            paletteCanvas.toDataURL("image/png"),
            "PNG",
            margin,
            15,
            pageWidth - margin * 2,
            paletteHeight
          );
        } else {
          pdf.addImage(
            paletteCanvas.toDataURL("image/png"),
            "PNG",
            margin,
            gridEndY + 10,
            pageWidth - margin * 2,
            paletteHeight
          );
        }
      }

      pdf.save(`pattern_${pixelData.width}x${pixelData.height}.pdf`);
      setExported(true);
      setTimeout(() => setExported(false), 2000);
    } finally {
      setIsExporting(false);
    }
  };

  // 导出PDF色号表（单独页面）
  const handleExportPalettePDF = async () => {
    setIsExporting(true);
    try {
      if (!paletteRef.current) return;

      const paletteCanvas = await html2canvas(paletteRef.current, {
        backgroundColor: "#ffffff",
        scale: 2,
      });

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
      });

      const pageWidth = pdf.internal.pageSize.width;
      const margin = 15;
      const paletteHeight = (paletteCanvas.height / paletteCanvas.width) * (pageWidth - margin * 2);

      // 标题
      pdf.setTextColor(0, 0, 0);
      pdf.setFontSize(16);
      pdf.text("Color Palette", margin, 20);

      // 信息
      pdf.setFontSize(9);
      pdf.setTextColor(100, 100, 100);
      pdf.text(`${colorStats.length} colors`, margin, 27);

      // 添加色号表图片
      pdf.addImage(
        paletteCanvas.toDataURL("image/png"),
        "PNG",
        margin,
        35,
        pageWidth - margin * 2,
        paletteHeight
      );

      pdf.save(`palette_${pixelData.width}x${pixelData.height}.pdf`);
      setExported(true);
      setTimeout(() => setExported(false), 2000);
    } finally {
      setIsExporting(false);
    }
  };

  // 导出TXT材料清单
  const handleExportTXT = () => {
    setIsExporting(true);
    try {
      let content = `拼豆材料清单\n`;
      content += `================\n\n`;
      content += `图纸尺寸: ${pixelData.width}×${pixelData.height} 像素\n`;
      content += `颜色种类: ${colorStats.length} 种\n`;
      content += `总像素数: ${pixelData.width * pixelData.height} 颗\n\n`;
      content += `色号清单:\n`;
      content += `----------------\n`;

      colorStats.forEach(({ color, count }) => {
        content += `${color.code}  ${(color.name || "").padEnd(10)}  ${count.toString().padStart(4)}颗  ${color.hex}\n`;
      });

      const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
      saveAs(blob, `拼豆材料清单_${pixelData.width}x${pixelData.height}.txt`);
      setExported(true);
      setTimeout(() => setExported(false), 2000);
    } finally {
      setIsExporting(false);
    }
  };

  // 导出CSV
  const handleExportCSV = () => {
    setIsExporting(true);
    try {
      let csv = "色号,颜色名称,数量,HEX代码\n";
      colorStats.forEach(({ color, count }) => {
        csv += `${color.code},${color.name},${count},${color.hex}\n`;
      });

      const blob = new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8" });
      saveAs(blob, `拼豆材料清单_${pixelData.width}x${pixelData.height}.csv`);
      setExported(true);
      setTimeout(() => setExported(false), 2000);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <>
      {/* 隐藏的色号表元素，用于 html2canvas 渲染 - 按字母顺序排序 */}
      <div
        ref={paletteRef}
        className="fixed -left-[9999px] top-0 bg-white p-8"
        style={{ width: "800px" }}
      >
        <h3 className="text-lg font-bold text-gray-900 mb-4">色号对照表</h3>
        <p className="text-sm text-gray-500 mb-6">{sortedColorStats.length} 种颜色</p>
        <div className="grid grid-cols-6 gap-4">
          {sortedColorStats.map(({ color }) => (
            <div key={color.code} className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded border border-gray-200 flex-shrink-0"
                style={{ backgroundColor: color.hex }}
              />
              <div className="min-w-0">
                <div className="text-sm font-mono font-medium text-gray-900">{color.code}</div>
                <div className="text-xs text-gray-500 truncate">{color.name}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-white/[0.02] rounded-2xl p-5 border border-white/5"
      >
        <div className="flex items-center gap-2 mb-5">
          <Download className="w-4 h-4 text-neutral-500" />
          <span className="text-sm text-neutral-400">导出选项</span>
        </div>

        <Tabs defaultValue="image" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-white/[0.02] h-10">
            <TabsTrigger value="image" className="text-xs data-[state=active]:bg-white/10 data-[state=active]:text-white">
              <ImageIcon className="w-3.5 h-3.5 mr-1.5" />
              图纸
            </TabsTrigger>
            <TabsTrigger value="palette" className="text-xs data-[state=active]:bg-white/10 data-[state=active]:text-white">
              <FileText className="w-3.5 h-3.5 mr-1.5" />
              色号表
            </TabsTrigger>
            <TabsTrigger value="list" className="text-xs data-[state=active]:bg-white/10 data-[state=active]:text-white">
              <Table className="w-3.5 h-3.5 mr-1.5" />
              清单
            </TabsTrigger>
          </TabsList>

          <TabsContent value="image" className="mt-4 space-y-4">
            <div className="p-4 bg-white/[0.02] rounded-xl space-y-4">
              {/* 选项开关 */}
              <div className="flex items-center justify-between">
                <span className="text-xs text-neutral-400">在图纸下方附上色号表</span>
                <button
                  onClick={() => setIncludePalette(!includePalette)}
                  className={`
                    relative w-10 h-5 rounded-full transition-colors duration-200
                    ${includePalette ? "bg-white/30" : "bg-white/10"}
                  `}
                >
                  <span
                    className={`
                      absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform duration-200
                      ${includePalette ? "translate-x-5" : "translate-x-0"}
                    `}
                  />
                </button>
              </div>

              <p className="text-xs text-neutral-600">
                {includePalette 
                  ? "导出的图纸将包含色号标注，下方附有色号对照表"
                  : "仅导出图纸，不包含色号对照表"}
              </p>

              <div className="flex gap-2">
                <button
                  onClick={handleExportPNG}
                  disabled={isExporting}
                  className="flex-1 bg-white text-black hover:bg-neutral-200 disabled:bg-neutral-800 disabled:text-neutral-600 py-2.5 text-xs font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-1.5"
                >
                  {exported ? (
                    <Check className="w-3.5 h-3.5" />
                  ) : (
                    <ImageIcon className="w-3.5 h-3.5" />
                  )}
                  导出 PNG
                </button>
                <button
                  onClick={handleExportPDF}
                  disabled={isExporting}
                  className="flex-1 bg-white/[0.05] text-white hover:bg-white/10 disabled:opacity-50 py-2.5 text-xs font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-1.5 border border-white/10"
                >
                  <FileText className="w-3.5 h-3.5" />
                  导出 PDF
                </button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="palette" className="mt-4">
            <div className="p-4 bg-white/[0.02] rounded-xl">
              <p className="text-xs text-neutral-500 mb-3">
                单独导出色号对照表，方便购买拼豆时参考
              </p>
              <button
                onClick={handleExportPalettePDF}
                disabled={isExporting}
                className="w-full bg-white/[0.05] text-white hover:bg-white/10 disabled:opacity-50 py-2.5 text-xs font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-1.5 border border-white/10"
              >
                <FileText className="w-3.5 h-3.5" />
                导出 PDF 色号表
              </button>
            </div>
          </TabsContent>

          <TabsContent value="list" className="mt-4">
            <div className="p-4 bg-white/[0.02] rounded-xl">
              <p className="text-xs text-neutral-500 mb-3">
                导出材料清单，包含每种色号所需数量
              </p>
              <div className="flex gap-2">
                <button
                  onClick={handleExportTXT}
                  disabled={isExporting}
                  className="flex-1 bg-white/[0.05] text-white hover:bg-white/10 disabled:opacity-50 py-2.5 text-xs font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-1.5 border border-white/10"
                >
                  <FileText className="w-3.5 h-3.5" />
                  TXT
                </button>
                <button
                  onClick={handleExportCSV}
                  disabled={isExporting}
                  className="flex-1 bg-white/[0.05] text-white hover:bg-white/10 disabled:opacity-50 py-2.5 text-xs font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-1.5 border border-white/10"
                >
                  <Table className="w-3.5 h-3.5" />
                  CSV
                </button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </>
  );
}
