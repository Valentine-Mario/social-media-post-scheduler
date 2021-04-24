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
  const [password, set_password] = useState<String | null>(null);
  const [username, set_username] = useState<String | null>(null);
  const [loading, set_loading] = useState<boolean>(false);

  const submit = () => {
    if (username === null || password === null) {
      alert("please fill all form");
      return;
    }
    set_loading(true);
    let data = {
      username: username,
      password: password,
    };
    postData("/ig/update", data).then((response) => {
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
        Update Credentials
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          {"Upload Instagram Credentials"}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="username"
            label="Ig username"
            onChange={(
              e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
            ) => {
              set_username(e.target.value);
            }}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="password"
            label="Ig password"
            type="password"
            onChange={(
              e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
            ) => {
              set_password(e.target.value);
            }}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={submit} color="primary">
            {loading ? "Loading..." : "Post"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CredDialog;
