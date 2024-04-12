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
      className={`h relative flex w-16 cursor-pointer select-none items-center rounded-full p-1 align-middle transition duration-300 ease-in ${
        isDarkMode ? "bg-white" : "bg-black"
      } `}
      onClick={handleSwitchChange}
    >
      <div
        className={`transform ${
          isDarkMode ? "translate-x-9 bg-black" : "translate-x-0 bg-white"
        } inline-block h-5 w-5 transform rounded-full transition-transform  duration-500 ease-in`}
      ></div>

      <Sun
        size={isDarkMode ? 12 : 16}
        className="absolute left-1.5 top-1/2 -translate-y-1/2 transform duration-500"
        style={{
          color: isDarkMode ? "#9E9E9E" : "#000",
        }}
      />

      <Moon
        size={isDarkMode ? 16 : 12}
        className="absolute right-1.5 top-1/2 -translate-y-1/2 transform duration-500"
        style={{
          color: isDarkMode ? "#fff" : "#9E9E9E",
        }}
      />
    </div>
  );
};

export default SwitchNightMode;
