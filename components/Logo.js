import Link from "next/link";
import Image from "next/image";

const Logo = () => {
  return (
    <Link className="flex items-center gap-2.5" href="/">
      <div className=" rounded-md bg-black p-2">
        <Image
          src="/valerium-logo.svg"
          alt="Valerium Logo"
          width={24}
          height={24}
        />
      </div>

      <span className="hidden font-gloock text-xl tracking-wider sm:block">
        {" "}
        Valerium
      </span>
    </Link>
  );
};

export default Logo;
