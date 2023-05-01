import { useEffect, useState } from "react";
import { auth } from "../firebase/firebase_sdk";
import { Api } from "../firebase/api";
import { User } from "firebase/auth";
import { MateSession } from "./models";

type AuthState =
  | "loading"
  | {
      api: Api;
      user: User;
      setUser: (user: User) => void;
      myAttended: MateSession[];
      refreshMyAttended: () => void;
    }
  | { api: Api; setUser: (user: User) => void };

export const useGetAuth = (): AuthState => {
  const [user, setUser] = useState<User | null | undefined>();
  const [myAttended, setMyAttended] = useState<MateSession[]>();
  const api = new Api();

  const refreshMyAttended = () => {
    setMyAttended(undefined);
    if (!user) return setMyAttended([]);
    api.myAttendedSessions().then(setMyAttended);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) setUser(user);
      else setUser(null);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    refreshMyAttended();
  }, [user]);

  if (user === undefined || myAttended === undefined) return "loading";

  if (user) return { api, user, setUser, myAttended, refreshMyAttended };

  return { api, setUser };
};
