import { CSSProperties, HTMLAttributes } from "react";
import { useTheme } from "../../hooks/useTheme";

export const Paragraph = ({
  children,
  ...attributes
}: HTMLAttributes<HTMLParagraphElement>) => {
  const theme = useTheme();
  const style: CSSProperties = {
    ...theme.text,
    fontSize: "1em",
  };
  return (
    <p style={style} {...attributes}>
      {children}
    </p>
  );
};

export const Heading2 = ({
  children,
  ...attributes
}: HTMLAttributes<HTMLParagraphElement>) => {
  const theme = useTheme();
  return (
    <h2
      style={{ ...theme.text, color: theme.colors.main, ...attributes.style }}
      {...attributes}
    >
      {children}
    </h2>
  );
};
