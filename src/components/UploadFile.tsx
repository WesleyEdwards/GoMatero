import { Button, IconButton, Stack, Typography } from "@mui/material";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import ClearIcon from "@mui/icons-material/Clear";
import Add from "@mui/icons-material/Add";
import { LoadingButton } from "@mui/lab";
import { storage } from "../firebase/firebase_sdk";

type UploadFileProps = {
  imageUrl: string | null;
  setImageUrl: (url: string | null) => void;
};

export const UploadFile = (props: UploadFileProps) => {
  const { imageUrl, setImageUrl } = props;
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  async function uploadFile(e: ChangeEvent<HTMLInputElement>) {
    setUploading(true);
    const file = e.target.files?.[0];
    if (!file) return;
    const fileRef = ref(storage, `/user-files/${file.name}`);
    const snapshot = await uploadBytes(fileRef, file);
    const downloadUrl = await getDownloadURL(
      ref(storage, `/user-files/${file.name}`)
    );
    setImageUrl(downloadUrl);
    setUploading(false);
  }

  return (
    <>
      {imageUrl ? (
        <Stack
          direction="row"
          alignItems="center"
          gap="1rem"
          justifyContent="center"
        >
          <IconButton size="large" onClick={() => setImageUrl(null)}>
            <ClearIcon />
          </IconButton>
          <img src={imageUrl} alt="uploaded" width="70%" />
        </Stack>
      ) : (
        <LoadingButton
          loading={uploading}
          variant="contained"
          onClick={() => inputRef.current?.click()}
          startIcon={<Add />}
        >
          Image
        </LoadingButton>
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
