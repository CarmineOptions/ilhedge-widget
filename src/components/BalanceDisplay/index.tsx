import { useAccount } from "../../hooks/useAccount";
import { useBalance } from "../../hooks/useBalance";
import { usePrice } from "../../hooks/usePrice";
import { useTokenPair } from "../../hooks/useTokenPair";
import { convertBaseSize } from "../../utils";

export const BalanceDisplay = () => {
  const account = useAccount();
  const pair = useTokenPair();
  const balance = useBalance();
  const price = usePrice();

  if (!pair || !account) {
    return null;
  }

  return (
    <table style={{ width: "100%" }}>
      <thead>
        <tr>
          <td>{pair.base.symbol}</td>
          <td>{pair.quote.symbol}</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            {balance.base.fetching && "Loading..."}
            {balance.base.amount !== undefined &&
              `balance: ${convertBaseSize(
                balance.base.amount,
                pair.base.decimals
              )}`}
          </td>
          <td>
            {balance.quote.fetching && "Loading..."}
            {balance.quote.amount !== undefined &&
              `balance: ${convertBaseSize(
                balance.quote.amount,
                pair.quote.decimals
              )}`}
          </td>
        </tr>
        {price.fetching && (
          <tr>
            <td>price: Loading...</td>
            <td>price: Loading...</td>
          </tr>
        )}
        {!price.fetching && price.amountBase !== undefined && (
          <tr>
            <td>
              price: {convertBaseSize(price.amountBase, pair.base.decimals)}
            </td>
            <td>
              price: {convertBaseSize(price.amountQuote!, pair.quote.decimals)}
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};
