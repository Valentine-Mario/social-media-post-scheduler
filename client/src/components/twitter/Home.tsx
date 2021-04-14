import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { FormDialog } from "../ui_component";
import CredDialog from "./CredDialog";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    marginTop: "30px",
    width: "70%",
    marginLeft: "30px",
  },
}));

const TwitterHome = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (_event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

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
      <div>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Pending Twit" />
          <Tab label="Sent Twit" />
        </Tabs>
      </div>
      <TabPanel value={value} index={0}>
        Item One
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
    </div>
  );
};

export default TwitterHome;

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};
