import Link from "next/link";
import Image from "next/image";

const Logo = () => {
  return (
    <Link className="flex items-center gap-2.5" href="/dashboard">
      <div className=" bg-black p-2 rounded-md">
        <Image
          src="/valerium-logo.svg"
          alt="Valerium Logo"
          width={24}
          height={24}
        />
      </div>

      <span className="text-xl font-gloock tracking-wider"> Valerium</span>
    </Link>
  );
};

export default Logo;
