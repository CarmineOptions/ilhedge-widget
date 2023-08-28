import { CSSProperties, HTMLAttributes } from "react";

export const Box = ({
  children,
  ...attributes
}: HTMLAttributes<HTMLDivElement>) => {
  const parentStyle: CSSProperties = {
    border: "1px solid rgb(44, 47, 54)",
    background: "rgba(196, 196, 196, 0.01)",
    boxShadow:
      "rgba(96, 68, 145, 0.3) 0px -63.1213px 52.3445px -49.2654px inset, rgba(202, 172, 255, 0.3) 0px 75.4377px 76.9772px -36.9491px inset, rgba(154, 146, 210, 0.3) 0px 3.07909px 13.8559px inset, rgba(227, 222, 255, 0.2) 0px 0.769772px 30.7909px inset",
    borderRadius: "8px",
    margin: "20px 0",
  };
  const style: CSSProperties = {
    display: "flex",
    flexFlow: "row",
    WebkitBoxAlign: "center",
    alignItems: "center",
    padding: "0.75rem 0.75rem 0.75rem 1rem",
  };

  return (
    <div style={parentStyle}>
      <div style={style} {...attributes}>
        {children}
      </div>
    </div>
  );
};
