"use client";

import { ethers } from "ethers";
import QRCodeGenerator from "@/components/ui/QrCodeGenerator";
import { useSelector } from "react-redux";

const QRcode = () => {
  const walletAddresses = useSelector((state) => state.user.walletAddresses);
  const currentChain = useSelector((state) => state.chain.currentChain);

  const address =
    walletAddresses &&
    walletAddresses.find((address) => address.chainId === currentChain.chainId);
  return (
    address &&
    address.address !== ethers.constants.AddressZero && (
      <div className="rounded-xl border border-border-light bg-white p-5 shadow">
        <QRCodeGenerator value={address.address} />
      </div>
    )
  );
};

export default QRcode;
