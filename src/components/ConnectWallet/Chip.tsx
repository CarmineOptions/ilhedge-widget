import { CSSProperties } from "react";
import { useTheme } from "../../hooks/useTheme";
import { hashEllision } from "../../utils";

export const Chip = ({ address }: { address: string }) => {
  const theme = useTheme();

  const style: CSSProperties = {
    ...theme.text,
    padding: "10px",
    background: theme.colors.background,
    border: "solid 2px",
    borderRadius: "10px",
    borderColor: theme.colors.main,
    color: theme.colors.main,
    display: "inline",
    cursor: "default",
  };

  return <div style={style}>{hashEllision(address)}</div>;
};
