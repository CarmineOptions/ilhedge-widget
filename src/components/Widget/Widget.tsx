import { CSSProperties, useEffect } from "react";
import Modal from "react-modal";
import { Content } from "./Content";
import { useTheme } from "../../hooks/useTheme";
import { useModalOpen } from "../../hooks/useModalOpen";
import { closeModal, openModal } from "../../redux/actions";
import { WidgetProps } from ".";

const getParentElement = (
  target: HTMLElement | string | undefined
): HTMLElement => {
  const noop = () => {};
  if (typeof target === "string") {
    try {
      // if string, try querySelector
      const queryRes = document.querySelector(target);
      if (queryRes) {
        return queryRes as HTMLElement;
      }
      // if string and not querySelector try getElementById
      const elById = document.getElementById(target);
      if (elById) {
        return elById as HTMLElement;
      }
    } catch {
      noop();
    }
  }
  try {
    // check if HTMLElement and return it
    if (target instanceof HTMLElement) {
      return target;
    }
  } catch {
    noop();
  }
  // as fallback use document.body
  return document.body;
};

export const Widget = ({
  account,
  parent,
  contentStyle,
  overlayStyle,
}: WidgetProps) => {
  const open = useModalOpen();
  const theme = useTheme();
  useEffect(() => {
    window.addEventListener("CARMINE_ILHEDGE_OPEN", openModal);
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

  const overlay: CSSProperties = {
    backgroundColor: "rgba(0,0,0,.5)",
  };

  const customStyles = {
    content: { ...content, ...contentStyle },
    overlay: { ...overlay, ...overlayStyle },
  };

  return (
    <Modal
      isOpen={open}
      onRequestClose={closeModal}
      appElement={getParentElement(parent)}
      style={customStyles}
    >
      <Content account={account} />
    </Modal>
  );
};
