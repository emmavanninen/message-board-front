import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import Nav from "./components/Nav/Nav";
import Context from "./components/Context/Context";
import UserProfile from "./components/UserProfile/UserProfile";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

const Home = React.lazy(() => import("./components/Home/Home"));
const SignIn = React.lazy(() => import("./components/Sign/SignIn"));
const SignUp = React.lazy(() => import("./components/Sign/SignUp"));

export default class MainRouter extends Component {
  static contextType = Context;

  render() {
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
