"use client";

import { TabsHeader, Tab } from "@material-tailwind/react";

const SettingTabHeader = ({ data, setActiveTab, activeTab }) => {
  return (
    <TabsHeader
      className="text-nowrap rounded-none border-b border-text-light-gray bg-transparent p-0"
      indicatorProps={{
        className:
          "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
      }}
    >
      {data.map(({ label, value }) => (
        <Tab
          key={value}
          value={value}
          onClick={() => setActiveTab(value)}
          className={`mr-8 w-fit px-3 font-noto ${activeTab === value ? "text-gray-900" : ""}`}
        >
          {label}
        </Tab>
      ))}
    </TabsHeader>
  );
};

export default SettingTabHeader;
