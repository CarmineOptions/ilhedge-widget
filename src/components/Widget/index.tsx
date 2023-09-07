import { AccountInterface } from "starknet";
import { Widget } from "./Widget";
import { Provider } from "react-redux";
import { store } from "../../redux/store";
import { ThemeProvider } from "../Theme";
import { CSSProperties } from "react";

export type WidgetProps = {
  account?: AccountInterface;
  parent?: HTMLElement | string;
  contentStyle?: CSSProperties;
  overlayStyle?: CSSProperties;
};

export const ILHedgeWidget = (props: WidgetProps) => (
  <Provider store={store}>
    <ThemeProvider>
      <Widget {...props} />
    </ThemeProvider>
  </Provider>
);
