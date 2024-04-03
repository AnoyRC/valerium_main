"use client";

import { useRouter } from "next/navigation";

export default function SignupFooter() {
  const router = useRouter();
  return (
    <p className="font-noto text-xs text-gray-600 mt-3">
      Already have an account?{" "}
      <span
        className="text-highlight-pink hover:cursor-pointer"
        onClick={() => router.push("/login")}
      >
        Login
      </span>
    </p>
  );
}
