import Image from "next/image";

const ActionNote = ({ chainName, style }) => {
  return (
    <div className="text-sm flex items-center">
      <span className="text-black font-bold mr-1.5">Note:</span>

      <p>
        Sending <span className="font-bold">{chainName}</span> on
      </p>

      <p className="flex items-center ml-1 gap-0.5">
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
