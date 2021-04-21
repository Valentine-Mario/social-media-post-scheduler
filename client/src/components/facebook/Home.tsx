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

  const pending_post: fbPostProp[] | undefined = fb_post?.filter(
    (x) => x.posted === false
  );
  const sent_post: fbPostProp[] | undefined = fb_post?.filter(
    (x) => x.posted === true
  );
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
      <TabComponent
        pendingPost={pending_post as fbPostProp[]}
        sentPost={sent_post as fbPostProp[]}
      />
    </div>
  );
};

export default FacebookHome;
