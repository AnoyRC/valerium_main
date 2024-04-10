"use client";

import { useRouter } from "next/navigation";

export default function SignupFooter() {
  const router = useRouter();
  return (
    <p className="mt-3 font-noto text-xs text-gray-600">
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
