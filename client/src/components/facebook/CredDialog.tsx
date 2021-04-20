import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

const CredDialog = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [token, set_token] = useState<String | null>(null);

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
          <Button onClick={handleClose} color="primary">
            Schedule
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CredDialog;
