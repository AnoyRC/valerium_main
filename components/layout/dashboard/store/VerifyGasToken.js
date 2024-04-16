"use client";

import { Button } from "@material-tailwind/react";

const VerifyGasToken = ({ color }) => {
  return (
    <div className="flex space-x-2 text-sm">
      <p>Didn’t receive your token?</p>
      <Button
        className="bg-transparent p-0 underline underline-offset-4 shadow-none hover:shadow-none"
        style={{
          color: color,
        }}
      >
        Verify transaction
      </Button>
    </div>
  );
};

export default VerifyGasToken;
