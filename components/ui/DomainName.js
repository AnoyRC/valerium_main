"use client";

import { useSearchParams } from "next/navigation";

const DomainName = () => {
  const searchParams = useSearchParams();
  const domainName = searchParams.get("domain");

  return (
    <h2 className="text-xl font-bold text-black">
      {domainName}

      <span className="bg-gradient-primary-light text-base font-medium gradient-text">
        .valerium.id
      </span>
    </h2>
  );
};

export default DomainName;
