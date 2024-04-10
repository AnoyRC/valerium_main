"use client";

const ValeriumInput = ({
  label,
  id,
  type,
  span,
  icon,
  input,
  setInput,
  readOnly = false,
  placeholder,
  required = false,
  width,
  isValid = true,
}) => {
  return (
    <div
      className="3xl:space-y-2 h-fit space-y-1.5"
      style={width && { flex: width }}
    >
      <label
        htmlFor={id}
        className="prevent-select flex items-center gap-2 text-base text-text-gray"
      >
        <span className="font-medium">
          {label} {required && <span className="text-red-500">*</span>}
        </span>

        <span className="text-xs text-text-gray">{span}</span>
      </label>

      <p className="prevent-select relative flex gap-2">
        <input
          id={id}
          type={type}
          value={input}
          readOnly={readOnly}
          onChange={(e) => setInput(e.target.value)}
          placeholder={placeholder}
          className={`w-full text-ellipsis rounded-full border border-border-light bg-white px-4 py-3.5 text-base text-black outline-none placeholder:text-text-light-gray focus:border-gray-300 ${readOnly && "cursor-not-allowed"
            }`}
          style={{
            color: isValid ? "black" : "red",
          }}
        />

        {icon}
      </p>
    </div>
  );
};

export default ValeriumInput;
