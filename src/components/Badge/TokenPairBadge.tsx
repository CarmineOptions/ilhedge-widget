import { CSSProperties } from "react";
import { SingleTokenBadge } from ".";
import { TokenPair } from "../../constants";

type Props = {
  pair: TokenPair;
};

export const TokenPairBadge = ({ pair }: Props) => {
  const style: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
  };
  const slashStyle: CSSProperties = {
    fontSize: "20px",
  };
  return (
    <div style={style}>
      <SingleTokenBadge token={pair.base} />
      <span style={slashStyle}>/</span>
      <SingleTokenBadge token={pair.quote} reverse={true} />
    </div>
  );
};
