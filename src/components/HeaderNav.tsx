import { Stack, Typography } from "@mui/material";
import React, { FC, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { NavigationTabs } from "./NavigationTabs";
import { UserIcon } from "./UserIcon";
import { SideDrawer } from "./SideDrawer";

export type TabPaths = "home" | "dashboard" | "profile";

const authTabInfo: Partial<Record<TabPaths, string>> = {
  home: "Home",
  dashboard: "Dashboard",
  profile: "Profile",
};

export const HeaderNav: FC<{ auth?: boolean }> = ({ auth = false }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") navigate("/home");
  }, []);

  return (
    <>
      <Stack
        justifyContent="space-between"
        width="100%"
        direction="row"
        alignItems="center"
      >
        {auth ? (
          <Stack direction="row" alignItems="center" gap="2rem">
            <SideDrawer />
            <img
              style={{
                marginLeft: "2rem",
                maxWidth: "12rem",
                backgroundColor: "grey",
                borderRadius: "10px",
              }}
              src="https://user-images.githubusercontent.com/97990557/232247080-7c5f2291-70f1-420a-a5af-e8cdea5a8f7f.png"
              alt="GoMatero Logo"
            />
          </Stack>
        ) : (
          <div></div>
        )}
        <Stack direction="row" alignItems="center" gap="2rem">
          {auth && <NavigationTabs tabInfo={authTabInfo} />}
          <UserIcon authenticated={auth} />
        </Stack>
      </Stack>
      <Outlet />
    </>
  );
};

export default HeaderNav;
