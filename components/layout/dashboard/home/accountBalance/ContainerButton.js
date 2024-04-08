"use client";

import { Send } from "lucide-react";
import { Button } from "@material-tailwind/react";

import Link from "next/link";

const ContainerButton = () => {
  return (
    <div className="space-x-5">
      <Button className="bg-gradient-primary-light text-white border-2 border-black p-3 rounded-full">
        <Link href="/transfer">
          <Send size={24} className="-translate-x-0.5 translate-y-0.5" />
        </Link>
      </Button>

      <Button className="bg-gradient-primary-light text-white border-2 border-black p-3 rounded-full">
        <Link href="/deposit">
          <Send
            size={24}
            className="rotate-180 translate-x-0.5 -translate-y-0.5"
          />
        </Link>
      </Button>
    </div>
  );
};

export default ContainerButton;
