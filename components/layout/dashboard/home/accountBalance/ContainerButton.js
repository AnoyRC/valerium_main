"use client";

import { Send } from "lucide-react";
import { Button } from "@material-tailwind/react";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

const ContainerButton = () => {
  const searchParams = useSearchParams();
  return (
    <div className="space-x-5">
      <Button className="rounded-full border-2 border-black bg-gradient-primary-light p-3 text-white">
        <Link
          href={`/transfer?domain=${searchParams.get("domain")?.toLowerCase()}`}
        >
          <Send size={24} className="-translate-x-0.5 translate-y-0.5" />
        </Link>
      </Button>

      <Button className="rounded-full border-2 border-black bg-gradient-primary-light p-3 text-white">
        <div
          onClick={() => {
            toast.error("Coming Soon");
          }}
        >
          <Send
            size={24}
            className="-translate-y-0.5 translate-x-0.5 rotate-180"
          />
        </div>
      </Button>
    </div>
  );
};

export default ContainerButton;
