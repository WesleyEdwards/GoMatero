import { Button, Container, Link, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <img
        style={{
          marginTop: "4rem",
          maxWidth: "100%",
          backgroundColor: "grey",
          borderRadius: "2rem",
        }}
        src="https://user-images.githubusercontent.com/97990557/232247080-7c5f2291-70f1-420a-a5af-e8cdea5a8f7f.png"
        alt="GoMatero Logo"
      />
      <Stack
        justifyContent="center"
        alignItems="center"
        paddingTop="4rem"
        gap={4}
      >
        <Button
          variant="contained"
          sx={{ width: "12rem" }}
          onClick={() => navigate("/sign-in")}
        >
          Sign In
        </Button>
        <Link
          component="button"
          variant="body2"
          onClick={() => navigate("/create-account")}
        >
          Don't have an account?
        </Link>
      </Stack>
    </Container>
  );
};

export default LandingPage;
