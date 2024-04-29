import Image from "next/legacy/image";

import styles from "./card.module.css";

const CardDetails = ({ style }) => {
  return (
    <div
      className={`${styles.card} prevent-select w-[400px] rounded-3xl px-5 py-3 backdrop-blur-xl transition-all duration-500 lg:w-[450px] lg:p-6 ${style}`}
    >
      <div className="flex h-full flex-col justify-between gap-4 sm:gap-5 lg:gap-7">
        <div className="flex justify-between">
          <Image
            alt=""
            src="/home/sim-card.svg"
            width={40}
            height={40}
            className="md:h-11 md:w-11 lg:h-12 lg:w-12"
          />

          <div className="flex items-center rounded-lg bg-pink-100 p-1.5">
            <Image
              alt=""
              src="/valerium-logo.svg"
              width={32}
              height={32}
              className="md:h-11 md:w-16 lg:h-14 lg:w-20"
            />
          </div>
        </div>

        <p className="text-wrap break-words pr-20 text-left text-lg text-white lg:text-xl">
          0x25DeaaC57C89E2D634bb655ecd68390A33E504BB
        </p>

        <div className="flex justify-between text-white">
          <div>
            <span className="block text-sm opacity-50 lg:text-base">
              Valerium Card
            </span>
            <span className="text-lg lg:text-xl">val@valerium.id</span>
          </div>

          {/* <div>
            <span className="block text-sm opacity-50 lg:text-base">
              Your Name
            </span>{" "}
            <span className="text-lg lg:text-xl">Valerium</span>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default CardDetails;
