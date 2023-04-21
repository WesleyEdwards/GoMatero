import { Description } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import {
  Autocomplete,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  Stack,
  TextField,
} from "@mui/material";
import { FC, useEffect, useState } from "react";

type AddPlaceProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};
export const AddPlace: FC<AddPlaceProps> = (props) => {
  const { open, setOpen } = props;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [friends, setFriends] = useState<string[]>([]);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    console.log(friends);
  }, [friends]);
  return (
    <>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Add Place</DialogTitle>
        <DialogContent>
          <Stack padding="1rem" gap="1rem">
            <TextField
              label="Title"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Autocomplete
              getOptionLabel={(option) => option}
              disablePortal
              multiple
              options={otherUsers}
              onChange={(_, value) => setFriends(value)}
              renderInput={(params) => (
                <TextField {...params} label="Friends present" />
              )}
            />
            <TextField
              label="Comments"
              fullWidth
              helperText="How was it?"
              multiline
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
};

const otherUsers = ["Will", "John", "Paul", "George"];
