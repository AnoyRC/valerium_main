import { Button } from "@material-tailwind/react";

const ActionButton = ({ style, label, icon, handleClick }) => {
  return (
    <Button
      fullWidth
      className="rounded-full py-3.5 flex items-center justify-center gap-2 text-base font-semibold capitalize"
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
