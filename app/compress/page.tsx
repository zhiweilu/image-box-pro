"use client";

import Link from "next/link";
import { useState } from "react";

export default function CompressPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [compressedImage, setCompressedImage] = useState<string>("");
  const [quality, setQuality] = useState<number>(80);
  const [compressedSize, setCompressedSize] = useState<number>(0);
  const [isCompressing, setIsCompressing] = useState<boolean>(false);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);
      setCompressedImage("");
      setCompressedSize(0);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const compressImage = async () => {
    if (!selectedFile || !preview) return;
    
    setIsCompressing(true);
    
    try {
      const img = new Image();
      img.src = preview;
      
      await new Promise((resolve) => {
        img.onload = resolve;
      });

      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      
      // 将 canvas 转换为 blob
      canvas.toBlob(
        (blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            setCompressedImage(url);
            setCompressedSize(blob.size);
          }
          setIsCompressing(false);
        },
        selectedFile.type,
        quality / 100
      );
    } catch (error) {
      console.error("压缩失败:", error);
      setIsCompressing(false);
    }
  };

  const downloadCompressed = () => {
    if (!compressedImage) return;
    
    const link = document.createElement("a");
    link.href = compressedImage;
    link.download = `compressed_${selectedFile?.name || "image.jpg"}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link 
            href="/" 
            className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
          >
            ← 图片魔盒
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-gray-800 dark:text-gray-100">
            🗜️ 图片压缩
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            智能压缩图片，保持高质量的同时大幅减小文件体积
          </p>
        </div>

        {/* Upload Area */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-12 text-center hover:border-blue-500 dark:hover:border-blue-400 transition-colors">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer flex flex-col items-center gap-4"
            >
              <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                <svg
                  className="w-10 h-10 text-blue-600 dark:text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
              </div>
              <div>
                <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                  点击上传图片
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  支持 JPG、PNG、WebP 等格式
                </p>
              </div>
            </label>
          </div>

          {/* Quality Slider */}
          {preview && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">压缩质量</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm text-gray-600 dark:text-gray-400">
                    质量: {quality}%
                  </label>
                  <span className="text-xs text-gray-500 dark:text-gray-500">
                    {quality >= 90 ? "高质量" : quality >= 70 ? "平衡" : quality >= 50 ? "中等" : "高压缩"}
                  </span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={quality}
                  onChange={(e) => setQuality(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-500">
                  <span>更小</span>
                  <span>更清晰</span>
                </div>
              </div>

              <button 
                onClick={compressImage}
                disabled={isCompressing}
                className="mt-6 w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isCompressing ? "压缩中..." : "开始压缩"}
              </button>
            </div>
          )}

          {/* Preview */}
          {preview && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">图片对比</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">原图</p>
                    <p className="text-sm text-gray-500 dark:text-gray-500">
                      {(selectedFile!.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                  <div className="relative rounded-lg overflow-hidden shadow-md bg-gray-100 dark:bg-gray-700">
                    <img src={preview} alt="Original" className="w-full h-auto" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">压缩后</p>
                    {compressedSize > 0 && (
                      <p className="text-sm text-green-600 dark:text-green-400">
                        {(compressedSize / 1024).toFixed(2)} KB
                        <span className="ml-2 text-xs">
                          (节省 {((1 - compressedSize / selectedFile!.size) * 100).toFixed(1)}%)
                        </span>
                      </p>
                    )}
                  </div>
                  <div className="relative rounded-lg overflow-hidden shadow-md bg-gray-100 dark:bg-gray-700">
                    {compressedImage ? (
                      <img src={compressedImage} alt="Compressed" className="w-full h-auto" />
                    ) : (
                      <div className="w-full aspect-square flex items-center justify-center">
                        <p className="text-gray-400 dark:text-gray-500">请先压缩图片</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {compressedImage && (
                <button 
                  onClick={downloadCompressed}
                  className="mt-6 w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  下载压缩后的图片
                </button>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

