"use client";

import ValeriumInput from "@/components/ui/input/ValeriumInput";
import { Tabs, TabsHeader, Tab, TabsBody } from "@material-tailwind/react";

const GaslessToggle = ({
  style,
  activeTab,
  setActiveTab,
  payWith,
  setPayWith,
}) => {
  const data = [
    {
      label: "Gasless",
      value: "gasless",
    },
    {
      label: "With Gas",
      value: "gas",
    },
  ];

  return (
    <Tabs
      id="custom-animation"
      value={activeTab}
      className="flex items-start justify-between"
    >
      <TabsHeader
        className="w-full rounded-full bg-text-light-gray bg-opacity-100 p-0 text-white"
        indicatorProps={{
          style: {
            background: style?.gradientColorLight,
          },
          className: "rounded-full",
        }}
      >
        {data.map(({ label, value }) => (
          <Tab
            key={value}
            value={value}
            onClick={() => setActiveTab(value)}
            className={`w-full text-nowrap px-8 py-2 font-noto font-medium transition-colors duration-300 ${
              activeTab === value ? "" : ""
            }`}
            style={{
              color: style?.baseTextColor,
            }}
          >
            {label}
          </Tab>
        ))}
      </TabsHeader>

      <TabsBody className="w-fit">
        {activeTab !== "gasless" && (
          <ValeriumInput
            label="Token"
            id="token-transfer"
            type="text"
            placeholder="Token"
            required={true}
            input={payWith}
            setInput={setPayWith}
          />
        )}
      </TabsBody>
    </Tabs>
  );
};

export default GaslessToggle;
