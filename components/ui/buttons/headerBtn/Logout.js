"use client";

import { Power } from "lucide-react";
import { Button } from "@material-tailwind/react";

import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import {
  setTokenBalanceData,
  setTokenConversionData,
  setWalletAddresses,
} from "@/redux/slice/UserSlice";
import baseChain from "@/lib/baseChain";
import { setCurrentChain } from "@/redux/slice/chainSlice";

const Logout = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogoutClick = () => {
    dispatch(setWalletAddresses(null));
    dispatch(setTokenBalanceData(null));
    dispatch(setTokenConversionData(null));
    dispatch(setCurrentChain(baseChain));
    router.push("/login");
  };

  return (
    <li>
      <Button
        className="flex items-center gap-3 rounded-full border border-red-500 bg-gradient-light-linear/85 px-4 py-2 font-noto font-bold"
        onClick={handleLogoutClick}
        color="white"
      >
        <Power size={24} className="text-red-500" />
      </Button>
    </li>
  );
};
export default Logout;
