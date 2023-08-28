import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

export const useNotionalValue = (): number =>
  useSelector((s: RootState) => s.state.notionalValue);
