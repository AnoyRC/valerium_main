"use client";

import { toast } from "sonner";
import { useSelector } from "react-redux";
import { ethers } from "ethers";

const ChainAddress = ({ style }) => {
  const walletAddresses = useSelector((state) => state.user.walletAddresses);
  const currentChain = useSelector((state) => state.chain.currentChain);

  const address =
    walletAddresses &&
    walletAddresses.find((address) => address.chainId === currentChain.chainId);

  const handleClick = () => {
    navigator.clipboard.writeText(address.address);
    toast.info("Address copied to clipboard");
  };

  return (
    address &&
    address.address !== ethers.constants.AddressZero && (
      <p className={style + " cursor-pointer"} onClick={handleClick}>
        {address.address}
      </p>
    )
  );
};

export default ChainAddress;
