import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Balance } from "../redux/reducers/balance";

export const useBalance = (): Balance =>
  useSelector((s: RootState) => s.balance);
