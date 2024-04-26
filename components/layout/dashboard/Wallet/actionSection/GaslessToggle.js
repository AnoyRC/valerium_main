"use client";

import { Tabs, TabsHeader, Tab, TabsBody } from "@material-tailwind/react";

import { useSelector } from "react-redux";

import TokenButton from "@/components/ui/buttons/TokenButton";
import { useRouter, useSearchParams } from "next/navigation";

const GaslessToggle = ({
  style,
  activeTab,
  setActiveTab,
  disabled = false,
}) => {
  const currentChain = useSelector((state) => state.chain.currentChain);
  const gasCredit = useSelector((state) => state.user.gasCredit);
  const router = useRouter();
  const searchParams = useSearchParams();

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
      className="flex h-10 items-center justify-between gap-4"
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
            disabled={disabled}
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
        {activeTab !== "gasless" ? (
          <TokenButton
            index={1}
            width="1"
            id="gas-token-transfer"
            label="Pay With"
            span=""
            value="Select Token"
            chainId={currentChain.chainId}
            style="flex items-center w-full !3xl:space-y-0 !space-y-0"
            disabled={disabled}
          />
        ) : gasCredit === 0 ? (
          <p className="text-sm">
            No Credits?{" "}
            <span
              style={{
                color: currentChain.style.colorLight,
              }}
              className="hover:cursor-pointer hover:underline"
              onClick={() => {
                router.push(
                  `/store?domain=${searchParams.get("domain")?.toLowerCase()}`
                );
              }}
            >
              Open Store
            </span>{" "}
          </p>
        ) : (
          ""
        )}
      </TabsBody>
    </Tabs>
  );
};

export default GaslessToggle;
