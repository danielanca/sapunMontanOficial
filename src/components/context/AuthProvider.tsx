import { createContext, useState } from "react";
interface Provi {
  email: string;
  password: string;
  accessToken: string;
}
interface ProviInter {
  auth: Provi;
  setAuth: React.Dispatch<React.SetStateAction<Provi>>;
}
// @ts-ignore
const AuthContext = createContext<ProviInter>({ email: "", password: "", accessToken: "" });

export const AuthProvider: React.FC = ({ children }) => {
  const [auth, setAuth] = useState<Provi>({ email: "", password: "", accessToken: "" });

  return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
