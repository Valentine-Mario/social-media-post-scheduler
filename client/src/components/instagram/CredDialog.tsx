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
import Snackbar from "@material-ui/core/Snackbar";

const CredDialog = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [password, set_password] = useState<String | null>(null);
  const [username, set_username] = useState<String | null>(null);
  const [loading, set_loading] = useState<boolean>(false);
  const [snackbar_state, set_snackbar_state] = useState({
    openSnackbar: false,
    vertical: "top" as "top",
    horizontal: "center" as "center",
  });
  const [snack_message, set_snack_message] = useState<String | null>(null);
  const { vertical, horizontal, openSnackbar } = snackbar_state;
  const handleOpenSnackbar = () => () => {
    set_snackbar_state({
      openSnackbar: true,
      vertical: "top",
      horizontal: "center",
    });
  };

  const handleCloseSnackbar = () => {
    set_snackbar_state({ ...snackbar_state, openSnackbar: false });
  };

  const submit = () => {
    if (username === null || password === null) {
      set_snack_message("please fill all form");
      return;
    }
    set_loading(true);
    let data = {
      username: username,
      password: password,
    };
    postData("/ig/update", data).then((response) => {
      set_snack_message((response.message as string) || response.err);
      handleOpenSnackbar();
      console.log(response);
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
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={openSnackbar}
        onClose={handleCloseSnackbar}
        message={snack_message}
        key={vertical + horizontal}
      />
    </div>
  );
};

export default CredDialog;
