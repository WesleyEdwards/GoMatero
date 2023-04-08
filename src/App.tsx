import { Container, Stack, Typography } from "@mui/material";
import { auth } from "./firebase/firebase_sdk";
import CreateAccount from "./components/CreateAccount";
import { User } from "firebase/auth";
import { useState } from "react";
import { UnAuthContext } from "./context/UnAuthContext";
import { Api } from "./firebase/api";

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [api, setApi] = useState<Api>(new Api());

  auth.onAuthStateChanged((user) => {
    if (user) {
      setUser(user);
    } else {
      setUser(null);
    }
  });
  return (
    <Container>
      <Stack justifyContent="center" alignItems="center" height="100%">
        <UnAuthContext.Provider value={{ setUser, api }}>
          <Typography sx={{ pt: "8rem" }}>Welcome to GoMatero</Typography>
          <CreateAccount />
        </UnAuthContext.Provider>
        {user && (
          <Typography sx={{ pt: "8rem" }}>Welcome {user.email}</Typography>
        )}
      </Stack>
    </Container>
  );
}

export default App;
