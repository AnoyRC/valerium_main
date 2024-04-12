"use client";

import { Select, Option } from "@material-tailwind/react";

import { useState } from "react";

const ChainSwitcherShort = () => {
  const [value, setValue] = useState("op");

  return (
    <Select value={value} onChange={(val) => setValue(val)}>
      <Option value="op">OP</Option>
      <Option value="base">BASE</Option>
      <Option value="mode">MODE</Option>
    </Select>
  );
};

export default ChainSwitcherShort;
