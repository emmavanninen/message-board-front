import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import HomeIcon from "@material-ui/icons/Home";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

import { NavLink, withRouter } from "react-router-dom";

import Context from "../Context/Context";

import "./Nav.css";

const styles = theme => ({
  grow: {
    flexGrow: 1
  },
  icon: { margin: theme.spacing(2.5), fontSize: 28 }
});

const isActive = (history, path) => {
  if (history.location.pathname === path) return { color: "#ffffff" };
  else return { color: "#000000" };
};

class Nav extends Component {
  //! access to the contexts
  static contextType = Context;




  render() {
    const { history, classes } = this.props;

    const { isAuth, logout } = this.context;

    let nav;

    if (isAuth) {
      nav = (
        <>
          <NavLink to="/user-profile" exact activeClassName="class-nav-link">
            <Button>{this.context.user.username}</Button>
          </NavLink>
          <NavLink
            onClick={logout}
            to="/"
            exact
            activeClassName="class-nav-link"
          >
            <Button>Logout</Button>
          </NavLink>
        </>
      );
    } else {
      nav = (
        <>
          <NavLink to="/sign-up" exact activeClassName="class-nav-link">
            <Button>Sign Up</Button>
          </NavLink>
          <NavLink to="/sign-in" exact activeClassName="class-nav-link">
            <Button>Sign In</Button>
          </NavLink>
        </>
      );
    }

    let activeHistoryStyleFunc;
    if (history.location.pathname === "/") {
      activeHistoryStyleFunc = isActive(history, "/");
    } else {
      activeHistoryStyleFunc = isActive(history, "/auth");
    }

    return (
      <AppBar position="static">
        <Toolbar type="title" color="inherit">
          <Typography>Poop kinda Reddit</Typography>

          {/* //! navlink nees to prop */}
          <NavLink to="/" exact>
            <IconButton aria-label="Home" className={classes.icon}>
              <HomeIcon style={activeHistoryStyleFunc} />
            </IconButton>
          </NavLink>
          {nav}
        </Toolbar>
      </AppBar>
    );
  }
}

export default withRouter(withStyles(styles)(Nav));
