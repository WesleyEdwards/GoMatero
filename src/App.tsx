import { Stack } from "@mui/material";
import { UnAuthContext } from "./context/UnAuthContext";
import { unAuthRouter, authRouter } from "./context/Routes";
import { RouterProvider } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import { Spinner } from "./components/Spinner";
import { useGetAuth } from "./utils/useGetAuth";

function App() {
  const authState = useGetAuth();

  if (authState === "loading") return <Spinner />;

  return (
    <Stack justifyContent="center" alignItems="center" height="100%">
      {"user" in authState ? (
        <AuthContext.Provider value={{ ...authState }}>
          <RouterProvider router={authRouter} />
        </AuthContext.Provider>
      ) : (
        <UnAuthContext.Provider value={{ ...authState }}>
          <RouterProvider router={unAuthRouter} />
        </UnAuthContext.Provider>
      )}
    </Stack>
  );
}

export default App;
