import AddIcon from "@mui/icons-material/Add";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import { AddPlace } from "./AddPlace";
import { MyMateSessions } from "./MyMateSessions";

export const SideDrawer = () => {
  const [open, setOpen] = useState(false);
  const [openCreateEvent, setOpenCreateEvent] = useState(false);

  const closeDrawer = (event: React.KeyboardEvent | React.MouseEvent) => {
    event.stopPropagation();
    setOpen(false);
  };

  const handleOpenAddPlace = () => {
    setOpen(false);
    setOpenCreateEvent(true);
  };

  return (
    <div>
      <IconButton
        sx={{ width: "3rem", height: "3rem", margin: "1rem" }}
        onClick={(e) => {
          e.stopPropagation();
          setOpen(true);
        }}
      >
        <MenuIcon fontSize="large" />
      </IconButton>

      <Drawer anchor={"left"} open={open} onClose={closeDrawer}>
        <Box sx={{ width: 300 }} role="presentation" onKeyDown={closeDrawer}>
          <MyMateSessions onOpenModal={handleOpenAddPlace} />
        </Box>
      </Drawer>
      <AddPlace open={openCreateEvent} setOpen={setOpenCreateEvent} />
    </div>
  );
};
