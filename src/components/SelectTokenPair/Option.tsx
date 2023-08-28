import { CSSProperties } from "react";
import { TokenPair } from "../../constants";
import {
  closeTokenSelectModal,
  fetchUserBalance,
  setTokenPair,
} from "../../redux/actions";
import { AccountInterface } from "starknet";
import { TokenPairBadge } from "../Badge";

interface TokenPairProps {
  type: "token";
  tokenPair: TokenPair;
  account: AccountInterface;
}

interface TextProps {
  type: "text";
  text: string;
}

type Props = TokenPairProps | TextProps;

const TokenOption = ({ tokenPair, account }: TokenPairProps) => {
  const style: CSSProperties = {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  const handleClick = () => {
    setTokenPair(tokenPair);
    if (tokenPair && account) {
      fetchUserBalance(account, tokenPair);
    }
    closeTokenSelectModal();
  };

  return (
    <div onClick={handleClick} style={style}>
      <TokenPairBadge pair={tokenPair} />
    </div>
  );
};

const TextOption = ({ text }: TextProps) => {
  const style: CSSProperties = {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "56px",
  };
  return <div style={style}>{text}</div>;
};

export const TokenPairOption = (props: Props) => {
  return (
    <div style={props.type === "token" ? { cursor: "pointer" } : {}}>
      {props.type === "text" ? (
        <TextOption type="text" text={props.text} />
      ) : (
        <TokenOption
          type="token"
          tokenPair={props.tokenPair}
          account={props.account}
        />
      )}
    </div>
  );
};
