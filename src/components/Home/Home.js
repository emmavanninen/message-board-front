import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Card, CardContent, CardMedia } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Context from "../Context/Context";

import Socialfeed from "../SocialFeed/SocialFeed";

const placeholder = "./toa-heftiba-6E7wzcusEDU-unsplash.jpg";

const styles = theme => ({
  card: {
    maxWidth: 600,
    margin: "auto",
    marginTop: theme.spacing(5)
  },
  title: {
    padding: `${theme.spacing(3)} ${theme.spacing(2.5)} ${theme.spacing(2)}`,
    color: theme.palette.text.secondary
  },
  media: {
    minHeight: 330
  }
});

class Home extends Component {
  static contextType = Context;

  render() {
    const { isAuth } = this.context;

    const { classes } = this.props;
    return (
      <div>
        {isAuth ? (
          <Grid container>
            <Grid item xs={7} sm={7}>
              <Socialfeed />
            </Grid>
            <Grid item xs={5} sm={5}>
              Another
            </Grid>
          </Grid>
        ) : (
          <Card className={classes.card}>
            <Typography
              type="headline"
              component="h2"
              className={classes.title}
            >
              Home
            </Typography>
            <CardMedia
              className={classes.media}
              image={placeholder}
              title="Poop Man"
            ></CardMedia>
            <CardContent>
              <Typography type="body1" componen="p">
                Welcome to Reddit before the real Reddit
              </Typography>
            </CardContent>
          </Card>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(Home);
