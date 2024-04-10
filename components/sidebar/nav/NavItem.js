"use client"

import Link from "next/link";
import { useSearchParams } from "next/navigation";

const NavItem = ({ children, label, href, size }) => {
  const searchParams = useSearchParams();

  return (
    <li>
      <Link
        className="flex cursor-pointer items-center"
        href={`${href}?domain=${searchParams.get("domain")}`}
        style={{ fontSize: size === "sm" ? "14px" : "16px" }}
      >
        {children} <span className="ml-2">{label}</span>
      </Link>
    </li>
  );
};

export default NavItem;
