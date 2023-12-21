import { useContext } from "react";
import AuthCtx from "../context/AuthCtx";

export function useUser() {
  const authCtx = useContext(AuthCtx);

  return authCtx.user;
}
