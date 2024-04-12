import Image from "next/image";
import { Info, SquareArrowOutUpRight } from "lucide-react";

import Alpha from "@/components/ui/Alpha";
import DomainName from "@/components/ui/DomainName";
import CopyButton from "@/components/ui/buttons/CopyButton";

// Complete Settings
// Complete Dashboard header
// Network switcher

const BasicInfoTab = () => {
  return (
    <section className="mt-4 w-full space-y-8">
      <div className="mx-2 space-y-3">
        <DomainName />

        <div className="flex gap-3 text-5xl font-bold text-black">
          <p>Valerium</p> <Alpha size="text-5xl" />
        </div>
      </div>

      <hr className="border-text-light-gray" />

      <div className="mx-2 space-y-2">
        <h3 className="flex items-center gap-2 text-xl font-medium text-black">
          Valerium Account Nonce:{" "}
          <span>
            <Info size={20} />
          </span>
        </h3>

        <p className="text-base font-normal text-text-gray">
          Current Nonce:
          <span className="ml-1">0</span>
        </p>
      </div>

      <hr className="border-text-light-gray" />

      <div className="mx-2 flex gap-4">
        <h3 className="text-xl font-medium text-black">
          Valerium Accounts on Chains:
        </h3>

        <div className="flex-1 items-start space-y-3 text-base">
          <p className="font-normal">
            Your list of every currently deployed Valerium wallets on chains
            with your wallet address and the chain it’s deployed upon.
          </p>

          <table
            className="mt-1 w-full table-fixed border-separate border-spacing-0 text-left"
            style={{ tableLayout: "fixed" }}
          >
            <thead>
              <tr>
                <th className="border-b border-black pb-2">Name</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td className="border-b border-black px-2 py-2.5 font-medium">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Image
                        src={`/tokens/base-logo.svg`}
                        alt={" logo"}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />

                      <div className="space-y-1">
                        <div className="flex gap-1 text-sm">
                          <p className="font-medium text-black">
                            0x14J3pIw6l4J3pIw6l4J3pIw6l4J3pIw6l
                          </p>
                          <CopyButton text="hi" />
                        </div>

                        <div className="text-sm font-normal text-text-gray">
                          Ethereum
                        </div>
                      </div>
                    </div>

                    <SquareArrowOutUpRight size={16} color="black" />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default BasicInfoTab;
