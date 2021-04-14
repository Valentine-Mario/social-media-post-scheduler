import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { FormDialog, TabComponent } from "../ui_component";
import CredDialog from "./CredDialog";

const useStyles = makeStyles(() => ({
  root: {
    marginTop: "30px",
    marginLeft: "30px",
  },
}));

const FacebookHome = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div style={{ display: "flex" }}>
        <FormDialog
          title={"Schedule a Facebook post"}
          social_media={"Facebook"}
          button_text={"Schedule a Post"}
        />
        <CredDialog />
      </div>
      <TabComponent pendingPost="pending fb post" sentPost="sent fb post" />
    </div>
  );
};

export default FacebookHome;
