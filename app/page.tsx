import Link from "next/link";
import { AboutButton } from "./components/AboutModal";

export default function Home() {
  const features = [
    {
      title: "图片压缩",
      description: "智能压缩图片，保持高质量的同时大幅减小文件体积",
      icon: "🗜️",
      href: "/compress",
      gradient: "from-cyan-500 via-blue-500 to-purple-500",
      glowColor: "rgba(59, 130, 246, 0.3)",
    },
    {
      title: "抠图去背景",
      description: "AI智能识别主体，一键去除背景，支持透明PNG导出",
      icon: "✂️",
      href: "/remove-bg",
      gradient: "from-purple-500 via-pink-500 to-rose-500",
      glowColor: "rgba(168, 85, 247, 0.3)",
    },
    {
      title: "图片识别",
      description: "强大的图片识别能力，识别物体、场景、文字等内容",
      icon: "🔍",
      href: "/recognize",
      gradient: "from-orange-500 via-red-500 to-pink-500",
      glowColor: "rgba(249, 115, 22, 0.3)",
    },
    {
      title: "AI 生图",
      description: "文字描述生成精美图片，将想象变为现实",
      icon: "🎨",
      href: "/generate",
      gradient: "from-emerald-500 via-teal-500 to-cyan-500",
      glowColor: "rgba(16, 185, 129, 0.3)",
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#0a0a0f]">
      {/* 背景装饰 - 动态渐变球 */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/2 w-[1000px] h-[1000px] rounded-full bg-gradient-to-br from-purple-600/20 to-pink-600/20 blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-1/2 -left-1/2 w-[1000px] h-[1000px] rounded-full bg-gradient-to-tr from-cyan-600/20 to-blue-600/20 blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* 网格背景 */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none"></div>

      {/* Header */}
      <header className="relative pt-8 pb-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* About Button - Top Right */}
          <div className="flex justify-end mb-12">
            <AboutButton />
          </div>
          
          {/* Title */}
          <div className="text-center">
            <div className="inline-block mb-6">
              <h1 className="text-6xl md:text-7xl font-black mb-4 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animated-gradient">
                图片百宝箱
              </h1>
              <div className="h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-full"></div>
            </div>
            <p className="text-xl md:text-2xl text-gray-300 font-light max-w-2xl mx-auto leading-relaxed">
              专业的 <span className="text-transparent bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text font-semibold">AI 图片处理工具</span>
              <br />让图片处理变得简单高效
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {features.map((feature, index) => (
              <Link
                key={index}
                href={feature.href}
                className="group relative glass-effect rounded-3xl p-8 hover:scale-[1.02] transition-all duration-500 overflow-hidden"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                {/* 发光边框效果 */}
                <div 
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(135deg, ${feature.glowColor}, transparent)`,
                    filter: 'blur(20px)',
                  }}
                ></div>

                {/* 渐变边框 */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${feature.gradient} opacity-20 group-hover:opacity-40 transition-opacity duration-500`}></div>
                <div className="absolute inset-[1px] rounded-3xl bg-[#0a0a0f]/80 backdrop-blur-xl"></div>
                
                {/* Content */}
                <div className="relative z-10">
                  <div className="flex items-start gap-6 mb-4">
                    {/* Icon with glow */}
                    <div className={`relative flex-shrink-0`}>
                      <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500`}></div>
                      <div className={`relative text-6xl w-20 h-20 flex items-center justify-center bg-gradient-to-br ${feature.gradient} rounded-2xl transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                        {feature.icon}
                      </div>
                    </div>
                    
                    {/* Text */}
                    <div className="flex-1 min-w-0">
                      <h2 className={`text-2xl md:text-3xl font-bold mb-3 text-white group-hover:bg-gradient-to-r group-hover:${feature.gradient} group-hover:bg-clip-text group-hover:text-transparent transition-all duration-500`}>
                        {feature.title}
                      </h2>
                      <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Arrow with gradient */}
                  <div className="flex justify-end items-center gap-2 mt-6">
                    <span className={`text-sm font-semibold text-transparent bg-gradient-to-r ${feature.gradient} bg-clip-text opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                      立即体验
                    </span>
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${feature.gradient} flex items-center justify-center transform group-hover:translate-x-2 transition-all duration-300`}>
                      <svg 
                        className="w-4 h-4 text-white" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Hover effect particles */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative py-12 px-4 text-center mt-20">
        <div className="max-w-6xl mx-auto">
          <div className="h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent mb-8"></div>
          <p className="text-gray-400 mb-2">
            © 2025 图片百宝箱 · 基于 AI 技术的智能图片处理平台
          </p>
          <p className="text-sm text-gray-500">
            由 <span className="text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text font-semibold">鹿途AI智能体</span> 开发
          </p>
        </div>
      </footer>
    </div>
  );
}
