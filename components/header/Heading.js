"use client";

import { usePathname } from "next/navigation";

const Heading = () => {
  const pathname = usePathname();

  return (
    <h2 className="bg-gradient-primary-light text-2.5xl font-black gradient-text">
      {pathname.split("/")[1].substring(0, 1).toUpperCase() +
        pathname.split("/")[1].substring(1)}
    </h2>
  );
};

export default Heading;
