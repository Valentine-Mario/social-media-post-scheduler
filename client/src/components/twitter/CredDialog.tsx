import React, { useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import { postData } from "../../lib/api";

const CredDialog = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [consumer_key, set_consumer_key] = useState<String | null>(null);
  const [consumer_secret, set_consumer_secret] = useState<String | null>(null);
  const [access_token, set_access_token] = useState<String | null>(null);
  const [
    access_token_secret,
    set_access_token_secret,
  ] = useState<String | null>(null);
  const [loading, set_loading] = useState<boolean>(false);

  const submit = () => {
    if (
      consumer_key === null ||
      consumer_secret === null ||
      access_token === null ||
      access_token_secret === null
    ) {
      alert("please fill all form");
      return;
    }
    set_loading(true);
    let data = {
      consumer_key: consumer_key,
      consumer_secret: consumer_secret,
      access_token: access_token,
      access_token_secret: access_token_secret,
    };
    postData("/tw/update", data).then((response) => {
      if (!response.success)
        alert((response.message as string) || response.err);
      set_loading(false);
      handleClose();
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Update Twitter Credentials
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          {"Upload Twitter Credentials"}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="consumer_key"
            label="Consumer Key"
            onChange={(
              e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
            ) => {
              set_consumer_key(e.target.value);
            }}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="consumer_secret"
            label="Consumer Secret"
            onChange={(
              e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
            ) => {
              set_consumer_secret(e.target.value);
            }}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="access_token"
            label="Access Token"
            onChange={(
              e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
            ) => {
              set_access_token(e.target.value);
            }}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="access_token_secret"
            label="Access Token Secret"
            onChange={(
              e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
            ) => {
              set_access_token_secret(e.target.value);
            }}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button disabled={loading} onClick={submit} color="primary">
            {loading ? "Loading..." : "Post"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CredDialog;
