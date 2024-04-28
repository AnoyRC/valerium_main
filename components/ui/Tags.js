"use client";

import { Chip } from "@material-tailwind/react";

const Tags = ({ label, position }) => {
  return (
    <Chip
      variant="outlined"
      value={label}
      className={"rounded-full " + position}
    />
  );
};
export default Tags;
