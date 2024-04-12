"use client";

import {
  setDrawerChain,
  setTokenIndex,
  toggleTokenDrawer,
} from "@/redux/slice/selectorSlice";
import { Button } from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Image from "next/image";

export default function TokenButton({
  width = null,
  id,
  label,
  required,
  span,
  disabled,
  value,
  index = 0,
  chainId,
  style = "block",
}) {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.selector.token);

  return (
    <>
      <div
        className={"3xl:space-y-2 h-fit space-y-1.5 " + style}
        style={width && { flex: width }}
      >
        <label
          htmlFor={id}
          className="prevent-select flex items-center gap-2 text-nowrap text-base text-text-gray"
        >
          <span className="font-medium">
            {label} {required && <span className="text-red-500">*</span>}
          </span>

          <span className="text-xs text-text-gray">{span}</span>
        </label>

        <Button
          id={id}
          onClick={() => {
            dispatch(setDrawerChain(chainId));
            dispatch(toggleTokenDrawer());
            dispatch(setTokenIndex(index));
          }}
          disabled={disabled}
          className="w-full max-w-48 overflow-hidden rounded-full border border-border-light bg-white px-5 py-3.5 text-left font-noto text-base normal-case text-gray-600 shadow-none"
        >
          {token[index] ? (
            <div>
              <div className="flex items-center gap-2">
                <Image
                  src={`/tokens/${token[index].logo}`}
                  alt={token[index].name + " logo"}
                  width={14}
                  height={14}
                  className="rounded-full"
                />
                <p>{token[index].name}</p>
              </div>
            </div>
          ) : (
            value
          )}
        </Button>
      </div>
    </>
  );
}
