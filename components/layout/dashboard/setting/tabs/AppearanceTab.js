import SwitchNightMode from "@/components/ui/SwitchNightMode";
import { Suspense } from "react";

const AppearanceTab = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="mt-4 space-y-4">
        <p className="text-base font-normal text-black">
          You can switch to Light mode and Dark mode.
        </p>

        <div className="flex gap-14">
          <p className="text-xl font-medium">Theme:</p>

          <div className="flex gap-2">
            <SwitchNightMode />
            <p className="text-base font-normal text-black">Night Mode</p>
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default AppearanceTab;
