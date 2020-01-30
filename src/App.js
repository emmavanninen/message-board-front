import React, { Component } from "react";
import {
  BrowserRouter as Router
  // , Route, Switch, Link
} from "react-router-dom";

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { indigo, pink } from "@material-ui/core/colors";
import MainRouter from "./MainRouter";
import Context from "./components/Context/Context";
import getAllPosts, { checkTokenAuth } from "./components/lib/api";
import { getAllUsers } from "./components/lib/api";

import Spinner from "./components/Spinner/Spinner";

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
    newPost: [],
    posts: [],
    comments: []
  };

  componentDidMount() {
    let user = checkTokenAuth();

    if (user) {
      this.handleSignin(user);
    }
    this.getAllPosts();
    this.getAllUsers();
  }

  getAllPosts = async () => {
    try {
      let success = await getAllPosts();

      this.setState({
        posts: success
      });
    } catch (e) {
      console.log(e);
    }
  };

  getAllUsers = async () => {
    try {
      let success = await getAllUsers();

      this.setState({
        users: success
      });
    } catch (e) {
      console.log(e);
    }
  };

  createPost = post => {
    this.setState({
      posts: [post, ...this.state.posts]
    });
  };

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

  deletePost = deletedPost => {
    let filteredArr = this.state.posts.filter(
      post => deletedPost._id !== post._id
    );
    this.setState({
      posts: filteredArr
    });
  };

  render() {
    return (
      <Context.Provider
        value={{
          isAuth: this.state.isAuth,
          user: this.state.user,
          handleSignin: this.handleSignin,
          logout: this.logout,
          getAllPosts: this.getAllPosts,
          getAllUsers: this.getAllUsers,
          posts: this.state.posts,
          users: this.state.users,
          createPost: this.createPost,
          deletePost: this.deletePost
        }}
      >
        {" "}
        <Router>
          <React.Suspense fallback={<Spinner />}>
            <MuiThemeProvider theme={theme}>
              <MainRouter theme={theme} />
            </MuiThemeProvider>
          </React.Suspense>
        </Router>
      </Context.Provider>
    );
  }
}
