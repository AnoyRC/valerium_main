"use client";

import { useSearchParams } from "next/navigation";

const DomainName = ({ usernameSize, domainSize }) => {
  const searchParams = useSearchParams();
  const domainName = searchParams.get("domain");

  return (
    <h2
      className="font-bold text-black"
      style={{
        fontSize: usernameSize,
      }}
    >
      {domainName}

      <span
        className="bg-gradient-primary-light font-medium gradient-text"
        style={{
          fontSize: domainSize,
        }}
      >
        .valerium.id
      </span>
    </h2>
  );
};

export default DomainName;
