import { MousePointer2 } from "lucide-react";

const ActionHeading = ({ style, icon, heading, paragraph }) => {
  return (
    <div className="flex items-center gap-3">
      <div
        className="flex w-fit items-center justify-center rounded-full border-2 border-black p-4"
        style={{
          background: style?.gradientColorLight,
          color: style?.baseTextColor,
        }}
      >
        {icon && icon}
      </div>

      <div className="-mt-1 flex flex-col">
        <h2 className="text-2.5xl font-semibold">{heading}</h2>

        <p className="text-sm">{paragraph}</p>
      </div>
    </div>
  );
};

export default ActionHeading;
