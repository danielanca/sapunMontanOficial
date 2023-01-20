import { createContext, useState } from "react";
import { getCookie } from "./../../utils/functions";
import { ProviInter, Provi } from "./ProviderTypes";

const AuthContext = createContext<ProviInter | null>(null);
interface AuthProps {
  children: React.ReactNode;
}
export const AuthProvider = ({ children }: AuthProps) => {
  //you have to learn React lifecycle
  const [auth, setAuth] = useState<Provi>({
    email: "",
    password: "",
    accessToken: "",
    authorise: getCookie("jwt") === "ABCJWT"
  });

  return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
