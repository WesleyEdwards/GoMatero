import { useEffect, useState } from "react";
import { auth } from "../firebase/firebase_sdk";
import { Api } from "../firebase/api";
import { User } from "firebase/auth";

type AuthState =
  | "loading"
  | { api: Api; user: User; setUser: (user: User) => void }
  | { api: Api; setUser: (user: User) => void };

export const useGetAuth = (): AuthState => {
  const [user, setUser] = useState<User | null | undefined>();
  const api = new Api();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return unsubscribe;
  }, []);

  if (user === undefined) return "loading";

  if (user) return { api, user, setUser };

  return { api, setUser };
};
