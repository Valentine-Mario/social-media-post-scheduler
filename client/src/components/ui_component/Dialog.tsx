import React, { useState } from "react";
import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Input,
} from "@material-ui/core";

interface DialogProp {
  title: string;
  social_media: string;
  button_text: string;
}

const FormDialog = ({ title, social_media, button_text }: DialogProp) => {
  const [open, setOpen] = useState<boolean>(false);
  const [text, set_text] = useState<String | null>(null);
  const [image, set_image] = useState<FileList | null>(null);
  const [schedlue, set_schedlue] = useState<String | null>(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        {button_text}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">{social_media}</DialogTitle>
        <DialogContent>
          <DialogContentText>{title}</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="text"
            label="Add Text"
            type="text"
            onChange={(
              e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
            ) => {
              set_text(e.target.value);
            }}
            fullWidth
          />
          <Button variant="contained" component="label">
            Upload Image
            <input
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                set_image(e?.target?.files);
              }}
              type="file"
              hidden
            />
          </Button>

          <TextField
            id="schedlue"
            label="Schedule a date"
            type="datetime-local"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              set_schedlue(e.target.value);
            }}
            InputLabelProps={{
              shrink: true,
            }}
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

export default FormDialog;
