import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText
} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";
import VisibilityIcon from "@material-ui/icons/Visibility";
import Context from "../Context/Context";
import { getAllUsers, followUser } from "../lib/api";
const styles = theme => ({
  root: theme.mixins.gutters({
    padding: theme.spacing(1),
    margin: 0
  }),
  title: {
    margin: `${theme.spacing(3)}px ${theme.spacing(1)}px ${theme.spacing(2)}px`,
    color: theme.palette.openTitle,
    fontSize: "1em"
  },
  avatar: {
    marginRight: theme.spacing(1)
  },
  follow: {
    right: theme.spacing(2)
  },
  snack: {
    color: theme.palette.protectedTitle
  },
  viewButton: {
    verticalAlign: "middle"
  }
});
class AllUsers extends Component {
  static contextType = Context;

  state = {
    users: [],
    open: false
  };
  componentDidMount = async () => {
    try {
    } catch (e) {
      console.log(e);
    }
  };
  clickFollow = async (user, index) => {
    console.log("poop");

    try {
    } catch (e) {
      console.log(e);
    }
  };
  handleRequestClose = (event, reason) => {
    this.setState({ open: false });
  };
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Paper className={classes.root} elevation={4}>
          <Typography type="title" className={classes.title}>
            Follow People (not creepy way)
          </Typography>
          <List>
            {this.context.users.map((item, i) => {
              if (item._id !== this.context.user.id) {
                return (
                  <span key={i}>
                    <ListItem>
                      <ListItemAvatar className={classes.avatar}>
                        <Avatar src={"/api/users/photo/" + item._id} />
                      </ListItemAvatar>
                      <ListItemText primary={item.username} />
                      <ListItemSecondaryAction className={classes.follow}>
                        <Link to={"/user/" + item._id}>
                          <IconButton
                            variant="raised"
                            color="secondary"
                            className={classes.viewButton}
                          >
                            <VisibilityIcon />
                          </IconButton>
                        </Link>
                        <Button
                          aria-label="Follow"
                          variant="contained"
                          color="primary"
                          onClick={this.clickFollow.bind()}
                        >
                          Follow
                        </Button>
                      </ListItemSecondaryAction>
                    </ListItem>
                  </span>
                );
              }
            })}
          </List>
        </Paper>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right"
          }}
          open={this.state.open}
          onClose={this.handleRequestClose}
          autoHideDuration={6000}
          message={
            <span className={classes.snack}>{this.state.followMessage}</span>
          }
        />
      </div>
    );
  }
}
export default withStyles(styles)(AllUsers);
