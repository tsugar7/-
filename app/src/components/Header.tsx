
import { motion } from "framer-motion";
import { Gem, Github } from "lucide-react";

export function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/5"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <motion.div
            className="flex items-center gap-2.5"
            whileHover={{ opacity: 0.8 }}
          >
            <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center border border-white/10">
              <Gem className="w-3.5 h-3.5 text-neutral-400" />
            </div>
            <span className="text-sm font-medium text-white tracking-tight">拼豆工坊</span>
          </motion.div>

          {/* 导航 */}
          <nav className="hidden md:flex items-center gap-1">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="px-3 py-1.5 text-xs text-neutral-500 hover:text-white transition-colors"
            >
              首页
            </button>
            <button
              onClick={() => {
                const el = document.getElementById("how-to-use");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-3 py-1.5 text-xs text-neutral-500 hover:text-white transition-colors"
            >
              教程
            </button>
            <button
              onClick={() => {
                const el = document.getElementById("about");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-3 py-1.5 text-xs text-neutral-500 hover:text-white transition-colors"
            >
              关于
            </button>
          </nav>

          {/* 右侧 */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.open("https://github.com", "_blank")}
              className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              <Github className="w-3.5 h-3.5 text-neutral-500" />
            </button>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
