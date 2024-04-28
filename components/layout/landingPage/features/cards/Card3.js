import Image from "next/image";

export default function Card3() {
  return (
    <div className="bg-pink-200 relative overflow-hidden shadow-lg rounded-3xl w-full h-full flex flex-col p-8">
      <div className="text-5xl font-bold font-noto">Powered by ZK Snarks</div>
      <div className="text-lg mt-4 font-noto">
        Noir is used to power transactions using ZK Snarks.
      </div>

      <div className="mt-4">
        <div className="text-2xl font-bold font-noto">How it works</div>
        <div className="text-lg mt-3 font-noto">
          1. Owner generates a proof for the transaction.
        </div>
        <div className="text-lg mt-2 font-noto">
          2. The proof is verified by the wallet using Verifier contract.
        </div>
        <div className="text-lg mt-2 font-noto">
          3. The transaction is executed without revealing any information.
        </div>
      </div>

      <Image
        src="/home/security.png"
        alt="Gas Credits"
        width={900}
        height={400}
        className="absolute -bottom-16 -right-64 "
      />
    </div>
  );
}
