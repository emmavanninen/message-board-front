import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { indigo, pink } from "@material-ui/core/colors";
import MainRouter from "./MainRouter";
import Context from "./components/Context/Context";
import { checkTokenAuth } from "./components/lib/api";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#757de8",
      main: "#3f51b5",
      dark: "#002984"
    },
    secondary: {
      light: "#ff79b0",
      main: "#ff4081",
      dark: "#c60055"
    }
  },
  openTitle: indigo["400"],
  protectedTitle: pink["400"],
  type: "light"
});

export default class App extends Component {
  state = {
    isAuth: false,
    user: null,
    newPost: []
  };

  componentDidMount() {
    let user = checkTokenAuth();

    if (user) {
      this.handleSignin(user);
    }
  }

  handleSignin = userInfo => {
    this.setState({
      isAuth: true,
      user: {
        username: userInfo.username,
        id: userInfo.id
      }
    });
  };

  logout = () => {
    this.setState({
      isAuth: false,
      user: null
    });
    localStorage.removeItem("jwtToken-reddit");
  };

    handleNewPost = post => {
        console.log(post);
        this.setState({ newPost: [...this.state.newPost, post] })
        // this.context.newPost = post
        // console.log(this.context);
  };

  render() {
    console.log(`!!!`, this.state.newPost);

    return (
      <Context.Provider
        value={{
          isAuth: this.state.isAuth,
          user: this.state.user,
          handleSignin: this.handleSignin,
          logout: this.logout,
          handleNewPost: this.handleNewPost,
          newPost: this.state.newPost
        }}
      >
        {" "}
        <Router>
          <MuiThemeProvider theme={theme}>
            <MainRouter theme={theme} />
          </MuiThemeProvider>
        </Router>
      </Context.Provider>
    );
  }
}
