import Image from "next/image";

const Anywhere = () => {
  return (
    <section
      className="sha rounded-t-[80px] pt-16"
      style={{
        background:
          "radial-gradient(1067.57% 100.06% at 0% 49.75%, rgba(196, 28, 203, 0.40) 0%, rgba(196, 24, 45, 0.40) 60.4%, rgba(196, 28, 203, 0.40) 100%)",
        boxShadow: "0px -8px 16px 0px rgba(0, 0, 0, 0.25)",
      }}
    >
      <div className="mx-auto space-y-6 text-center">
        <h2 className="text-7xl font-semibold font-noto text-black">
          Valerium Coming <br /> Soon Everywhere
        </h2>

        <p className="text-base font-noto">
          Access your wallet anywhere without compromising on security with our
          ZK-based seedless and <br /> permissionless interface.
        </p>
      </div>

      <div className="mx-auto mb-20 mt-16 flex w-fit gap-20">
        <Image
          src="/home/app-store.svg"
          alt="App Store"
          width={200}
          height={60}
        />

        <Image
          src="/home/play-store.svg"
          alt="App Store"
          width={200}
          height={60}
        />
      </div>

      <div className="mx-auto w-9/12">
        <Image
          src="/home/valerium-desktop-mobile.png"
          alt="Anywhere"
          width={1120}
          height={426}
          layout="responsive"
        />
      </div>
    </section>
  );
};

export default Anywhere;
