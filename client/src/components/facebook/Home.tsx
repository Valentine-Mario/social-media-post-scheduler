import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { FormDialog, TabComponent } from "../ui_component";
import CredDialog from "./CredDialog";
import { fetchData } from "../../lib/api";
import { fbPostProp } from "../../types";

const useStyles = makeStyles(() => ({
  root: {
    marginTop: "30px",
    marginLeft: "30px",
  },
}));

const FacebookHome = () => {
  const classes = useStyles();

  const [fb_post, set_fb_post] = useState<fbPostProp[]>();

  fetchData("/fb/get").then((response) => {
    set_fb_post(response.data as fbPostProp[]);
  });
  console.log(fb_post);
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
