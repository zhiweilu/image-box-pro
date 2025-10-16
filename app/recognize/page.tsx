"use client";

import Link from "next/link";
import { useState } from "react";

export default function RecognizePage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [recognitionResult, setRecognitionResult] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);
      setRecognitionResult("");
      setError("");
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const recognizeImage = async () => {
    if (!selectedFile) return;

    setIsProcessing(true);
    setError("");
    setRecognitionResult("");

    try {
      const formData = new FormData();
      formData.append('image_file', selectedFile);

      const response = await fetch('/api/recognize', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || '识别失败');
      }

      const data = await response.json();
      setRecognitionResult(data.result || '识别失败');
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : '未知错误';
      setError(errorMessage);
      console.error('识别错误:', err);
    } finally {
      setIsProcessing(false);
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
              <button 
                onClick={recognizeImage}
                disabled={isProcessing}
                className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    识别中...
                  </>
                ) : (
                  "开始识别"
                )}
              </button>

              {error && (
                <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
                </div>
              )}

              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">识别结果</h3>
                <div className="flex gap-6 items-start">
                  <div className="flex-1">
                    <img src={preview} alt="Preview" className="w-full rounded-lg shadow-md" />
                  </div>
                  <div className="flex-1">
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 h-full min-h-[300px]">
                      <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">识别信息</h4>
                      {recognitionResult ? (
                        <div className="prose dark:prose-invert max-w-none">
                          <div className="p-4 bg-white dark:bg-gray-600 rounded-lg whitespace-pre-wrap">
                            <p className="text-gray-700 dark:text-gray-200">{recognitionResult}</p>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center h-[250px]">
                          <p className="text-gray-400 dark:text-gray-500">
                            {isProcessing ? "正在识别..." : "点击上方按钮开始识别"}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

