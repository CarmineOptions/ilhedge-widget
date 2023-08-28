import { useAccount } from "../../hooks/useAccount";
import { useTokenPair } from "../../hooks/useTokenPair";
import {
  connectWallet,
  fetchPrice,
  openTokenSelectModal,
} from "../../redux/actions";
import { CSSProperties } from "react";
import { hedge } from "../../blockchain";
import { useTheme } from "../../hooks/useTheme";
import { useNotionalValue } from "../../hooks/useNotionalValue";
import { usePrice } from "../../hooks/usePrice";
import { useBalance } from "../../hooks/useBalance";
import { useNeedNewQuote } from "../../hooks/useNeedNewQuote";

export const ActionButton = () => {
  const account = useAccount();
  const pair = useTokenPair();
  const notional = useNotionalValue();
  const price = usePrice();
  const balance = useBalance();
  const needNewQuote = useNeedNewQuote();
  const theme = useTheme();

  const enoughBase =
    balance.base?.amount !== undefined &&
    price.amountBase !== undefined &&
    balance.base.amount > price.amountBase;

  const enoughQuote =
    balance.quote?.amount !== undefined &&
    price.amountQuote !== undefined &&
    balance.quote.amount > price.amountQuote;

  const style: CSSProperties = {
    margin: "20px 0",
    padding: "10px",
    background: theme.colors.background,
    border: "solid 2px",
    borderRadius: "10px",
    borderColor: theme.colors.main,
    color: theme.colors.main,
    cursor: "pointer",
    height: "56px",
    width: "100%",
  };

  const disabled: CSSProperties = {
    borderColor: "darkgray",
    color: "darkgray",
    cursor: "default",
  };

  const failed: CSSProperties = {
    borderColor: "red",
    color: "red",
  };

  return (
    <div>
      {!pair ? (
        <button style={style} onClick={openTokenSelectModal}>
          Select token pair
        </button>
      ) : !account ? (
        <button style={style} onClick={connectWallet}>
          Connect your wallet
        </button>
      ) : notional === 0 ? (
        <button
          style={{
            ...style,
            ...disabled,
          }}
          disabled={true}
        >
          Enter notional value
        </button>
      ) : price.error && !needNewQuote ? (
        <button style={{ ...style, ...failed }} onClick={fetchPrice}>
          Getting quote failed, retry
        </button>
      ) : (!price.fetching && price.amountBase === undefined) ||
        needNewQuote ? (
        <button style={style} onClick={fetchPrice}>
          Get quote
        </button>
      ) : price.fetching ? (
        <button style={{ ...style, ...disabled }} disabled={true}>
          Getting quote...
        </button>
      ) : enoughBase && enoughQuote ? (
        <button style={style} onClick={hedge}>
          Hedge
        </button>
      ) : (
        <button style={{ ...style, ...disabled }} disabled={true}>
          Not enought{" "}
          {!enoughBase && !enoughQuote
            ? `${pair.base.symbol} and ${pair.quote.symbol}`
            : !enoughBase
            ? `${pair.base.symbol}`
            : `${pair.quote.symbol}`}
        </button>
      )}
    </div>
  );
};
