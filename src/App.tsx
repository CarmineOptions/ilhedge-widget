import { useState } from "react";
import { ILHedgeWidget } from "./components/Widget";
import { AccountInterface } from "starknet";
import { connect } from "get-starknet";
import { Button } from "./components/Styled";
import { Chip } from "./components/ConnectWallet";

function App() {
  const [account, setAccount] = useState<AccountInterface | undefined>();

  const handleConnect = () => {
    connect({ modalMode: "alwaysAsk" }).then((res) => {
      if (res) {
        setAccount(res.account);
      }
    });
  };

  const handleClick = () =>
    window.dispatchEvent(new Event("CARMINE_ILHEDGE_OPEN"));

  return (
    <div>
      <header>
        {account ? (
          <Chip address={account.address} />
        ) : (
          <Button onClick={handleConnect}>Connect Wallet</Button>
        )}
      </header>
      <div style={{ margin: "50px" }}>
        <h1 style={{ textAlign: "center" }}>Dev Page</h1>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button onClick={handleClick}>Open ILHedge Widget</Button>
        </div>
        <ILHedgeWidget account={account} parent={"#root"} />
      </div>
    </div>
  );
}

export default App;
