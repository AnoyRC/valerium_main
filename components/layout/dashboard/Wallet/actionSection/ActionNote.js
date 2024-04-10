import Image from "next/image";

const ActionNote = ({ chainName, style, token }) => {
  return (
    <div className="flex items-center text-sm">
      <span className="mr-1.5 font-bold text-black">Note:</span>

      <p>
        Sending <span className="font-bold">{token ? token.name : "ETH"}</span>{" "}
        on
      </p>

      <p className="ml-1 flex items-center gap-0.5">
        <Image
          src={`/tokens/${style.logo}`}
          width={24}
          height={24}
          alt={chainName ? chainName + " Logo" : "Chain Logo"}
        />

        <span
          className="font-bold uppercase"
          style={{
            color: style.colorLight,
          }}
        >
          {chainName}
        </span>
      </p>
    </div>
  );
};

export default ActionNote;
