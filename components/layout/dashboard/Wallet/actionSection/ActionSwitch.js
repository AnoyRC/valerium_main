"use client";

import { useState } from "react";

const ActionSwitch = ({ id, label, style }) => {
  const [isChecked, setIsChecked] = useState(true);

  const handleSwitchChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <label htmlFor={id} className="flex items-center cursor-pointer">
      <span className="mr-3 text-text-gray font-semibold">{label}</span>

      <input
        type="checkbox"
        id={id}
        className="sr-only"
        checked={isChecked}
        onChange={handleSwitchChange}
        aria-label={label}
      />

      <div
        className={`relative w-14 h-fit align-middle select-none transition duration-300 ease-in rounded-full flex items-center p-0.5 cursor-pointer bg-white`}
        style={{
          background: isChecked ? style.gradientColorLight : "#4D4A4F",
        }}
        role="switch"
        aria-checked={isChecked}
      >
        <div
          className={`transform inline-block w-5 h-5 rounded-full transition-transform  duration-300 ease-in bg-white`}
          style={{
            transform: isChecked ? "translateX(32px)" : "translateX(0%)",
          }}
        ></div>
      </div>
    </label>
  );
};

export default ActionSwitch;
