import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { FormDialog, TabComponent } from "../ui_component";
import CredDialog from "./CredDialog";
import { fetchData } from "../../lib/api";
import { igPostProp } from "../../types";

const useStyles = makeStyles(() => ({
  root: {
    marginTop: "30px",
    marginLeft: "30px",
  },
}));

const InstagramHome = () => {
  const classes = useStyles();
  const [ig_post, set_ig_post] = useState<igPostProp[]>();

  fetchData("/ig/get").then((response) => {
    set_ig_post(response.data as igPostProp[]);
  });
  console.log(ig_post);

  return (
    <div className={classes.root}>
      <div style={{ display: "flex" }}>
        <FormDialog
          title={"Schedule an instagram post"}
          social_media={"Instagram"}
          button_text={"Schedule a Post"}
        />
        <CredDialog />
      </div>
      <TabComponent pendingPost="pending ig post" sentPost="sent ig post" />
    </div>
  );
};

export default InstagramHome;
