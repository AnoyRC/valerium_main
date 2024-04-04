import { ArrowDownRight, ChevronRight, Copy } from "lucide-react";
import Image from "next/image";

const AccountChange = () => {
  return (
    <section className="flex items-center bg-linear-blue px-2 py-3 rounded-lg text-white mt-10 back">
      <div className="mr-2">
        <Image src={"/tokens/base-token.png"} width={36} height={36} />
      </div>
      <div>
        <p className="flex text-xs items-center">
          0x1c4cP7...QKpr
          <span className="ml-2 cursor-pointer">
            <Copy size={16} />
          </span>
        </p>
        <p className="text-sm font-bold">BASE</p>
      </div>
      <div className="ml-auto cursor-pointer">
        <ChevronRight />
      </div>
    </section>
  );
};

export default AccountChange;
