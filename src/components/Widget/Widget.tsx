import { AccountInterface } from "starknet";
import { CSSProperties, useEffect } from "react";
import Modal from "react-modal";
import { Content } from "./Content";
import { useTheme } from "../../hooks/useTheme";
import { useModalOpen } from "../../hooks/useModalOpen";
import { closeModal, openModal } from "../../redux/actions";

type WidgetProps = {
  account?: AccountInterface;
};

export const Widget = ({ account }: WidgetProps) => {
  const open = useModalOpen();
  const theme = useTheme();
  useEffect(() => {
    window.addEventListener("ILHEDGE_OPEN", openModal);
  }, []);

  const content: CSSProperties = {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    width:
      window.innerWidth > theme.breakpoint ? "424px" : "calc(100vw - 60px)",
    transform: "translate(-50%, -50%)",
    color: theme.colors.text,
    background: theme.colors.background,
    border: "3px solid",
    borderRadius: "20px",
    borderColor: theme.colors.main,
  };

  const customStyles = {
    content,
  };

  return (
    <Modal
      isOpen={open}
      onRequestClose={closeModal}
      appElement={document.getElementById("root")!}
      style={customStyles}
    >
      <Content account={account} />
    </Modal>
  );
};
