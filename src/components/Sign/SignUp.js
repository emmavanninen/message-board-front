import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Card, CardActions, CardContent } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ErrorIcon from "@material-ui/icons/Error";
import { red } from "@material-ui/core/colors";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { signup } from "../lib/api";
import Context from "../Context/Context";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@material-ui/core";
import { Link } from "react-router-dom";

const styles = theme => ({
  card: {
    maxWidth: 600,
    margin: "auto",
    textAlign: "center",
    marginTop: theme.spacing(5),
    paddingBottoms: theme.spacing(2)
  },
  error: { verticalAlign: "middle" },
  title: {
    marginTop: theme.spacing(2),
    color: theme.palette.openTitle
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300
  },
  submit: {
    margin: "auto",
    marginBottom: theme.spacing(2)
  },
  link: {
    textDecoration: "none"
  }
});

class SignUp extends Component {
  static contextType = Context;

  state = {
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    open: false,
    error: ""
  };

  componentDidMount() {
    ValidatorForm.addValidationRule("isPasswordMatch", value => {
      if (value !== this.state.password) {
        return false;
      } else {
        return true;
      }
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.context.isAuth && this.context.user) {
      this.props.history.push("/");
    }
  }

  //! make sure func doens't keep running in the back, "memory leak"
  componentWillUnmount() {
    ValidatorForm.removeValidationRule("isPasswordMatch");
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleSubmit = async event => {
    event.preventDefault();

    let userInfo = {
      username: this.state.username,
      password: this.state.password,
      email: this.state.email
    };

    try {
      await signup(userInfo);

      this.setState({
        error: false,
        open: true
      });
    } catch (e) {
      this.setState({
        error: e
      });
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <>
        <ValidatorForm onSubmit={this.handleSubmit}>
          <Card className={classes.card}>
            <CardContent>
              <Typography
                type="headline"
                variant="h5"
                className={classes.title}
              >
                Sign up
              </Typography>

              <TextValidator
                id="email"
                type="email"
                label="Email"
                className={classes.textField}
                value={this.state.email}
                onChange={this.handleChange("email")}
                margin="normal"
                validators={["required"]}
                errorMessages={["this field is required"]}
              />
              <br />
              <TextValidator
                id="username"
                type="text"
                label="Username"
                className={classes.textField}
                value={this.state.username}
                onChange={this.handleChange("username")}
                margin="normal"
                validators={["required"]}
                errorMessages={["this field is required"]}
              />
              <br />
              <TextValidator
                password="password"
                type="password"
                label="Password"
                className={classes.textField}
                value={this.state.password}
                onChange={this.handleChange("password")}
                margin="normal"
                //TODO uncomment
                // validators={[
                //   "minStringLength:12",
                //   "maxStringLength:20",
                //   "matchRegexp:(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[#$^+=!*()@%])"
                // ]}
                // errorMessages={[
                //   "Minimum of 12 characters",
                //   "Cannot be longer than 20 characters",
                //   "Password must contain one uppercase, one lowercase, a number and a special character"
                // ]}
              />
              <br />
              <TextValidator
                password="confirm-password"
                type="password"
                label="Confirm Password"
                className={classes.textField}
                value={this.state.confirmPassword}
                onChange={this.handleChange("confirmPassword")}
                margin="normal"
                //TODO uncomment
                // validators={[
                //   "minStringLength:12",
                //   "maxStringLength:20",
                //   "isPasswordMatch"
                // ]}
                // errorMessages={[
                //   "Minimum of 12 characters",
                //   "Cannot be longer than 20 characters",
                //   "Passwords don't match"
                // ]}
              />

              {this.state.error && (
                <Typography variant="subtitle2" color="error">
                  <ErrorIcon
                    style={{ color: red[500] }}
                    className={classes.error}
                  />
                  {this.state.error}
                </Typography>
              )}
            </CardContent>
            <CardActions>
              <Button
                type="submit"
                color="primary"
                variant="contained"
                className={classes.submit}
              >
                Submit
              </Button>
            </CardActions>
          </Card>
        </ValidatorForm>
        <Dialog open={this.state.open} disableBlackdropClick={true}>
          <DialogTitle>New Account</DialogTitle>
          <DialogContent>
            <DialogContentText>
              New account successfully created
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Link to="/sign-in" className={classes.link}>
              <Button
                color="primary"
                autoFocus="autoFocus"
                variant="contained"
                className={classes.submit}
              >
                Sign in
              </Button>
            </Link>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

export default withStyles(styles)(SignUp);
