import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import Nav from "./components/Nav/Nav";
import Home from "./components/Home/Home";
import SignIn from "./components/Sign/SignIn";
import SignUp from "./components/Sign/SignUp";
import Context from "./components/Context/Context";
import UserProfile from "./components/UserProfile/UserProfile";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

export default class MainRouter extends Component {
  static contextType = Context;

  render() {
    const { isAuth } = this.context;

    

    return (
      <div>
        <Nav theme={this.props.theme} />
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route exact path="/sign-in" component={SignIn}></Route>
          <Route exact path="/sign-up" component={SignUp}></Route>

          <PrivateRoute exact path="/user-profile" component={UserProfile} />

          {/* //! or:
          <Route exact path="/" component={Home}></Route>
          {isAuth ? (
            <>
              <div>You're logged in, poophead</div>
              <Route exact path="/user-profile" component={UserProfile}></Route>
            </>
          ) : (
            <>
              <Route exact path="/sign-in" component={SignIn}></Route>
              <Route exact path="/sign-up" component={SignUp}></Route>
            </>
          )} */}
        </Switch>
      </div>
    );
  }
}
