import Image from "next/image";

export default function Card1() {
  return (
    <div className="bg-red-100 relative overflow-hidden shadow-lg rounded-3xl w-full h-full flex flex-col p-8">
      <div className="text-5xl font-bold font-noto">Gas Credits</div>
      <div className="text-lg mt-4 font-noto">
        Pay for your transactions with gas credits in any supported network.
      </div>
      <div className="mt-4">
        <div className="text-2xl font-bold font-noto">How it works</div>
        <div className="text-lg mt-3 font-noto">
          1. Buy gas credits from the store.
        </div>
        <div className="text-lg mt-2 font-noto">
          2. Use your gas credits to pay for transactions.
        </div>
        <div className="text-lg mt-2 font-noto">
          3. Top up your gas credits when needed.
        </div>
      </div>

      <Image
        src="/home/token.png"
        alt="Gas Credits"
        width={800}
        height={400}
        className="absolute -bottom-16 -right-64 "
      />
    </div>
  );
}
