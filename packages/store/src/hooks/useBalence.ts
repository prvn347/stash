import { useRecoilValue } from "recoil";
import { balenceAtom } from "../atoms/balence";

export const useBalence = () => {
  const value = useRecoilValue(balenceAtom);
  return value;
};
