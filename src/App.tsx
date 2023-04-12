import { Container, Stack, Typography } from "@mui/material";
import { auth } from "./firebase/firebase_sdk";
import CreateAccount from "./components/CreateAccount";
import { User } from "firebase/auth";
import { useEffect, useState } from "react";
import { UnAuthContext } from "./context/UnAuthContext";
import { Api } from "./firebase/api";
import { unAuthRouter, authRouter } from "./context/Routes";
import { RouterProvider } from "react-router-dom";
import { AuthContext } from "./context/AuthContexxt";

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [api, setApi] = useState<Api>(new Api());

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

  return (
    <Container>
      <Stack justifyContent="center" alignItems="center" height="100%">
        {user ? (
          <AuthContext.Provider value={{ user, setUser, api }}>
            <RouterProvider router={authRouter} />
          </AuthContext.Provider>
        ) : (
          <UnAuthContext.Provider value={{ setUser, api }}>
            <Typography sx={{ pt: "8rem" }}>Welcome to GoMatero</Typography>
            <RouterProvider router={unAuthRouter} />
          </UnAuthContext.Provider>
        )}
      </Stack>
    </Container>
  );
}

export default App;
