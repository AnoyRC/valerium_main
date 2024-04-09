import { Button } from "@material-tailwind/react";

const ActionButton = ({ style, label, icon, handleClick }) => {
  return (
    <Button
      fullWidth
      className="flex items-center font-noto justify-center gap-2 rounded-full py-3.5 text-base font-semibold capitalize"
      icon={icon}
      onClick={handleClick}
      style={{
        background: style.gradientColorLight,
        color: style.baseTextColor,
      }}
    >
      {label}
      {icon && icon}
    </Button>
  );
};

export default ActionButton;
