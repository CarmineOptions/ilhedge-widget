import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

export const useTokenSelectModalOpen = (): boolean =>
  useSelector((s: RootState) => s.ui.tokenSelectModalOpen);
