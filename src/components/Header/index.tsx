import { CSSProperties } from "react";
import { Heading2 } from "../Styled";
import { CloseButton } from "../CloseButton";

type Props = {
  title: string;
  close: () => void;
};

export const Header = ({ title, close }: Props) => {
  const style: CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  };
  return (
    <div style={style}>
      <Heading2>{title}</Heading2>
      <CloseButton close={close} />
    </div>
  );
};
