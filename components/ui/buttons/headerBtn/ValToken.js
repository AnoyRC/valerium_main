"use client";

import { Plus } from "lucide-react";
import { Button } from "@material-tailwind/react";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

const ValToken = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleTokenClick = () => {
    router.push(`/store?domain=${searchParams.get("domain")}`);
  };

  return (
    <li>
      <Button
        className="flex items-center gap-2 rounded-full border border-border-light bg-gradient-light-linear/85 px-1.5 py-1.5 font-noto font-bold"
        color="white"
        onClick={handleTokenClick}
      >
        <div className="w-8 px-0.5">
          <Image
            src="/valerium-gas-token.png"
            alt="Valerium Gas Token"
            width={28}
            height={28}
          />
        </div>

        <p className="text-base font-semibold">5</p>

        <div className="rounded-full bg-gradient-primary-light p-1">
          <Plus size={16} color="white" />
        </div>
      </Button>
    </li>
  );
};

export default ValToken;
