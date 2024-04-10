"use client";

import { Send } from "lucide-react";
import { Button } from "@material-tailwind/react";

import Link from "next/link";

const ContainerButton = () => {
  return (
    <div className="space-x-5">
      <Button className="rounded-full border-2 border-black bg-gradient-primary-light p-3 text-white">
        <Link href="/transfer">
          <Send size={24} className="-translate-x-0.5 translate-y-0.5" />
        </Link>
      </Button>

      <Button className="rounded-full border-2 border-black bg-gradient-primary-light p-3 text-white">
        <Link href="/deposit">
          <Send
            size={24}
            className="-translate-y-0.5 translate-x-0.5 rotate-180"
          />
        </Link>
      </Button>
    </div>
  );
};

export default ContainerButton;
