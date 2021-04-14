import Home from "./Home";
import { TwitterHome } from "./twitter";
import { InstagramHome } from "./instagram";
import { FacebookHome } from "./facebook";
import { Route, BrowserRouter as Router, Link } from "react-router-dom";
import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import TwitterIcon from "@material-ui/icons/Twitter";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import HomeIcon from "@material-ui/icons/Home";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    title: {
      marginLeft: "10px",
      color: "white",
    },
    link: {
      textDecoration: "none",
    },
  })
);
const App = () => {
  return (
    <div>
      <Router>
        <NavBar />
        <Route exact path="/" component={Home} />
        <Route path="/twitter" component={TwitterHome} />
        <Route path="/instagram" component={InstagramHome} />
        <Route path="/facebook" component={FacebookHome} />
      </Router>
    </div>
  );
};

export default App;

const NavBar = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Link to="/" className={classes.link}>
            <Typography variant="h6" className={classes.title}>
              <HomeIcon />
            </Typography>
          </Link>

          <Link
            style={{ marginLeft: "30px" }}
            to="/facebook"
            className={classes.link}
          >
            <Typography variant="h6" className={classes.title}>
              <FacebookIcon />
            </Typography>
          </Link>

          <Link to="/twitter" className={classes.link}>
            <Typography variant="h6" className={classes.title}>
              <TwitterIcon />
            </Typography>
          </Link>
          <Link to="/instagram" className={classes.link}>
            <Typography variant="h6" className={classes.title}>
              <InstagramIcon />
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
};
