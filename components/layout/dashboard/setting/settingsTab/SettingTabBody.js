"use client";

import { TabsBody, TabPanel } from "@material-tailwind/react";

const SettingTabBody = ({ data }) => {
  return (
    <TabsBody>
      {data.map(({ value, desc }) => (
        <TabPanel className="font-noto" key={value} value={value}>
          {desc}
        </TabPanel>
      ))}
    </TabsBody>
  );
};

export default SettingTabBody;
