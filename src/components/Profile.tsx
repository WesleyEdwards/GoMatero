import { Button, Container, Stack, Typography } from "@mui/material";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { auth } from "../firebase/firebase_sdk";

export const Profile = () => {
  const { user, api } = useContext(AuthContext);
  return (
    <Container maxWidth="md">
      <Stack spacing={4}>
        <Typography>{user.displayName}</Typography>
        <Typography>{user.email}</Typography>
        <Button
          sx={{ minWidth: "12rem", alignSelf: "center" }}
          onClick={() => {
            auth.signOut();
          }}
        >
          Logout
        </Button>
        <Button
          onClick={() => {
            api.createPublicProfile(user);
          }}
        >
          CreateThing
        </Button>
      </Stack>
    </Container>
  );
};

export default Profile;
