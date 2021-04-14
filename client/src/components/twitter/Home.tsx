import { makeStyles } from "@material-ui/core/styles";
import { FormDialog, TabComponent } from "../ui_component";
import CredDialog from "./CredDialog";

const useStyles = makeStyles(() => ({
  root: {
    marginTop: "30px",
    marginLeft: "30px",
  },
}));

const TwitterHome = () => {
  const classes = useStyles();
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
        pendingPost={"pending twitter post"}
        sentPost={"sent twitter post"}
      />
    </div>
  );
};

export default TwitterHome;
