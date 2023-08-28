const PRECISSION = 1_000_000_000;

export const convertBaseSize = (n: bigint, decimals: number): number => {
  const divisor = BigInt(10 ** decimals);
  return Number((n * BigInt(PRECISSION)) / divisor) / PRECISSION;
};

export const baseFromConvertedSize = (n: number, digits: number): bigint => {
  if (!n) {
    return BigInt(0);
  }
  const str = n.toString(10);
  const nonScientificNotation = str.includes("e")
    ? Number(str).toFixed(50)
    : str;
  const [lead, dec] = nonScientificNotation.split(".");

  if (!dec) {
    return BigInt(lead + "".padEnd(digits, "0"));
  }

  const tail = dec
    .padEnd(digits, "0") // pad ending with 0s
    .substring(0, digits); // if more digits than should be, cut them out

  const withLeadingZeros = lead + tail;
  const leadingZeros = withLeadingZeros.match(/^0*([0-9]+)/);

  return leadingZeros && leadingZeros?.length > 1
    ? BigInt(leadingZeros[1])
    : BigInt(0);
};

export const hashEllision = (hash: string): string => {
  return `${hash.substring(0, 7)}...${hash.substring(hash.length - 5)}`;
};
