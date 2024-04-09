"use client";

import { Tabs, TabsHeader, Tab } from "@material-tailwind/react";

const GaslessToggle = ({ style, activeTab, setActiveTab }) => {
  const data = [
    {
      label: "Gasless",
      value: true,
    },
    {
      label: "With Gas",
      value: false,
    },
  ];

  return (
    <Tabs id="custom-animation" value={activeTab}>
      <TabsHeader
        className="rounded-full bg-text-light-gray text-white bg-opacity-100 p-0"
        indicatorProps={{
          className: `rounded-full bg-[${style.gradientColorLight}]`,
        }}
      >
        {data.map(({ label, value }) => (
          <Tab
            key={value}
            value={value}
            onClick={() => setActiveTab(value)}
            className={`py-2 transition-colors duration-300 font-medium ${
              activeTab === value ? "" : ""
            }`}
          >
            {label}
          </Tab>
        ))}
      </TabsHeader>
    </Tabs>
  );
};

export default GaslessToggle;
