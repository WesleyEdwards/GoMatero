import { createContext } from "react";

type User = "user" | "admin";
export const AuthContext = createContext({
  user: {} as User,
  setUser: (user: User) => {},
  logout: () => {},
});
