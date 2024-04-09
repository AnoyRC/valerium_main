import { MousePointer2 } from "lucide-react";

const ActionHeading = ({ style, icon, heading, paragraph }) => {
  console.log(style);
  return (
    <div className="flex gap-3 items-start">
      <div
        className="w-fit p-3 border-2 border-black rounded-full flex items-center justify-center"
        style={{
          background: style?.gradientColorLight,
          color: style?.baseTextColor,
        }}
      >
        {icon && icon}
      </div>

      <div>
        <h2 className="text-2.5xl font-semibold">{heading}</h2>

        <p className="text-sm">{paragraph}</p>
      </div>
    </div>
  );
};

export default ActionHeading;
