import { User } from "firebase/auth";
import { createContext } from "react";
import { Api } from "../firebase/api";

export const AuthContext = createContext({
  user: {} as User,
  setUser: (user: User) => {},
  api: {} as Api,
});
