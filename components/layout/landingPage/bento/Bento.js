import Image from "next/image";
import CardContainer from "./card/Card";
import Tags from "@/components/ui/Tags";

const Bento = () => {
  return (
    <section className="mx-auto mb-16 grid max-w-7xl grid-cols-12 grid-rows-12 gap-5">
      <div
        className="col relative col-span-8 row-span-8 overflow-hidden rounded-xl border-[3px] border-white p-10 shadow-lg"
        style={{
          // background:
          //   "linear-gradient(180deg, rgba(233, 233, 233, 0.85) 0%, rgba(216, 216, 216, 0.85) 100.4%)",
          background: "linear-gradient(95deg, #c51ccb40 0%, #c4182c40 100%)",
        }}
      >
        <h3 className="mb-2 font-gloock text-4xl font-bold">
          Valerium Keycard
        </h3>
        <p className="text-base text-text-gray">
          Take your Valerium Keycard with you Anywhere you go.
        </p>

        <CardContainer />

        <Tags label="Coming soon" position="absolute bottom-5 left-5 " />
      </div>

      <div
        className="relative col-span-4 row-span-6 overflow-hidden rounded-xl border-[3px] border-white p-10 shadow-lg"
        style={{
          // background:
          //   "linear-gradient(180deg, rgba(233, 233, 233, 0.85) 0%, rgba(216, 216, 216, 0.85) 100.4%)",
          background: "linear-gradient(95deg, #c51ccb40 0%, #c4182c40 100%)",
        }}
      >
        <h3 className="mb-2 font-gloock text-4xl font-bold">
          Chains Supported
        </h3>
        <p className="text-base text-text-gray">
          Supported chains for Valerium Wallet.
        </p>

        <ul className="mt-4 text-base">
          <li className="list-inside list-disc">Optimism</li>
          <li className="list-inside list-disc">Base</li>
          <li className="list-inside list-disc">Mode</li>
        </ul>

        <div className="absolute bottom-6 left-0 space-y-4">
          <div className="flex w-fit -translate-x-7 gap-2">
            <div className="flex w-fit flex-shrink-0 gap-2 rounded-full border border-[#DFFE00] bg-white px-2.5 py-1.5">
              <Image
                src="/tokens/mode-logo.svg"
                alt="Valerium Logo"
                width={24}
                height={24}
              />
              <p className="font-medium">MODE</p>
            </div>
            <div className="flex w-fit flex-shrink-0 gap-2 rounded-full border border-[#FF0420] bg-white px-2.5 py-1.5">
              <Image
                src="/tokens/optimism-logo.svg"
                alt="Valerium Logo"
                width={24}
                height={24}
              />
              <p className="font-medium">OPTIMISM</p>
            </div>
            <div className="flex w-fit flex-shrink-0 gap-2 rounded-full border border-[#0153FF] bg-white px-2.5 py-1.5">
              <Image
                src="/tokens/base-logo.svg"
                alt="Valerium Logo"
                width={24}
                height={24}
              />
              <p className="font-medium">BASE</p>
            </div>
            <div className="flex w-fit flex-shrink-0 gap-2 rounded-full border border-[#DFFE00] bg-white px-2.5 py-1.5">
              <Image
                src="/tokens/mode-logo.svg"
                alt="Valerium Logo"
                width={24}
                height={24}
              />
              <p className="font-medium">MODE</p>
            </div>
          </div>

          <div className="flex w-fit gap-2">
            <div className="flex w-fit flex-shrink-0 gap-2 rounded-full border border-[#0153FF] bg-white px-2.5 py-1.5">
              <Image
                src="/tokens/base-logo.svg"
                alt="Valerium Logo"
                width={24}
                height={24}
              />
              <p className="font-medium">BASE</p>
            </div>
            <div className="flex w-fit flex-shrink-0 gap-2 rounded-full border border-[#DFFE00] bg-white px-2.5 py-1.5">
              <Image
                src="/tokens/mode-logo.svg"
                alt="Valerium Logo"
                width={24}
                height={24}
              />
              <p className="font-medium">MODE</p>
            </div>
            <div className="flex w-fit flex-shrink-0 gap-2 rounded-full border border-[#FF0420] bg-white px-2.5 py-1.5">
              <Image
                src="/tokens/optimism-logo.svg"
                alt="Valerium Logo"
                width={24}
                height={24}
              />
              <p className="font-medium">OPTIMISM</p>
            </div>
            <div className="flex w-fit flex-shrink-0 gap-2 rounded-full border border-[#0153FF] bg-white px-2.5 py-1.5">
              <Image
                src="/tokens/base-logo.svg"
                alt="Valerium Logo"
                width={24}
                height={24}
              />
              <p className="font-medium">BASE</p>
            </div>
          </div>

          <div className="flex w-fit -translate-x-10 gap-2">
            <div className="flex w-fit flex-shrink-0 gap-2 rounded-full border border-[#FF0420] bg-white px-2.5 py-1.5">
              <Image
                src="/tokens/optimism-logo.svg"
                alt="Valerium Logo"
                width={24}
                height={24}
              />
              <p className="font-medium">OPTIMISM</p>
            </div>
            <div className="flex w-fit flex-shrink-0 gap-2 rounded-full border border-[#0153FF] bg-white px-2.5 py-1.5">
              <Image
                src="/tokens/base-logo.svg"
                alt="Valerium Logo"
                width={24}
                height={24}
              />
              <p className="font-medium">BASE</p>
            </div>
            <div className="flex w-fit flex-shrink-0 gap-2 rounded-full border border-[#DFFE00] bg-white px-2.5 py-1.5">
              <Image
                src="/tokens/mode-logo.svg"
                alt="Valerium Logo"
                width={24}
                height={24}
              />
              <p className="font-medium">MODE</p>
            </div>
            <div className="flex w-fit flex-shrink-0 gap-2 rounded-full border border-[#FF0420] bg-white px-2.5 py-1.5">
              <Image
                src="/tokens/optimism-logo.svg"
                alt="Valerium Logo"
                width={24}
                height={24}
              />
              <p className="font-medium">OPTIMISM</p>
            </div>
          </div>
        </div>
      </div>

      <div
        className="relative col-span-4 row-span-4 rounded-xl border-[3px] border-white p-10 shadow-lg"
        style={{
          // background:
          //   "linear-gradient(180deg, rgba(233, 233, 233, 0.85) 0%, rgba(216, 216, 216, 0.85) 100.4%)",
          background: "linear-gradient(95deg, #c51ccb40 0%, #c4182c40 100%)",
        }}
      >
        <h3 className="mb-2 font-gloock text-4xl font-bold">More Chains</h3>

        <Tags label="Coming soon" position="absolute bottom-5 left-5 " />
      </div>

      <div
        className="col-span-6 row-span-4 rounded-xl border-[3px] border-white p-10 shadow-lg"
        style={{
          // background:
          //   "linear-gradient(180deg, rgba(233, 233, 233, 0.85) 0%, rgba(216, 216, 216, 0.85) 100.4%)",
          background: "linear-gradient(95deg, #c51ccb40 0%, #c4182c40 100%)",
        }}
      ></div>
      <div
        className="col-span-2 row-span-2 rounded-xl border-[3px] border-white p-10 shadow-lg"
        style={{
          // background:
          //   "linear-gradient(180deg, rgba(233, 233, 233, 0.85) 0%, rgba(216, 216, 216, 0.85) 100.4%)",
          background: "linear-gradient(95deg, #c51ccb40 0%, #c4182c40 100%)",
        }}
      ></div>
      <div
        className="col-span-6 row-span-2 rounded-xl border-[3px] border-white p-10 shadow-lg"
        style={{
          // background:
          //   "linear-gradient(180deg, rgba(233, 233, 233, 0.85) 0%, rgba(216, 216, 216, 0.85) 100.4%)",
          background: "linear-gradient(95deg, #c51ccb40 0%, #c4182c40 100%)",
        }}
      ></div>
    </section>
  );
};

export default Bento;
