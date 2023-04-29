import { v4 as uuidv4 } from "uuid";
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
import { FC, useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { LatLng, MateSession, PublicUser } from "../utils/models";
import { UploadFile } from "./UploadFile";
import SelectLocationMap from "./SelectLocationMap";

type AddPlaceProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};
export const AddPlace: FC<AddPlaceProps> = (props) => {
  const { api, user } = useContext(AuthContext);
  const { open, setOpen } = props;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [friends, setFriends] = useState<PublicUser[]>([]);
  const [publicUsers, setPublicUsers] = useState<PublicUser[]>([]);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [location, setLocation] = useState<LatLng>();

  const textFieldRef = useRef<HTMLInputElement>(null);

  const isDirty: string | undefined = (() => {
    if (!imageUrl) return "Please select an image";
    if (!location) return "Select a location";
    if (!title) return "Title is required";
    return undefined;
  })();

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    if (!imageUrl) return;
    if (!location) return;
    const newSession: MateSession = {
      id: uuidv4(),
      owner: user.uid,
      title,
      date: new Date(),
      attendedMembers: friends.map((friend) => friend.uid),
      image: imageUrl,
      description,
      location,
    };
    api.addMateSession(newSession).then((res) => {
      console.log(res);
      handleClose();
    });
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
              ref={textFieldRef}
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
            <UploadFile imageUrl={imageUrl} setImageUrl={setImageUrl} />
            <SelectLocationMap
              location={location}
              setLocation={setLocation}
              width={textFieldRef.current?.offsetWidth}
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
              <Button
                variant="contained"
                disabled={isDirty !== undefined}
                onClick={handleSubmit}
              >
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
