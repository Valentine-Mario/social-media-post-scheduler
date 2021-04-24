import React, { useState } from "react";
import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import { postData, postDataWithFile } from "../../lib/api";

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
  const [loading, set_loading] = useState<boolean>(false);

  let path: string;
  switch (social_media.toLowerCase()) {
    case "twitter":
      path = "/tw/add";
      break;
    case "facebook":
      path = "/fb/add";
      break;
    default:
      path = "/ig/add";
  }
  const submit = () => {
    if (social_media.toLowerCase() === "instagram" && image === null) {
      alert("image must be selected for instagram");
      return;
    }
    if (text === null || schedlue === null) {
      alert("please provide text and scheduled date");
      return;
    }
    if (image === null) {
      set_loading(true);
      let data = {
        text: text,
        schedlue: schedlue,
      };
      postData(path, data).then((response) => {
        if (!response.success)
          alert((response.message as string) || response.err);
        set_loading(false);
        handleClose();
      });
    } else {
      set_loading(true);
      const formData: FormData = new FormData();
      formData.append("text", text as string);
      formData.append("schedlue", schedlue as string);
      formData.append("image", image[0]);
      postDataWithFile(path, formData).then((response) => {
        set_loading(false);
        handleClose();
      });
    }
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

          <TextField
            id="schedlue"
            label="Schedule a date"
            type="datetime-local"
            style={{ marginTop: "10px" }}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              set_schedlue(e.target.value);
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />

          <Button
            style={{ marginTop: "10px" }}
            variant="contained"
            color="primary"
            component="label"
          >
            Upload Image
            <input
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                set_image(e?.target?.files);
              }}
              type="file"
              hidden
            />
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={submit} color="primary">
            {loading ? "Uploading..." : "Post"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FormDialog;
