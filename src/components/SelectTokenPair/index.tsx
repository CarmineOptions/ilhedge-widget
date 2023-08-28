import { CSSProperties } from "react";
import { useTokenPair } from "../../hooks/useTokenPair";
import { Box, Paragraph } from "../Styled";
import { useTheme } from "../../hooks/useTheme";
import Modal from "react-modal";
import { ModalContent } from "./ModalContent";
import { useTokenSelectModalOpen } from "../../hooks/useTokenSelectModalOpen";
import {
  closeTokenSelectModal,
  openTokenSelectModal,
} from "../../redux/actions";
import { TokenPairBadge } from "../Badge";

export const TokenPairSelect = () => {
  const open = useTokenSelectModalOpen();
  const theme = useTheme();
  const pair = useTokenPair();

  const style: CSSProperties = {
    height: "56px",
    borderRadius: "4px",
    position: "relative",
    outline: "none",
    border: "none",
    flex: "1 1 auto",
    backgroundColor: "rgb(20, 20, 81)",
    whiteSpace: "nowrap",
    overflow: "hidden",
    color: theme.colors.text,
    textAlign: "center",
    cursor: "pointer",
  };

  const content: CSSProperties = {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    width: "300px",
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
    <Box id="select-token-modal-root">
      <div style={{ minWidth: "130px", maxWidth: "132px" }}>
        <Paragraph>Token Pair</Paragraph>
      </div>
      <button onClick={openTokenSelectModal} style={style}>
        {pair === undefined ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "1em",
              fontSize: "18px",
            }}
          >
            Select token
            <svg
              width="12"
              height="7"
              viewBox="0 0 12 7"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0.97168 1L6.20532 6L11.439 1" stroke="#AEAEAE"></path>
            </svg>
          </div>
        ) : (
          <TokenPairBadge pair={pair} />
        )}
      </button>
      <Modal
        isOpen={open}
        onRequestClose={closeTokenSelectModal}
        style={customStyles}
        appElement={document.getElementById("select-token-modal-root")!}
      >
        <ModalContent />
      </Modal>
    </Box>
  );
};
