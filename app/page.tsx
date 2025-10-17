import Link from "next/link";
import { AboutButton } from "./components/AboutModal";

export default function Home() {
  const features = [
    {
      title: "图片压缩",
      description: "智能压缩图片，保持高质量的同时大幅减小文件体积",
      icon: "🗜️",
      href: "/compress",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      title: "抠图去背景",
      description: "AI智能识别主体，一键去除背景，支持透明PNG导出",
      icon: "✂️",
      href: "/remove-bg",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      title: "图片识别",
      description: "强大的图片识别能力，识别物体、场景、文字等内容",
      icon: "🔍",
      href: "/recognize",
      gradient: "from-orange-500 to-red-500",
    },
    {
      title: "AI 生图",
      description: "文字描述生成精美图片，将想象变为现实",
      icon: "🎨",
      href: "/generate",
      gradient: "from-green-500 to-emerald-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="pt-12 pb-8 px-4">
        <div className="max-w-6xl mx-auto">
          {/* About Button - Top Right */}
          <div className="flex justify-end mb-6">
            <AboutButton />
          </div>
          
          {/* Title */}
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              图片百宝箱
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              专业的 AI 图片处理工具，让图片处理变得简单高效
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <Link
                key={index}
                href={feature.href}
                className="group relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Gradient Border Effect */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                
                {/* Content */}
                <div className="relative">
                  <div className="flex items-start gap-4">
                    <div className={`text-5xl bg-gradient-to-r ${feature.gradient} p-4 rounded-xl`}>
                      {feature.icon}
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-gray-100 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 dark:group-hover:from-blue-400 dark:group-hover:to-purple-400 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                        {feature.title}
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Arrow Icon */}
                  <div className="mt-4 flex justify-end">
                    <svg 
                      className="w-6 h-6 text-gray-400 group-hover:text-purple-500 group-hover:translate-x-1 transition-all duration-300" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 px-4 text-center text-gray-500 dark:text-gray-400">
        <p>© 2025 图片百宝箱. 基于 AI 技术的智能图片处理平台</p>
      </footer>
    </div>
  );
}
