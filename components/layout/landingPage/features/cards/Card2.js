import Image from "next/image";

export default function Card2() {
  return (
    <div className="bg-pink-100 relative overflow-hidden shadow-lg rounded-3xl w-full h-full flex flex-col p-8">
      <div className="text-5xl font-bold font-noto">
        Built-in On-Chain bank accounts
      </div>
      <div className="text-lg mt-4 font-noto">
        Create and manage your bank accounts on-chain.
      </div>

      <div className="mt-4 border-black border-[2px] w-36 p-2 flex items-center justify-center rounded-full font-noto">
        COMING SOON
      </div>

      <Image
        src="/home/money.png"
        alt="Gas Credits"
        width={900}
        height={400}
        className="absolute -bottom-16 -right-64 "
      />
    </div>
  );
}
