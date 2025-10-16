"use client";

import Link from "next/link";
import { useState } from "react";

export default function GeneratePage() {
  const [prompt, setPrompt] = useState("");
  const [generatedImage, setGeneratedImage] = useState<string>("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link 
            href="/" 
            className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
          >
            ← 图片百宝箱
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-gray-800 dark:text-gray-100">
            🎨 AI 生图
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            文字描述生成精美图片，将想象变为现实
          </p>
        </div>

        {/* Input Area */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                描述你想要的图片
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="例如：一只可爱的小猫咪坐在窗台上，背景是日落的天空，动漫风格..."
                className="w-full h-32 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  图片尺寸
                </label>
                <select className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                  <option>1024 x 1024 (正方形)</option>
                  <option>1024 x 768 (横向)</option>
                  <option>768 x 1024 (纵向)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  风格
                </label>
                <select className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                  <option>真实摄影</option>
                  <option>动漫风格</option>
                  <option>油画风格</option>
                  <option>水彩风格</option>
                  <option>科幻风格</option>
                </select>
              </div>
            </div>

            <button 
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!prompt.trim()}
            >
              生成图片
            </button>
          </div>

          {/* Generated Image Preview */}
          {generatedImage && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">生成结果</h3>
              <div className="relative">
                <img 
                  src={generatedImage} 
                  alt="Generated" 
                  className="w-full rounded-lg shadow-md"
                />
                <div className="mt-4 flex gap-3">
                  <button className="flex-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-semibold py-2 px-4 rounded-lg transition-colors">
                    下载图片
                  </button>
                  <button className="flex-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-semibold py-2 px-4 rounded-lg transition-colors">
                    重新生成
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Placeholder when no image */}
          {!generatedImage && prompt && (
            <div className="mt-8">
              <div className="w-full aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg flex flex-col items-center justify-center gap-4">
                <div className="w-16 h-16 border-4 border-green-200 dark:border-green-800 border-t-green-600 dark:border-t-green-400 rounded-full animate-spin"></div>
                <p className="text-gray-500 dark:text-gray-400">功能开发中...</p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

