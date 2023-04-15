import MenuIcon from "@mui/icons-material/Menu";
import {
  Box,
  List,
  ListItem,
  Divider,
  Button,
  Drawer,
  IconButton,
} from "@mui/material";
import React from "react";
import { useState } from "react";

export const SideDrawer = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (event: React.KeyboardEvent | React.MouseEvent) => {
    event.stopPropagation();
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }

    setOpen(!open);
  };

  return (
    <div>
      <IconButton
        sx={{ width: "3rem", height: "3rem", margin: "1rem" }}
        onClick={toggleDrawer}
      >
        <MenuIcon fontSize="large" />
      </IconButton>

      <Drawer anchor={"left"} open={open} onClose={toggleDrawer}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer}
          onKeyDown={toggleDrawer}
        >
          <List>
            <ListItem>Friends</ListItem>
          </List>
          <Divider />
          <Button>Add Place</Button>
        </Box>
      </Drawer>
    </div>
  );
};
