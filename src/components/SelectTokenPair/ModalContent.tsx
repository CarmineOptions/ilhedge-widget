import { CSSProperties } from "react";
import { tokenPairs } from "../../constants";
import { useAccount } from "../../hooks/useAccount";
import { Header } from "../Header";
import { TokenPairOption } from "./Option";
import { closeTokenSelectModal } from "../../redux/actions";
import { useTheme } from "../../hooks/useTheme";

export const ModalContent = () => {
  const account = useAccount();
  const theme = useTheme();

  const containerStyle: CSSProperties = {
    display: "flex",
    flexFlow: "column",
    fontFamily: theme.fontFamily,
  };

  return (
    <div style={containerStyle}>
      <Header title="Select token pair" close={closeTokenSelectModal} />
      {tokenPairs.map((pair, i) => (
        <TokenPairOption
          type="token"
          account={account!}
          tokenPair={pair}
          key={i}
        />
      ))}
      <TokenPairOption type="text" text="More comming soon!" />
    </div>
  );
};
