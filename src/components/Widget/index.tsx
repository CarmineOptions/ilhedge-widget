import { AccountInterface } from "starknet";
import { Widget } from "./Widget";
import { Provider } from "react-redux";
import { store } from "../../redux/store";
import { ThemeProvider } from "../Theme";

export type WidgetProps = {
  account?: AccountInterface;
};

export const ILHedgeWidget = ({ account }: WidgetProps) => (
  <Provider store={store}>
    <ThemeProvider>
      <Widget account={account} />
    </ThemeProvider>
  </Provider>
);
