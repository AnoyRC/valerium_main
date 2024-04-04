"use client";

import { Sun, Moon } from "lucide-react";

import { useState } from "react";

const SwitchNightMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleSwitchChange = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div
      className={`relative w-14 h align-middle select-none transition duration-200 ease-in rounded-full flex items-center p-0.5 cursor-pointer  ${
        isDarkMode ? "bg-white" : "bg-black"
      }`}
      onClick={handleSwitchChange}
    >
      <div
        className={`transform ${
          isDarkMode ? "translate-x-8 bg-black" : "translate-x-0 bg-white"
        } inline-block w-5 h-5 transform rounded-full transition-transform duration-400 ease-in`}
      ></div>

      <Sun
        size={isDarkMode ? 12 : 16}
        className="absolute top-1/2 left-1 transform -translate-y-1/2"
        style={{
          color: isDarkMode ? "#9E9E9E" : "#000",
        }}
      />

      <Moon
        size={isDarkMode ? 16 : 12}
        className="absolute top-1/2 right-1 transform -translate-y-1/2"
        style={{
          color: isDarkMode ? "#fff" : "#9E9E9E",
        }}
      />
    </div>
  );
};

export default SwitchNightMode;
