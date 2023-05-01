import { User } from "firebase/auth";
import { createContext } from "react";
import { Api } from "../firebase/api";
import { MateSession } from "../utils/models";

export const AuthContext = createContext({
  user: {} as User,
  setUser: (user: User) => {},
  api: {} as Api,
  myAttended: {} as MateSession[],
  refreshMyAttended: {} as () => void,
});
