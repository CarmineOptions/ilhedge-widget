import { AccountInterface } from "starknet";
import { TokenPairSelect } from "../SelectTokenPair";
import { NotionalValueInput } from "../NotionalValueInput";
import { useAccount } from "../../hooks/useAccount";
import { closeModal, setAccount } from "../../redux/actions";
import { Header } from "../Header";
import { ActionButton } from "../ActionButton";
import { BalanceDisplay } from "../BalanceDisplay";

type WidgetProps = {
  account?: AccountInterface;
};

export const Content = ({ account: propAccount }: WidgetProps) => {
  const account = useAccount();

  if (propAccount && !account) {
    setAccount(propAccount);
  }

  return (
    <div
      style={{
        display: "flex",
        flexFlow: "column",
        fontFamily: '"DM Sans", sans-serif',
      }}
    >
      <Header title="Impermanent Loss Hedging" close={closeModal} />
      <TokenPairSelect />
      <NotionalValueInput />
      <BalanceDisplay />
      <ActionButton />
    </div>
  );
};
