import { createContext, useState } from "react";
import { getCookie } from "./../../utils/functions";
import { ProviInter, Provi } from "./ProviderTypes";

const AuthContext = createContext<ProviInter | null>(null);

export const AuthProvider: React.FC = ({ children }) => {
  let authoriseMe = false;
  if (getCookie("jwt") === "ABCJWT") {
    authoriseMe = true;
    // setAuth((auth) => ({ ...auth, email: "yeah", authorise: true }));
  }
  //you have to learn React lifecycle
  const [auth, setAuth] = useState<Provi>({ email: "", password: "", accessToken: "", authorise: authoriseMe });

  return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
