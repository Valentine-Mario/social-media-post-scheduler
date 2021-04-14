import { makeStyles } from "@material-ui/core/styles";
import { FormDialog, TabComponent } from "../ui_component";
import CredDialog from "./CredDialog";

const useStyles = makeStyles(() => ({
  root: {
    marginTop: "30px",
    marginLeft: "30px",
  },
}));

const InstagramHome = () => {
  const classes = useStyles();

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
