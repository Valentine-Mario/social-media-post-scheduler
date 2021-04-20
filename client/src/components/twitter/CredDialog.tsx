import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

const CredDialog = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [consumer_key, set_consumer_key] = useState<String | null>(null);
  const [consumer_secret, set_consumer_secret] = useState<String | null>(null);
  const [access_token, set_access_token] = useState<String | null>(null);
  const [
    access_token_secret,
    set_access_token_secret,
  ] = useState<String | null>(null);

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
          <Button onClick={handleClose} color="primary">
            Schedule
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CredDialog;
