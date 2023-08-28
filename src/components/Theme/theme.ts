import { CSSProperties } from "react";

interface Colors {
  main: string;
  text: string;
  background: string;
}

export interface Theme {
  colors: Colors;
  breakpoint: number;
  text: CSSProperties;
}

const colors = {
  main: "#ffb000",
  text: "white",
  background: "#070718",
};

export const theme: Theme = {
  colors,
  breakpoint: 500,
  text: {
    color: colors.text,
  },
};
