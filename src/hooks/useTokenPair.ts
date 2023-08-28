import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { TokenPair } from "../constants";

export const useTokenPair = (): TokenPair | undefined =>
  useSelector((s: RootState) => s.state.tokenPair);
