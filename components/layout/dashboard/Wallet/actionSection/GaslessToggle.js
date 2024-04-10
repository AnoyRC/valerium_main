"use client";

import { Tabs, TabsHeader, Tab, TabsBody } from "@material-tailwind/react";

import { useSelector } from "react-redux";

import TokenButton from "@/components/ui/buttons/TokenButton";

const GaslessToggle = ({ style, activeTab, setActiveTab }) => {
  const currentChain = useSelector((state) => state.chain.currentChain);

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
      className="flex items-start justify-between gap-4"
      style={{
        overflow: "visible",
      }}
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

      <TabsBody
        className="w-full"
        style={{
          overflow: "visible",
        }}
      >
        {activeTab !== "gasless" && (
          <TokenButton
            index={1}
            width="1"
            id="gas-token-transfer"
            label="Pay With"
            span=""
            value="Select Token"
            disabled={false}
            chainId={currentChain.chainId}
            style="flex items-center !3xl:space-y-0 !space-y-0"
          />
        )}
      </TabsBody>
    </Tabs>
  );
};

export default GaslessToggle;
