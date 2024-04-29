import Image from "next/image";

export default function Card2() {
  return (
    <div className="bg-pink-100 relative overflow-hidden shadow-lg rounded-3xl w-full h-full flex flex-col p-8">
      <div className="text-5xl font-bold font-noto">Superchain Native</div>
      <div className="text-lg mt-4 font-noto">
        The Superchain is Built on the cutting-edge OP Stack codebase.
      </div>

      <div className="mt-4">
        <div className="text-2xl font-bold font-noto">Benefits</div>
        <div className="text-lg mt-3 font-noto">
          1. Combined power of Optimism and Ethereum.
        </div>
        <div className="text-lg mt-2 font-noto">
          2. Best-in-class infrastructure for DeFi.
        </div>
        <div className="text-lg mt-2 font-noto">
          3. Fast and secure transactions.
        </div>
      </div>

      <Image
        src="/tokens/optimism-logo.svg"
        alt="Gas Credits"
        width={400}
        height={400}
        className="absolute -bottom-20 right-10 "
      />
    </div>
  );
}
