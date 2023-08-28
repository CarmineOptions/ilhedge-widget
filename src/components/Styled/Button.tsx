import { ButtonHTMLAttributes, CSSProperties } from "react";
import { useTheme } from "../../hooks/useTheme";

export const Button = ({
  children,
  ...attributes
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  const theme = useTheme();
  const disabled = !!attributes.disabled;

  const style: CSSProperties = {
    padding: "10px",
    background: theme.colors.background,
    border: "solid 2px",
    borderRadius: "10px",
    borderColor: theme.colors.main,
    color: theme.colors.main,
    cursor: "pointer",
  };

  const styleDisabled: CSSProperties = {
    padding: "10px",
    background: "lightgrey",
    border: "solid 2px darkgrey",
    borderRadius: "10px",
    color: "darkgrey",
  };

  return (
    <button style={disabled ? styleDisabled : style} {...attributes}>
      {children}
    </button>
  );
};
