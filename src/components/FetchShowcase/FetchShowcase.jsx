import React from "react";
import { motion } from "framer-motion";
import { SlideUp } from "../../animation/animate";

// 模拟数据，根据图片内容创建
const weatherData = {
  temperature: 11,
  location: "Shanghai",
  condition: "Light Rain Shower",
};

const statusData = {
  title: "Soft Movements",
  description: "Rosy Glow",
};

const inventoryData = {
  title: "Gradients",
  quantity: 120,
  status: "In Stock",
};

const astronomyData = {
  sunrise: "06:52 AM",
  sunset: "06:47 PM",
  moon: "Full Moon",
};

const FetchShowcase = () => {
  return (
    <div className="bg-gray-100 py-32 w-full min-h-screen">
      <div className="container mx-auto px-6 lg:px-12 xl:px-24 max-w-full">
        {/* 标题区域 */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <motion.h2
              variants={SlideUp(0.1)}
              initial="initial"
              whileInView="animate"
              className="text-5xl font-normal mb-2 tracking-tight"
            >
              Fetch
            </motion.h2>
            <motion.div
              variants={SlideUp(0.2)}
              initial="initial"
              whileInView="animate"
              className="flex flex-col md:flex-row gap-1 md:gap-3 text-lg font-light tracking-wide"
            >
              <p>Harness the power of APIs on</p>
              <p>
                your <span className="text-purple-600 font-normal">Framer</span> site, without code.
              </p>
            </motion.div>
            <motion.p
              variants={SlideUp(0.3)}
              initial="initial"
              whileInView="animate"
              className="text-purple-600 font-light text-lg tracking-wide mt-1"
            >
              Learn how in the video.
            </motion.p>
          </div>
          <motion.div
            variants={SlideUp(0.2)}
            initial="initial"
            whileInView="animate"
            className="mt-4 md:mt-0 text-right"
          >
            <div className="flex flex-col items-end">
              <div className="flex gap-2">
                <span className="text-green-500 text-xs">●</span>
                <p className="text-xs">All Good</p>
              </div>
              <p className="text-xs">Shanghai</p>
              <p className="text-xs">06:47 PM</p>
              <p className="text-xs">12489</p>
            </div>
          </motion.div>
        </div>

        {/* 卡片区域 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* 天气卡片 */}
          <motion.div
            variants={SlideUp(0.3)}
            initial="initial"
            whileInView="animate"
            className="bg-white p-6 rounded-xl border border-gray-200 relative"
          >
            <div className="absolute top-4 right-4 text-purple-600 text-xs">●</div>
            <h3 className="text-sm text-gray-500 mb-4">CURRENT WEATHER</h3>
            <div className="flex flex-col">
              <span className="text-5xl font-light mb-2">{weatherData.temperature}</span>
              <p className="font-medium">{weatherData.location}</p>
              <p className="text-sm text-gray-500">{weatherData.condition}</p>
            </div>
          </motion.div>

          {/* 状态卡片 */}
          <motion.div
            variants={SlideUp(0.4)}
            initial="initial"
            whileInView="animate"
            className="bg-white p-6 rounded-xl border border-gray-200 relative"
          >
            <div className="absolute top-4 right-4 text-purple-600 text-xs">●</div>
            <h3 className="text-sm text-gray-500 mb-4">LISTENING STATUS</h3>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-200 to-purple-200 rounded-xl"></div>
              <div>
                <p className="font-medium">{statusData.title}</p>
                <p className="text-sm text-gray-500">{statusData.description}</p>
              </div>
            </div>
          </motion.div>

          {/* 库存卡片 */}
          <motion.div
            variants={SlideUp(0.5)}
            initial="initial"
            whileInView="animate"
            className="bg-white p-6 rounded-xl border border-gray-200 relative"
          >
            <div className="absolute top-4 right-4 text-purple-600 text-xs">●</div>
            <h3 className="text-sm text-gray-500 mb-4">LIVE INVENTORY</h3>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-500 rounded-xl"></div>
              <div>
                <p className="font-medium">{inventoryData.title}</p>
                <p className="text-sm text-gray-500">
                  {inventoryData.quantity} In Stock
                </p>
              </div>
            </div>
          </motion.div>

          {/* 天文卡片 */}
          <motion.div
            variants={SlideUp(0.6)}
            initial="initial"
            whileInView="animate"
            className="bg-white p-6 rounded-xl border border-gray-200 relative"
          >
            <div className="absolute top-4 right-4 text-purple-600 text-xs">●</div>
            <h3 className="text-sm text-gray-500 mb-4">ASTRONOMY</h3>
            <div className="flex flex-col">
              <div className="flex justify-between mb-1">
                <span>Sunrise</span>
                <span>{astronomyData.sunrise}</span>
              </div>
              <div className="flex justify-between mb-1">
                <span>Sunset</span>
                <span>{astronomyData.sunset}</span>
              </div>
              <div className="flex justify-between">
                <span>Moon</span>
                <span>{astronomyData.moon}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default FetchShowcase;