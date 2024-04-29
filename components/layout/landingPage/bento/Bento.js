"use client";

import Image from "next/image";
import CardContainer from "./card/Card";

import Tags from "@/components/ui/Tags";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";

const Bento = () => {
  const container = useRef();

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    const chains = gsap.utils.toArray(".chains");

    chains.forEach((chain, index) => {
      gsap.to(chain, {
        x: index % 2 === 0 ? 25 : -80,
        scrollTrigger: {
          trigger: container.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });
  }, []);

  return (
    <section className="mx-auto mb-16 grid max-w-7xl grid-cols-12 grid-rows-12 gap-5">
      <div
        className="col relative col-span-8 row-span-8 overflow-hidden rounded-xl border-[3px] border-white p-10 shadow-lg"
        style={{
          // background:
          //   "linear-gradient(180deg, rgba(233, 233, 233, 0.85) 0%, rgba(216, 216, 216, 0.85) 100.4%)",
          background: "linear-gradient(95deg, #c51ccb40 0%, #c4182c40 100%)",
        }}
      >
        <h3 className="mb-2 font-gloock text-4xl font-bold">
          Valerium Keycard
        </h3>
        <p className="text-base text-text-gray">
          Take your Valerium Keycard with you Anywhere you go.
        </p>

        <CardContainer />

        <Tags label="Coming soon" position="absolute bottom-5 left-10 " />
      </div>

      <div
        className="relative col-span-4 row-span-6 overflow-hidden rounded-xl border-[3px] border-white p-10 shadow-lg"
        style={{
          // background:
          //   "linear-gradient(180deg, rgba(233, 233, 233, 0.85) 0%, rgba(216, 216, 216, 0.85) 100.4%)",
          background: "linear-gradient(95deg, #c51ccb40 0%, #c4182c40 100%)",
        }}
        ref={container}
      >
        <h3 className="mb-2 font-gloock text-4xl font-bold">
          Chains Supported
        </h3>
        <p className="text-base text-text-gray">
          Supported chains for Valerium Wallet.
        </p>

        <ul className="mt-4 text-base">
          <li className="list-inside list-disc">Optimism</li>
          <li className="list-inside list-disc">Base</li>
          <li className="list-inside list-disc">Mode</li>
        </ul>

        <div className="absolute bottom-6 left-0 space-y-4">
          <div className="flex w-fit -translate-x-96 gap-2 chains">
            <div className="flex w-fit flex-shrink-0 gap-2 rounded-full border border-[#0153FF] bg-white px-2.5 py-1.5">
              <Image
                src="/tokens/base-logo.svg"
                alt="Valerium Logo"
                width={24}
                height={24}
              />
              <p className="font-medium">BASE</p>
            </div>
            <div className="flex w-fit flex-shrink-0 gap-2 rounded-full border border-[#DFFE00] bg-white px-2.5 py-1.5">
              <Image
                src="/tokens/mode-logo.svg"
                alt="Valerium Logo"
                width={24}
                height={24}
              />
              <p className="font-medium">MODE</p>
            </div>
            <div className="flex w-fit flex-shrink-0 gap-2 rounded-full border border-[#FF0420] bg-white px-2.5 py-1.5">
              <Image
                src="/tokens/optimism-logo.svg"
                alt="Valerium Logo"
                width={24}
                height={24}
              />
              <p className="font-medium">OPTIMISM</p>
            </div>
            <div className="flex w-fit flex-shrink-0 gap-2 rounded-full border border-[#0153FF] bg-white px-2.5 py-1.5">
              <Image
                src="/tokens/base-logo.svg"
                alt="Valerium Logo"
                width={24}
                height={24}
              />
              <p className="font-medium">BASE</p>
            </div>
            <div className="flex w-fit flex-shrink-0 gap-2 rounded-full border border-[#DFFE00] bg-white px-2.5 py-1.5">
              <Image
                src="/tokens/mode-logo.svg"
                alt="Valerium Logo"
                width={24}
                height={24}
              />
              <p className="font-medium">MODE</p>
            </div>
            <div className="flex w-fit flex-shrink-0 gap-2 rounded-full border border-[#FF0420] bg-white px-2.5 py-1.5">
              <Image
                src="/tokens/optimism-logo.svg"
                alt="Valerium Logo"
                width={24}
                height={24}
              />
              <p className="font-medium">OPTIMISM</p>
            </div>
          </div>

          <div className="flex w-fit gap-2 chains">
            <div className="flex w-fit flex-shrink-0 gap-2 rounded-full border border-[#0153FF] bg-white px-2.5 py-1.5">
              <Image
                src="/tokens/base-logo.svg"
                alt="Valerium Logo"
                width={24}
                height={24}
              />
              <p className="font-medium">BASE</p>
            </div>
            <div className="flex w-fit flex-shrink-0 gap-2 rounded-full border border-[#DFFE00] bg-white px-2.5 py-1.5">
              <Image
                src="/tokens/mode-logo.svg"
                alt="Valerium Logo"
                width={24}
                height={24}
              />
              <p className="font-medium">MODE</p>
            </div>
            <div className="flex w-fit flex-shrink-0 gap-2 rounded-full border border-[#FF0420] bg-white px-2.5 py-1.5">
              <Image
                src="/tokens/optimism-logo.svg"
                alt="Valerium Logo"
                width={24}
                height={24}
              />
              <p className="font-medium">OPTIMISM</p>
            </div>
            <div className="flex w-fit flex-shrink-0 gap-2 rounded-full border border-[#0153FF] bg-white px-2.5 py-1.5">
              <Image
                src="/tokens/base-logo.svg"
                alt="Valerium Logo"
                width={24}
                height={24}
              />
              <p className="font-medium">BASE</p>
            </div>
            <div className="flex w-fit flex-shrink-0 gap-2 rounded-full border border-[#DFFE00] bg-white px-2.5 py-1.5">
              <Image
                src="/tokens/mode-logo.svg"
                alt="Valerium Logo"
                width={24}
                height={24}
              />
              <p className="font-medium">MODE</p>
            </div>
          </div>

          <div className="flex w-fit -translate-x-64 gap-2 chains">
            <div className="flex w-fit flex-shrink-0 gap-2 rounded-full border border-[#DFFE00] bg-white px-2.5 py-1.5">
              <Image
                src="/tokens/mode-logo.svg"
                alt="Valerium Logo"
                width={24}
                height={24}
              />
              <p className="font-medium">MODE</p>
            </div>
            <div className="flex w-fit flex-shrink-0 gap-2 rounded-full border border-[#FF0420] bg-white px-2.5 py-1.5">
              <Image
                src="/tokens/optimism-logo.svg"
                alt="Valerium Logo"
                width={24}
                height={24}
              />
              <p className="font-medium">OPTIMISM</p>
            </div>
            <div className="flex w-fit flex-shrink-0 gap-2 rounded-full border border-[#0153FF] bg-white px-2.5 py-1.5">
              <Image
                src="/tokens/base-logo.svg"
                alt="Valerium Logo"
                width={24}
                height={24}
              />
              <p className="font-medium">BASE</p>
            </div>
            <div className="flex w-fit flex-shrink-0 gap-2 rounded-full border border-[#DFFE00] bg-white px-2.5 py-1.5">
              <Image
                src="/tokens/mode-logo.svg"
                alt="Valerium Logo"
                width={24}
                height={24}
              />
              <p className="font-medium">MODE</p>
            </div>

            <div className="flex w-fit flex-shrink-0 gap-2 rounded-full border border-[#FF0420] bg-white px-2.5 py-1.5">
              <Image
                src="/tokens/optimism-logo.svg"
                alt="Valerium Logo"
                width={24}
                height={24}
              />
              <p className="font-medium">OPTIMISM</p>
            </div>
          </div>
        </div>
      </div>

      <div
        className="relative col-span-4 row-span-4 rounded-xl border-[3px] border-white p-10 shadow-lg"
        style={{
          // background:
          //   "linear-gradient(180deg, rgba(233, 233, 233, 0.85) 0%, rgba(216, 216, 216, 0.85) 100.4%)",
          background: "linear-gradient(95deg, #c51ccb40 0%, #c4182c40 100%)",
        }}
      >
        <h3 className="mb-2 font-gloock text-4xl font-bold">More Chains</h3>

        <p>More chains will be added to the Valerium Wallet in the future. </p>

        <div className="mt-2 flex">
          <div className="h-12 w-12 overflow-hidden flex items-center justify-center rounded-full border bg-black border-white">
            <Image
              src="/tokens/ancient8-logo.png"
              alt="Valerium Logo"
              width={30}
              height={48}
            />
          </div>

          <div className="h-12 w-12 -translate-x-2 rounded-full border border-black">
            <Image
              src="/tokens/fraxscan-logo.svg"
              alt="Valerium Logo"
              width={48}
              height={48}
            />
          </div>

          <div className="h-12 w-12 -translate-x-4 rounded-full border border-black">
            <Image
              src="/tokens/zora-logo.png"
              alt="Valerium Logo"
              width={48}
              height={48}
            />
          </div>

          <div className="flex h-12 w-12 -translate-x-6 items-center justify-center rounded-full border border-black bg-white">
            <Image
              src="/tokens/lisk-logo.png"
              alt="Valerium Logo"
              width={28}
              height={28}
            />
          </div>
        </div>

        <Tags label="Coming soon" position="absolute bottom-5 left-10 " />
      </div>

      <div
        className="relative col-span-6 row-span-4 rounded-xl border-[3px] border-white p-10 shadow-lg"
        style={{
          // background:
          //   "linear-gradient(180deg, rgba(233, 233, 233, 0.85) 0%, rgba(216, 216, 216, 0.85) 100.4%)",
          background: "linear-gradient(95deg, #c51ccb40 0%, #c4182c40 100%)",
        }}
      >
        <h3 className="mb-2 font-gloock text-4xl font-bold">
          Built-in On-Chain bank accounts
        </h3>

        <p className="text-base text-text-gray">
          Create and manage your bank accounts on-chain.
        </p>

        <Image
          src="/home/money.png"
          alt=""
          width={400}
          height={400}
          className="absolute bottom-5 right-0 translate-x-24"
        />

        <Tags label="Coming soon" position="absolute bottom-5 left-10 " />
      </div>

      <div
        className="col-span-2 row-span-2 flex flex-col justify-center  rounded-xl border-[3px] border-white p-5 px-7 font-gloock shadow-lg"
        style={{
          // background:
          //   "linear-gradient(180deg, rgba(233, 233, 233, 0.85) 0%, rgba(216, 216, 216, 0.85) 100.4%)",
          background: "linear-gradient(95deg, #c51ccb40 0%, #c4182c40 100%)",
        }}
      >
        <div className="flex justify-between">
          <div>
            <h3 className="text-xl font-bold">Made</h3>
            <p className="font-noto">With love</p>
          </div>
          <Image
            src="/home/heart.png"
            alt="Valerium Logo"
            width={50}
            height={80}
            className=" animate-pulse"
          />
        </div>
      </div>

      <div
        className="relative col-span-6 row-span-2 rounded-xl border-[3px] border-white p-10 py-7 shadow-lg"
        style={{
          // background:
          //   "linear-gradient(180deg, rgba(233, 233, 233, 0.85) 0%, rgba(216, 216, 216, 0.85) 100.4%)",
          background: "linear-gradient(95deg, #c51ccb40 0%, #c4182c40 100%)",
        }}
      >
        <h3 className="mb-2 font-gloock text-4xl font-bold">
          Multi-chain Domain
        </h3>

        <p>
          Your domains are stored on-chain and in every chain that you deploy.
        </p>
      </div>
    </section>
  );
};

export default Bento;
