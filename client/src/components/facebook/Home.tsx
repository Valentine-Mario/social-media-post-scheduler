import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { FormDialog, TabComponent } from "../ui_component";
import CredDialog from "./CredDialog";
import { fetchData } from "../../lib/api";
import { Post } from "../../types";

const useStyles = makeStyles(() => ({
  root: {
    marginTop: "30px",
    marginLeft: "30px",
  },
}));

const FacebookHome = () => {
  const classes = useStyles();

  const [fb_post, set_fb_post] = useState<Post[] | null>(null);

  useEffect(() => {
    fetchData("/fb/get").then((response) => {
      set_fb_post(response.data!);
    });
  }, []);

  const pending_post: Post[] | undefined = fb_post?.filter(
    (x) => x.posted === false
  );
  const sent_post: Post[] | undefined = fb_post?.filter(
    (x) => x.posted === true
  );

  if (pending_post === undefined || sent_post === undefined) {
    return <></>;
  }
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
        social_media="facebook"
        pendingPost={pending_post!}
        sentPost={sent_post!}
      />
    </div>
  );
};

export default FacebookHome;
