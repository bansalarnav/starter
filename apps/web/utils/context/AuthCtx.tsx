"use client";

import { createContext } from "react";

export interface UserType {
  id: string;
  email: string;
  name: string;
}

interface AuthContext {
  user: UserType | null;
}

const AuthCtx = createContext<AuthContext>({
  user: null,
});

const AuthProvider: React.FC<{
  children: React.ReactNode;
  user: UserType | null;
}> = ({ children, user }) => {
  return <AuthCtx.Provider value={{ user }}>{children}</AuthCtx.Provider>;
};

export default AuthCtx;
export { AuthProvider };
