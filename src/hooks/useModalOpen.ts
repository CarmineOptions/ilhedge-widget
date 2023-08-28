import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

export const useModalOpen = (): boolean =>
  useSelector((s: RootState) => s.ui.modalOpen);
