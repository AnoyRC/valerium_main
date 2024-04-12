import BasicInfoTab from "./tabs/BasicInfoTab";

import dynamic from "next/dynamic";

const DynamicAppearance = dynamic(() => import("./tabs/AppearanceTab"), {
  loading: () => <p>Loading...</p>,
});

const DynamicAuthTab = dynamic(() => import("./tabs/AuthTab"), {
  loading: () => <p>Loading...</p>,
});

const DynamicSecurity = dynamic(() => import("./tabs/SecurityTab"), {
  loading: () => <p>Loading...</p>,
});

import SettingTab from "./settingsTab/SettingTab";

const Setting = () => {
  const data = [
    {
      label: "Basic Information",
      value: "info",
      desc: <BasicInfoTab />,
    },

    {
      label: "Appearance",
      value: "appearance",
      desc: <DynamicAppearance />,
    },

    {
      label: "Authentication",
      value: "auth",
      desc: <DynamicAuthTab />,
    },

    {
      label: "Security/Login",
      value: "login",
      desc: <DynamicSecurity />,
    },
  ];

  return <SettingTab data={data} />;
};

export default Setting;
