import Image from "next/image";

const GasTokenImage = ({ price }) => {
  return (
    <div className="flex h-40 w-40 items-end justify-center gap-4 rounded-xl bg-black/90 p-5">
      <span className="font-gloock text-8xl text-white">{price}</span>

      <div className="flex w-fit flex-col items-center">
        <Image
          src="/valerium-gas-token.png"
          alt="Valerium Gas Token Logo"
          width={48}
          height={48}
        />

        <span className="text-5xl font-bold text-white">x</span>
      </div>
    </div>
  );
};

export default GasTokenImage;
