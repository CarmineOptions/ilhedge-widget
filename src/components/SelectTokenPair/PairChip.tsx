import { CSSProperties } from "react";
import { TokenPair, Token } from "../../constants";

type PairChipProps = {
  pair: TokenPair;
};

const CoinLogo = ({ token }: { token: Token }) => {
  const imgStyle: CSSProperties = {
    height: "20px",
  };
  return <img style={imgStyle} src={token.logo} alt={`${token.symbol} logo`} />;
};

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
