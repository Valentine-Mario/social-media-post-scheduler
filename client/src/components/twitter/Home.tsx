import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { FormDialog, TabComponent } from "../ui_component";
import CredDialog from "./CredDialog";
import { fetchData } from "../../lib/api";
import { twPostProp } from "../../types";

const useStyles = makeStyles(() => ({
  root: {
    marginTop: "30px",
    marginLeft: "30px",
  },
}));

const TwitterHome = () => {
  const classes = useStyles();
  const [tw_post, set_tw_post] = useState<twPostProp[]>();

  fetchData("/tw/get").then((response) => {
    set_tw_post(response.data as twPostProp[]);
  });
  console.log(tw_post);
  const pending_post: twPostProp[] | undefined = tw_post?.filter(
    (x) => x.posted === false
  );
  const sent_post: twPostProp[] | undefined = tw_post?.filter(
    (x) => x.posted === true
  );

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
      <TabComponent
        pendingPost={pending_post as twPostProp[]}
        sentPost={sent_post as twPostProp[]}
      />
    </div>
  );
};

export default TwitterHome;
