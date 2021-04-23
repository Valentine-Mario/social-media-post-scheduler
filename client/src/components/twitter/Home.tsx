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

const TwitterHome = () => {
  const classes = useStyles();
  const [tw_post, set_tw_post] = useState<Post[]>();

  useEffect(() => {
    fetchData("/tw/get").then((response) => {
      set_tw_post(response.data);
    });
  }, []);

  const pending_post: Post[] | undefined = tw_post?.filter(
    (x) => x.posted === false
  );
  const sent_post: Post[] | undefined = tw_post?.filter(
    (x) => x.posted === true
  );
  if (pending_post === undefined || sent_post === undefined) {
    return <></>;
  }

  return (
    <div className={classes.root}>
      <div style={{ display: "flex" }}>
        <FormDialog
          title={"Schedule a twitter post"}
          social_media={"Twitter"}
          button_text={"Schedule a Twit"}
        />
        <CredDialog />
      </div>
      <TabComponent pendingPost={pending_post!} sentPost={sent_post!} />
    </div>
  );
};

export default TwitterHome;
