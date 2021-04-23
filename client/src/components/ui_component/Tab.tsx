import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Post } from "../../types";
import moment from "moment";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Box,
  Tabs,
  Tab,
} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    marginTop: "30px",
    width: "70%",
    marginLeft: "30px",
  },
  root2: {
    maxWidth: 345,
  },
  media: {
    height: 140,
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
  pendingPost: Post[];
  sentPost: Post[];
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
        {pendingPost.map((d) => (
          <Card key={d.id} className={classes.root2}>
            <CardActionArea>
              {d.image ? (
                <CardMedia
                  className={classes.media}
                  image={d.image as string}
                  title="Contemplative Reptile"
                />
              ) : (
                <CardMedia
                  className={classes.media}
                  image="https://res.cloudinary.com/rchain/image/upload/v1602745827/No-Image-Available1.png"
                  title="Contemplative Reptile"
                />
              )}

              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Schedled for:{" "}
                  {moment(new Date(d.schedlue)).format("dddd, MMMM YYYY HH:mm")}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {d.text}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary">
                Deelete
              </Button>
            </CardActions>
          </Card>
        ))}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {sentPost.map((d) => (
          <Card key={d.id} className={classes.root2}>
            <CardActionArea>
              {d.image ? (
                <CardMedia
                  className={classes.media}
                  image={d.image as string}
                  title="Contemplative Reptile"
                />
              ) : (
                <CardMedia
                  className={classes.media}
                  image="https://res.cloudinary.com/rchain/image/upload/v1602745827/No-Image-Available1.png"
                  title="Contemplative Reptile"
                />
              )}

              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Schedled for:
                  {moment(new Date(d.schedlue)).format("dddd, MMMM YYYY HH:mm")}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {d.text}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary">
                Deelete
              </Button>
            </CardActions>
          </Card>
        ))}
      </TabPanel>
    </div>
  );
};

export default TabComponent;
