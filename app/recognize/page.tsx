"use client";

import Link from "next/link";
import { useState } from "react";

export default function RecognizePage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link 
            href="/" 
            className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
          >
            ← 图片百宝箱
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-gray-800 dark:text-gray-100">
            🔍 图片识别
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            强大的图片识别能力，识别物体、场景、文字等内容
          </p>
        </div>

        {/* Upload Area */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-12 text-center hover:border-orange-500 dark:hover:border-orange-400 transition-colors">
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
              <div className="w-20 h-20 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
                <svg
                  className="w-10 h-10 text-orange-600 dark:text-orange-400"
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
                  支持物体识别、场景识别、OCR文字识别
                </p>
              </div>
            </label>
          </div>

          {/* Preview */}
          {preview && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">识别结果</h3>
              <div className="flex gap-6 items-start">
                <div className="flex-1">
                  <img src={preview} alt="Preview" className="w-full rounded-lg shadow-md" />
                </div>
                <div className="flex-1">
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 h-full">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">识别信息</h4>
                    <div className="space-y-3">
                      <div className="p-3 bg-white dark:bg-gray-600 rounded-lg">
                        <p className="text-sm text-gray-500 dark:text-gray-400">主要物体</p>
                        <p className="text-gray-700 dark:text-gray-200">功能开发中...</p>
                      </div>
                      <div className="p-3 bg-white dark:bg-gray-600 rounded-lg">
                        <p className="text-sm text-gray-500 dark:text-gray-400">场景</p>
                        <p className="text-gray-700 dark:text-gray-200">功能开发中...</p>
                      </div>
                      <div className="p-3 bg-white dark:bg-gray-600 rounded-lg">
                        <p className="text-sm text-gray-500 dark:text-gray-400">标签</p>
                        <p className="text-gray-700 dark:text-gray-200">功能开发中...</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <button className="mt-6 w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300">
                开始识别
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

