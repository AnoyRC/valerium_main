"use client";

import { useState } from "react";

const ActionSwitch = ({ id, label, style }) => {
  const [isChecked, setIsChecked] = useState(true);

  const handleSwitchChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <label htmlFor={id} className="flex cursor-pointer items-center">
      <span className="mr-3 font-semibold text-text-gray">{label}</span>

      <input
        type="checkbox"
        id={id}
        className="sr-only"
        checked={isChecked}
        onChange={handleSwitchChange}
        aria-label={label}
      />

      <div
        className={`relative flex h-fit w-14 cursor-pointer select-none items-center rounded-full bg-white p-0.5 align-middle transition duration-300 ease-in`}
        style={{
          background: isChecked ? style.gradientColorLight : "#4D4A4F",
        }}
        role="switch"
        aria-checked={isChecked}
      >
        <div
          className={`inline-block h-5 w-5 transform rounded-full bg-white  transition-transform duration-300 ease-in`}
          style={{
            transform: isChecked ? "translateX(32px)" : "translateX(0%)",
          }}
        ></div>
      </div>
    </label>
  );
};

export default ActionSwitch;
