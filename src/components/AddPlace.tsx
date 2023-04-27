import { Description } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Stack,
  TextField,
} from "@mui/material";
import { FC, useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { PublicUser } from "../utils/models";

type AddPlaceProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};
export const AddPlace: FC<AddPlaceProps> = (props) => {
  const { api } = useContext(AuthContext);
  const { open, setOpen } = props;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [friends, setFriends] = useState<PublicUser[]>([]);
  const [publicUsers, setPublicUsers] = useState<PublicUser[]>([]);
  const handleClose = () => setOpen(false);

  const handleSubmit = () => {
    console.log(friends);
  };

  useEffect(() => {
    api.fetchPublicUsers().then(setPublicUsers);
  }, []);
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
              getOptionLabel={(user) => `${user.name} (${user.email})`}
              disablePortal
              multiple
              options={publicUsers}
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
        <DialogActions>
          <FormControl fullWidth>
            <Stack
              direction="row"
              justifyContent="flex-end"
              padding="1rem"
              gap="1rem"
            >
              <Button variant="contained" onClick={handleSubmit}>
                Submit
              </Button>
            </Stack>
          </FormControl>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddPlace;
