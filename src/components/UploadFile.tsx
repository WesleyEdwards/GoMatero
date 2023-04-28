import { Button, IconButton, Stack, Typography } from "@mui/material";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import ClearIcon from "@mui/icons-material/Clear";
import Add from "@mui/icons-material/Add";
import { storage } from "../firebase/firebase_sdk";

type UploadFileProps = {
  imageUrl: string | null;
  setImageUrl: (url: string | null) => void;
};

export const UploadFile = (props: UploadFileProps) => {
  const { imageUrl, setImageUrl } = props;
  const inputRef = useRef<HTMLInputElement>(null);

  async function uploadFile(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const fileRef = ref(storage, `/userfiles/${file.name}`);
    const snapshot = await uploadBytes(fileRef, file);
    // likely in different place
    const downloadUrl = await getDownloadURL(
      ref(storage, `/user-files/${file.name}`)
    );
    setImageUrl(downloadUrl);
  }

  return (
    <>
      {imageUrl ? (
        <Stack direction="row" alignItems="center" gap="1rem">
          <IconButton size="large" onClick={() => setImageUrl(null)}>
            <ClearIcon />
          </IconButton>
          <Typography variant="h5">{"Thing"}</Typography>
        </Stack>
      ) : (
        <Button
          variant="contained"
          onClick={() => inputRef.current?.click()}
          startIcon={<Add />}
        >
          Image
        </Button>
      )}

      <input
        accept=".png,.jpg,.jpeg"
        type="file"
        ref={inputRef}
        onChange={uploadFile}
        hidden
        multiple={false}
      />
    </>
  );
};
