import { Button } from "../Styled";
import { useAccount } from "../../hooks/useAccount";
import { connectWallet } from "../../redux/actions";
import { Chip } from "./Chip";

export const ConnectWallet = () => {
  const account = useAccount();

  return (
    <div>
      {account ? (
        <Chip address={account.address} />
      ) : (
        <Button onClick={connectWallet}>Connect</Button>
      )}
    </div>
  );
};

export { Chip };
