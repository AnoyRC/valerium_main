import Image from "next/image";

export default function Mentions() {
  return (
    <div className=" my-10 mx-10 flex 2xl:flex-row flex-col justify-between items-center">
      <div className="flex flex-col 2xl:ml-20">
        <div className="text-lg font-noto flex-col">
          <p>As Seen in</p>
          <div className="flex gap-20 mt-5 items-center">
            <div className="flex flex-col items-center gap-2">
              <Image
                src="/home/ETHIndia.png"
                alt="ETHIndia"
                width={200}
                height={100}
              />
              <div className="flex flex-col items-center text-center text-white bg-gradient-primary-light-radial text-xs w-fit rounded-full px-2 py-1">
                Track Winner
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="flex flex-col">
                <p className="text-xs">ETH Global's</p>
                <p className="text-5xl font-bold text-purple-300">LFGHO</p>
              </div>
              <div className="flex flex-col items-center text-center text-white bg-gradient-primary-light-radial text-xs w-fit rounded-full px-2 py-1">
                Track Winner
              </div>
            </div>
            <div className="flex flex-col ml-5 gap-2 items-center -mt-7">
              <div className="flex flex-col items-center justify-center">
                <Image
                  src="/home/encode.png"
                  alt="Encode Club"
                  width={100}
                  height={100}
                />
                <p className="text-xs -mt-6 text-center">Gasless Hackathon</p>
              </div>
              <div className="flex flex-col text-center items-center text-white bg-gradient-primary-light-radial text-xs w-fit rounded-full px-2 py-1">
                #1 Winner
              </div>
            </div>
          </div>
        </div>

        <div className="text-lg font-noto flex-col mt-16">
          <p>Partners</p>
          <div className="flex gap-20 mt-5 items-center">
            <Image
              src="/home/unblock.svg"
              alt="Unblock"
              width={200}
              height={100}
            />
            <Image
              src="/home/keycard.svg"
              alt="keycard"
              width={200}
              height={100}
            />
            <Image
              src="/home/DAO.svg"
              alt="dao"
              width={200}
              height={100}
              className="mt-6"
            />
          </div>
        </div>

        <div className="text-lg font-noto flex-col mt-16">
          <p>Powered by</p>
          <div className="flex gap-20 mt-5 items-center">
            <Image src="/home/noir.svg" alt="Noir" width={150} height={100} />
            <Image
              src="/home/op-super.svg"
              alt="SuperChain"
              width={200}
              height={100}
              className="mt-1"
            />
            <Image
              src="/home/magic.svg"
              alt="Magic"
              width={150}
              height={100}
              className=""
            />
          </div>
        </div>
      </div>
      <Image
        src="/home/Val3d.png"
        alt="mentions"
        width={700}
        height={400}
        className="transform scale-110 "
      />
    </div>
  );
}
