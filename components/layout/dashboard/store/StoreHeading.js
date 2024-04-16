import Image from "next/image";

const StoreHeading = () => {
  return (
    <div className="flex items-center gap-4">
      <div className="rounded-xl bg-black/90 p-5">
        <Image
          src="/valerium-gas-token.png"
          alt="Valerium Gas Token Logo"
          width={132}
          height={132}
        />
      </div>

      <div className="space-y-2">
        <h2 className="font-gloock text-2.5xl font-bold">
          Valerium Gas Credits
        </h2>

        <p className="text-base text-text-gray">
          Gas credits are digital tokens designed to facilitate cross-chain
          transactions within Valerium.
        </p>
      </div>
    </div>
  );
};

export default StoreHeading;
