"use client";

import Link from "next/link";
import { useState } from "react";

export default function RemoveBgPage() {
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link 
            href="/" 
            className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
          >
            ← 图片百宝箱
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-gray-800 dark:text-gray-100">
            ✂️ 抠图去背景
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            AI智能识别主体，一键去除背景，支持透明PNG导出
          </p>
        </div>

        {/* Upload Area */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-12 text-center hover:border-purple-500 dark:hover:border-purple-400 transition-colors">
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
              <div className="w-20 h-20 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                <svg
                  className="w-10 h-10 text-purple-600 dark:text-purple-400"
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
                  支持人物、物体等多种场景
                </p>
              </div>
            </label>
          </div>

          {/* Preview */}
          {preview && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">预览</h3>
              <div className="flex gap-6 items-start">
                <div className="flex-1">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">原图</p>
                  <img src={preview} alt="Preview" className="w-full rounded-lg shadow-md" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">去背景后</p>
                  <div className="w-full aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center bg-[linear-gradient(45deg,#ddd_25%,transparent_25%,transparent_75%,#ddd_75%,#ddd),linear-gradient(45deg,#ddd_25%,transparent_25%,transparent_75%,#ddd_75%,#ddd)] dark:bg-[linear-gradient(45deg,#444_25%,transparent_25%,transparent_75%,#444_75%,#444),linear-gradient(45deg,#444_25%,transparent_25%,transparent_75%,#444_75%,#444)] bg-[length:20px_20px] bg-[position:0_0,10px_10px]">
                    <p className="text-gray-400 dark:text-gray-500">功能开发中...</p>
                  </div>
                </div>
              </div>
              
              <button className="mt-6 w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300">
                开始去背景
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

