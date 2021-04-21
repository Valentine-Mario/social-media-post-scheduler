import React from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { fbPostProp, igPostProp, twPostProp } from "../../types";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    marginTop: "30px",
    width: "70%",
    marginLeft: "30px",
  },
}));

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

interface TabComponentProps {
  pendingPost: fbPostProp[] | igPostProp | twPostProp[];
  sentPost: fbPostProp[] | igPostProp | twPostProp[];
}

const TabComponent = ({ pendingPost, sentPost }: TabComponentProps) => {
  const [value, setValue] = React.useState(0);
  const classes = useStyles();

  const handleChange = (_event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
  return (
    <div className={classes.root}>
      <div>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Pending Post" />
          <Tab label="Sent Post" />
        </Tabs>
      </div>
      <TabPanel value={value} index={0}>
        {pendingPost}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {sentPost}
      </TabPanel>
    </div>
  );
};

export default TabComponent;
