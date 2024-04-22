import Image from "next/image";
import Link from "next/link";

const Social = () => {
  return (
    <nav className="social">
      <ul className="flex flex-col gap-4">
        <li className="w-fit rounded-full bg-black p-2.5">
          <Link
            href="https://twitter.com/Valerium_Wallet"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/social/twitter.svg"
              alt="Twitter"
              width={22}
              height={22}
            />
          </Link>
        </li>

        <li className="w-fit rounded-full bg-black p-2.5">
          <Link href="#">
            <Image
              src="/social/discord.svg"
              alt="Discord"
              width={22}
              height={22}
            />
          </Link>
        </li>

        <li className="w-fit rounded-full bg-black p-2.5">
          <Link href="#">
            <Image
              src="/social/telegram.svg"
              alt="Telegram"
              width={22}
              height={22}
            />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Social;
