"use client";

import { Tabs, TabsHeader, Tab } from "@material-tailwind/react";

const GaslessToggle = ({ style, activeTab, setActiveTab }) => {
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
    <Tabs id="custom-animation" value={activeTab}>
      <TabsHeader
        className="rounded-full bg-text-light-gray bg-opacity-100 p-0 text-white"
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
            className={`py-2 font-medium transition-colors font-noto duration-300 ${
              activeTab === value ? "" : ""
            }`}
            style={{
              color: style?.baseTextColor ,
            }}
          >
            {label}
          </Tab>
        ))}
      </TabsHeader>
    </Tabs>
  );
};

export default GaslessToggle;
