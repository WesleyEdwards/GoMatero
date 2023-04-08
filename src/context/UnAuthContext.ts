import { createContext } from "react";
import { Api } from "../firebase/api";
import { User } from "firebase/auth";

export const UnAuthContext = createContext({
  setUser: (user: User) => {},
  api: {} as Api,
});
