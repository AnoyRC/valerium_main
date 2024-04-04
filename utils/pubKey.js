function compressEthAddress(address, prefixCount, suffixCount) {
  if (!address) {
    throw new Error("Address is required");
  }

  const prefix = address.slice(0, prefixCount);
  const suffix = address.slice(-suffixCount);

  return `${prefix}...${suffix}`;
}

export { compressEthAddress };
