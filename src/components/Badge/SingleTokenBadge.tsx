import { CSSProperties } from "react";
import { TokenPair, Token } from "../../constants";

type PairChipProps = {
  pair: TokenPair;
};

const CoinLogo = ({ token }: { token: Token }) => (
  <img
    style={{ height: "20px" }}
    src={token.logo}
    alt={`${token.symbol} logo`}
  />
);

export const PairChip = ({ pair }: PairChipProps) => {
  const style: CSSProperties = {
    height: "20px",
    padding: "18px",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
  };

  return (
    <div style={style}>
      <CoinLogo token={pair.base} />
      {pair.base.symbol} / {pair.quote.symbol}
      <CoinLogo token={pair.quote} />
    </div>
  );
};

type Props = {
  token: Token;
  reverse?: boolean;
};

export const SingleTokenBadge = ({ token, reverse }: Props) => {
  const style: CSSProperties = {
    height: "20px",
    padding: "10px",
    display: "inline-flex",
    flexFlow: reverse ? "row-reverse" : "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    gap: "10px",
    fontSize: "18px",
  };

  return (
    <div style={style}>
      <CoinLogo token={token} />
      <p>{token.symbol}</p>
    </div>
  );
};
