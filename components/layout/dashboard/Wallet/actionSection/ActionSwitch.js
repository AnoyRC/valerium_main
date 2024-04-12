"use client";

const ActionSwitch = ({
  id,
  label,
  style,
  toggle,
  setToggle,
  disabled = false,
}) => {
  const handleSwitchChange = () => {
    setToggle(!toggle);
  };

  return (
    <label htmlFor={id} className="flex cursor-pointer items-center">
      <span className="mr-3 font-semibold text-text-gray">{label}</span>

      <input
        type="checkbox"
        id={id}
        className="sr-only"
        checked={toggle}
        onChange={handleSwitchChange}
        aria-label={label}
        disabled={disabled}
        style={{
          opacity: disabled ? 0.5 : 1,
        }}
      />

      <div
        className={`relative flex h-fit w-14 cursor-pointer select-none items-center rounded-full bg-white p-0.5 align-middle transition duration-300 ease-in`}
        style={{
          background: toggle ? style.gradientColorLight : "#4D4A4F",
        }}
        role="switch"
        aria-checked={toggle}
      >
        <div
          className={`inline-block h-5 w-5 transform rounded-full bg-white  transition-transform duration-300 ease-in`}
          style={{
            transform: toggle ? "translateX(32px)" : "translateX(0%)",
          }}
        ></div>
      </div>
    </label>
  );
};

export default ActionSwitch;
