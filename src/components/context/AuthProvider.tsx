import { createContext, useState } from "react";
import { getCookie } from "./../../utils/functions";
interface Provi {
  email: string;
  password: string;
  accessToken: string;
  authorise: boolean | null;
}
interface ProviInter {
  auth?: Provi;
  setAuth?: React.Dispatch<React.SetStateAction<Provi>>;
}
const AuthContext = createContext<ProviInter>({});

export const AuthProvider: React.FC = ({ children }) => {
  var authoriseMe = false;
  if (getCookie("jwt") === "FlorinSalam2022") {
    authoriseMe = true;
    // setAuth((auth) => ({ ...auth, email: "yeah", authorise: true }));
  }
  //you have to learn React lifecycle
  const [auth, setAuth] = useState<Provi>({ email: "", password: "", accessToken: "", authorise: authoriseMe });

  return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
