import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent } from "@material-ui/core";
import TwitterIcon from "@material-ui/icons/Twitter";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";

const useStyles = makeStyles({
  root: {
    width: "25%",
  },
  items: {
    display: "flex",
    marginLeft: "10px",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "50px",
  },
  icons: {
    color: "black",
  },
  link: {
    textDecoration: "none",
  },
});
const Home = () => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.items}>
        <Card className={classes.root} variant="outlined">
          <Link className={classes.link} to="/twitter">
            <CardContent className={classes.icons}>
              <TwitterIcon /> Twitter mgt page
            </CardContent>
          </Link>
        </Card>

        <Card
          style={{ marginLeft: "10px" }}
          className={classes.root}
          variant="outlined"
        >
          <Link className={classes.link} to="/facebook">
            <CardContent className={classes.icons}>
              <FacebookIcon /> Facebook mgt page
            </CardContent>
          </Link>
        </Card>

        <Card
          style={{ marginLeft: "10px" }}
          className={classes.root}
          variant="outlined"
        >
          <Link className={classes.link} to="/instagram">
            <CardContent className={classes.icons}>
              <InstagramIcon /> Instagram mgt page
            </CardContent>
          </Link>
        </Card>
      </div>
    </>
  );
};

export default Home;
