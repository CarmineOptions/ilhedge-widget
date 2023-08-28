import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

export const useNeedNewQuote = (): boolean =>
  useSelector((s: RootState) => s.state.getNewQuote);
