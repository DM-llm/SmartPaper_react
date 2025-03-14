import React, { useState } from "react";
import { motion } from "framer-motion";
import { SlideUp } from "../../animation/animate";
import { createOpenAIClient } from "../../api/openai-client";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const Newsletter = () => {
  const [inputUrl, setInputUrl] = useState('');
  const [responseContent, setResponseContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setResponseContent('');

    try {
      const openai = createOpenAIClient();
      const stream = await openai.chat.completions.create({
        messages: [
          { role: 'system', content: '你是一份智能论文分析助手' },
          { role: 'user', content: `请分析这篇论文：${inputUrl}` }
        ],
        model: 'ep-20250314002155-k6w6f',
        stream: true,
      });

      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content || '';
        setResponseContent(prev => prev + content);
      }
    } catch (error) {
      console.error('API请求失败:', error);
      setResponseContent('分析失败，请重试');
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
            remarkPlugins={[remarkGfm]}
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
