import React, { useState } from "react";
import { motion } from "framer-motion";
import { SlideUp } from "../../animation/animate";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

const Newsletter = () => {
  const [inputUrl, setInputUrl] = useState('');
  const [responseContent, setResponseContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const mathFormula = "$$\n\\begin{bmatrix}\n\\dot{x} \\\\\n\\ddot{x} \\\\\n\\dot{\\phi} \\\\\n\\ddot{\\phi}\n\\end{bmatrix}\n=\n\\begin{bmatrix}\n0 & 1 & 0 & 0 \\\\\n0 & -\\frac{(l + m_1 l^2) r_f}{(m_1 + m_2) l + m_1 m_2 l^2} & 0 & \\frac{m_1^2 g l^2}{(m_1 + m_2) l + m_1 m_2 l^2} \\\\\n0 & 0 & 0 & 0 \\\\\n0 & \\frac{m_1 l r_f}{(m_1 + m_2) l + m_1 m_2 l^2} & 0 & \\frac{m_1 g l (m_1 + m_2)}{(m_1 + m_2) l + m_1 m_2 l^2}\n\\end{bmatrix}\n\\begin{bmatrix}\nx \\\\\n\\dot{x} \\\\\n\\phi \\\\\n\\dot{\\phi}\n\\end{bmatrix}\n+\n\\begin{bmatrix}\n0 \\\\\n\\frac{(l + m_1 l^2)}{(m_1 + m_2) l + m_1 m_2 l^2} \\\\\n0 \\\\\n\\frac{m_1 l}{(m_1 + m_2) l + m_1 m_2 l^2}\n\\end{bmatrix}\nu\n$$";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setResponseContent('');

    try {
      const characters = mathFormula.split('');
      for (let i = 0; i < characters.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 50));
        setResponseContent(prev => prev + characters[i]);
      }
    } catch (error) {
      console.error('流式输出失败:', error);
      setResponseContent('输出失败，请重试');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-[700px] mx-auto space-y-5 py-8 min-h-screen flex flex-col justify-start pt-20">
      <motion.h1
        variants={SlideUp(0.2)}
        initial="initial"
        whileInView="animate"
        className="text-3xl font-bold font-serif text-center"
      >
        SmartPaper
      </motion.h1>
      <motion.p
        variants={SlideUp(0.4)}
        initial="initial"
        whileInView="animate"
        className="max-w-[450px] mx-auto text-gray-500 text-sm text-center"
      >
        使用说明： 1. 输入arXiv论文URL 2. 选择合适的提示词模板 3. 点击"开始分析"按钮 4. 等待分析完成后可下载结果
      </motion.p>
      {/* form here */}
      <motion.div
        variants={SlideUp(0.6)}
        initial="initial"
        whileInView="animate"
        className="!mt-8"
      >
        <form onSubmit={handleSubmit} className="w-full max-w-[640px] mx-auto">
          <div className="flex border-2 border-black">
            <input
              type="text"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              placeholder="输入arXiv论文URL"
              className="w-full px-4 py-3 outline-none border-none"
              disabled={isLoading}
            />
            <button 
              type="submit"
              className="bg-black text-white px-10 py-3 text-lg font-medium"
              disabled={isLoading}
            >
              {isLoading ? '分析中...' : '开始分析'}
            </button>
          </div>
        </form>
      </motion.div>
      
      {/* 输出框移到表单下方，并支持Markdown渲染 */}
      {responseContent && (
        <motion.div
          variants={SlideUp(0.8)}
          initial="initial"
          whileInView="animate"
          className="mt-8 p-6 bg-gray-50 rounded-lg w-full max-w-[640px] mx-auto"
        >
          <ReactMarkdown 
            remarkPlugins={[remarkGfm, remarkMath]}
            rehypePlugins={[rehypeKatex]}
            components={{
              // 定义自定义组件来应用样式
              p: ({node, ...props}) => <p className="prose prose-sm max-w-none" {...props} />
            }}
          >
            {responseContent}
          </ReactMarkdown>
        </motion.div>
      )}
    </div>
  );
};

export default Newsletter;
