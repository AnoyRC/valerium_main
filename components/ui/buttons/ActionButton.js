import { Button } from "@material-tailwind/react";

const ActionButton = ({
  style,
  label,
  icon,
  handleClick,
  disabled = false,
}) => {
  return (
    <Button
      fullWidth
      className="flex items-center justify-center gap-2 rounded-full py-3.5 font-noto text-base font-semibold capitalize"
      icon={icon}
      onClick={handleClick}
      style={{
        background: style.gradientColorLight,
        color: style.baseTextColor,
      }}
      disabled={disabled}
    >
      {label}
      {icon && icon}
    </Button>
  );
};

export default ActionButton;
