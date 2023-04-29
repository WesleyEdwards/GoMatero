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

export const SideDrawer = () => {
  const [open, setOpen] = useState(false);
  const [openCreateEvent, setOpenCreateEvent] = useState(false);

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

  const handleOpenAddPlace = () => {
    setOpen(false);
    setOpenCreateEvent(true);
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
          <Stack alignContent="center" gap="2rem" padding="1rem">
            <Typography>Friends</Typography>
            <Divider />
            <Button
              onClick={handleOpenAddPlace}
              variant="contained"
              endIcon={<AddIcon />}
            >
              Add Place
            </Button>
          </Stack>
        </Box>
      </Drawer>
      <AddPlace open={openCreateEvent} setOpen={setOpenCreateEvent} />
    </div>
  );
};
