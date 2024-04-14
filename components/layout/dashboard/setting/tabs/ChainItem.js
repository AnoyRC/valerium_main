import Image from "next/image";
import { SquareArrowOutUpRight } from "lucide-react";
import CopyButton from "@/components/ui/buttons/CopyButton";
import config from "@/lib/config";
import { ethers } from "ethers";

export default function ChainItem({ walletAddress }) {
  const chain = config.find((c) => c.chainId === walletAddress.chainId);

  return (
    walletAddress.address !== ethers.constants.AddressZero && (
      <tr>
        <td className="border-b border-black px-2 py-2.5 font-medium">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image
                src={`/tokens${chain.style.logo}`}
                alt={" logo"}
                width={40}
                height={40}
                className="rounded-full"
              />

              <div className="space-y-1">
                <div className="flex gap-1 text-sm">
                  <p className="font-medium text-black">
                    {walletAddress.address}
                  </p>
                  <CopyButton text={walletAddress.address} />
                </div>

                <div className="text-sm font-normal text-text-gray">
                  {chain.chainName}
                </div>
              </div>
            </div>

            <SquareArrowOutUpRight size={16} color="black" />
          </div>
        </td>
      </tr>
    )
  );
}
