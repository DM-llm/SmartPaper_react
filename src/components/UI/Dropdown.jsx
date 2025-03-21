import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';

const Dropdown = ({ 
  options, 
  value, 
  onChange, 
  placeholder = '选择选项',
  disabled = false,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  // 查找当前选中的选项
  const selectedOption = options.find(option => option.value === value);
  
  // 点击外部关闭下拉框
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // 处理选项选择
  const handleSelect = (option) => {
    onChange(option.value);
    setIsOpen(false);
  };
  
  return (
    <div 
      ref={dropdownRef}
      className={`relative w-full ${className}`}
    >
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`w-full px-5 py-3 flex items-center justify-between text-left outline-none border-none bg-white text-gray-700 rounded-md shadow-sm transition-all duration-300 cursor-pointer ${disabled ? 'opacity-70 cursor-not-allowed' : 'hover:bg-gray-50 focus:ring-2 focus:ring-purple-200'}`}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className={selectedOption ? 'text-gray-800' : 'text-gray-500'}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <FiChevronDown className="text-gray-500" />
        </motion.div>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-[9999] w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto"
            style={{ top: '100%', left: 0 }}
            role="listbox"
          >
            {options.map((option) => (
              <motion.li
                key={option.value}
                onClick={() => handleSelect(option)}
                className={`px-5 py-2.5 cursor-pointer transition-colors duration-150 ${value === option.value ? 'bg-purple-50 text-purple-700' : 'text-gray-700 hover:bg-gray-50'}`}
                whileHover={{ x: 4 }}
                role="option"
                aria-selected={value === option.value}
              >
                {option.label}
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dropdown;