"use client";

import { Tabs } from "@material-tailwind/react";

import { useState } from "react";

import SettingTabBody from "./SettingTabBody";
import SettingTabHeader from "./SettingTabHeader";

const SettingTab = ({ data }) => {
  const [activeTab, setActiveTab] = useState("info");

  return (
    <Tabs value={activeTab} className="flex-1">
      <SettingTabHeader
        data={data}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <SettingTabBody data={data} />
    </Tabs>
  );
};

export default SettingTab;
