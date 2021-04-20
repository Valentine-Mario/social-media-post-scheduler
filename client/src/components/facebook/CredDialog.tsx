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
  const [token, set_token] = useState<String | null>(null);
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
    set_loading(true);
    let data = {
      token: token,
    };
    postData("/fb/update", data).then((response) => {
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
          {"Upload Facebook Credentials"}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="token"
            label="Fb token"
            onChange={(
              e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
            ) => {
              set_token(e.target.value);
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
