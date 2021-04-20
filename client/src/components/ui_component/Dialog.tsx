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
import Snackbar from "@material-ui/core/Snackbar";

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
  const [snackbar_state, set_snackbar_state] = useState({
    openSnackbar: false,
    vertical: "top" as "top",
    horizontal: "center" as "center",
  });
  const [snack_message, set_snack_message] = useState<String | null>(null);
  const { vertical, horizontal, openSnackbar } = snackbar_state;

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
      set_snack_message("image must be selected for instagram");
      return;
    }
    if (text === null || schedlue === null) {
      set_snack_message("please provide text and scheduled date");
      return;
    }
    if (image === null) {
      set_loading(true);
      let data = {
        text: text,
        schedlue: schedlue,
      };
      postData(path, data).then((response) => {
        set_snack_message((response.message as string) || response.err);
        handleOpenSnackbar();
        console.log(response);
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
        set_snack_message((response.message as string) || response.err);
        handleOpenSnackbar();
        console.log(response);
        set_loading(false);
        handleClose();
      });
    }
  };

  const handleCloseSnackbar = () => {
    set_snackbar_state({ ...snackbar_state, openSnackbar: false });
  };
  const handleOpenSnackbar = () => () => {
    set_snackbar_state({
      openSnackbar: true,
      vertical: "top",
      horizontal: "center",
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

export default FormDialog;
