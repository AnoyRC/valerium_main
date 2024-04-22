"use client";

import { Navbar, Button } from "@material-tailwind/react";

import { useRouter } from "next/navigation";

import Logo from "@/components/Logo";

const NavBar = () => {
  const router = useRouter();

  const handleLaunchApp = () => {
    router.push("/login");
  };

  return (
    <Navbar className="sticky top-0 z-50 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4">
      <div className="flex items-center justify-between text-blue-gray-900">
        <Logo />

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-x-1">
            <Button
              size="sm"
              onClick={handleLaunchApp}
              className="rounded-full bg-gradient-primary-light lg:inline-block"
            >
              Launch App
            </Button>
          </div>
        </div>
      </div>
    </Navbar>
  );
};

export default NavBar;
