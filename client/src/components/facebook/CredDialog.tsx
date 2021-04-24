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
  const [token, set_token] = useState<String | null>(null);
  const [loading, set_loading] = useState<boolean>(false);

  const submit = () => {
    if (token === null) {
      alert("please fill all form");
      return;
    }
    set_loading(true);
    let data = {
      token: token,
    };
    postData("/fb/update", data).then((response) => {
      if (!response.success)
        alert((response.message as string) || response.err);
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
    </div>
  );
};

export default CredDialog;
