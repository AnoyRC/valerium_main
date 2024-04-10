"use client";

import { Noir } from "@noir-lang/noir_js";
import { BarretenbergBackend } from "@noir-lang/backend_barretenberg";
import { ethers } from "ethers";
import poseidon_hash from "@/lib/circuits/poseidon_hash";
import password_hash from "@/lib/circuits/password_hash";

export default function useCircuit() {
  const hashPassword = async (password) => {
    const backend = new BarretenbergBackend(password_hash, {
      threads: navigator.hardwareConcurrency,
    });

    const noir = new Noir(password_hash, backend);

    const input = {
      password: ethers.utils.hexlify(
        ethers.utils.ripemd160(ethers.utils.toUtf8Bytes(password)),
      ),
    };

    const output = await noir.execute(input);

    return output.returnValue;
  };

  const hashKey = async (key) => {
    const backend = new BarretenbergBackend(poseidon_hash, {
      threads: navigator.hardwareConcurrency,
    });

    const noir = new Noir(poseidon_hash, backend);

    const inputs = {
      input: Array.from(ethers.utils.arrayify(key)),
    };

    const output = await noir.execute(inputs);

    return output.returnValue;
  };

  return { hashPassword, hashKey };
}
