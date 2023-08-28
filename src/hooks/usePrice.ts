import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

export const usePrice = () => useSelector((s: RootState) => s.balance.price);
