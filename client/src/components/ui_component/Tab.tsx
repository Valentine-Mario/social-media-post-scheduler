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
  Grid,
} from "@material-ui/core";
import { fetchData } from "../../lib/api";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    marginTop: "30px",
    width: "90%",
    marginLeft: "5px",
  },
  root2: {
    width: "100%",
  },
  media: {
    height: 340,
  },
  paper: {
    height: 500,
    width: 200,
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
  social_media: string;
}

const TabComponent = ({
  pendingPost,
  sentPost,
  social_media,
}: TabComponentProps) => {
  const [value, setValue] = React.useState(0);
  const classes = useStyles();
  const handleChange = (_event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  let path: string;
  switch (social_media.toLowerCase()) {
    case "twitter":
      path = "/tw/delete/";
      break;
    case "facebook":
      path = "/fb/delete/";
      break;
    default:
      path = "/ig/delete/";
  }

  const deletePost = (uri: string) => {
    fetchData(uri).then((response) => {
      alert(response.message || response.err);
    });
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
        <Grid container className={classes.root2} spacing={2}>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              {pendingPost.map((d) => (
                <Grid xs={4} item key={d._id}>
                  <Card>
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
                          {moment(new Date(d.schedlue)).format(
                            "dddd, Do MMMM YYYY HH:mm"
                          )}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          {d.text}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      <Button
                        onClick={() => deletePost(path + d._id)}
                        size="small"
                        color="primary"
                      >
                        Delete
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Grid container className={classes.root2} spacing={2}>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              {sentPost.map((d) => (
                <Grid xs={4} item key={d._id}>
                  <Card>
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
                          {moment(new Date(d.schedlue)).format(
                            "dddd, Do MMMM YYYY HH:mm"
                          )}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          {d.text}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      <Button
                        onClick={() => deletePost(path + d._id)}
                        size="small"
                        color="primary"
                      >
                        Delete
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </TabPanel>
    </div>
  );
};

export default TabComponent;
