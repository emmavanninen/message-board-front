import React, { Component } from "react";
import { Card, CardActions, CardContent, CardHeader } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import ErrorIcon from "@material-ui/icons/Error";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import Notifications, { notify } from "react-notify-toast";
import Context from "../../Context/Context";
// import { createPost } from '../lib/api';
const errorToastColor = {
  background: "#f23535",
  text: "#fff"
};
const toastColor = {
  background: "#3f51b5",
  text: "#fff"
};
const styles = theme => ({
  root: {
    backgroundColor: "#efefef",
    padding: `${theme.spacing(3)}px 0px 1px`
  },
  card: {
    maxWidth: 600,
    margin: "auto",
    marginBottom: theme.spacing(3),
    backgroundColor: "rgba(65, 150, 136, 0.09)",
    boxShadow: "none"
  },
  cardContent: {
    backgroundColor: "white",
    paddingTop: 0,
    paddingBottom: 0
  },
  cardHeader: {
    paddingTop: 8,
    paddingBottom: 8
  },
  photoButton: {
    height: 30,
    marginBottom: 5
  },
  input: {
    display: "none"
  },
  textField: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    width: "90%"
  },
  submit: {
    margin: theme.spacing(2)
  },
  filename: {
    verticalAlign: "super"
  },
  imageName: {
    fontSize: 8,
    marginLeft: 5
  }
});
class NewPost extends Component {
  static contextType = Context;
  state = {
    text: "",
    photoName: "",
    error: ""
  };
  componentDidMount = () => {};
  handleSubmitPost = async event => {};
  handleChange = name => event => {
    this.setState({
      text: event.target.value
    });
  };
  handleFileUpload = event => {};
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Notifications options={{ zIndex: 200, top: "90px" }} />
        <Card className={classes.card}>
          <CardHeader
            avatar={<Avatar src={""} />}
            title={this.context.user.username}
            className={classes.cardHeader}
          />
          <CardContent className={classes.cardContent}>
            <TextField
              placeholder="Share your thoughts ..."
              multiline
              rows="3"
              value={this.state.text}
              onChange={this.handleChange("text")}
              className={classes.textField}
              margin="normal"
            />
            <input
              accept="image/*"
              onChange={this.handleFileUpload}
              className={classes.input}
              id="icon-button-file"
              type="file"
            />
            <label htmlFor="icon-button-file">
              <IconButton
                color="secondary"
                className={classes.photoButton}
                component="span"
              >
                <PhotoCameraIcon /> Your profile picture here
              </IconButton>
            </label>{" "}
            <span className={classes.filename}>
              {this.state.photo ? this.state.photo.name : ""}
            </span>
            {this.state.error && (
              <Typography component="p" color="error">
                <ErrorIcon color="error" className={classes.error}>
                  error
                </ErrorIcon>
                {this.state.error}
              </Typography>
            )}
          </CardContent>
          <CardActions>
            <Button
              color="primary"
              variant="contained"
              onClick={this.handleSubmitPost}
              className={classes.submit}
            >
              POST
            </Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}
export default withStyles(styles)(NewPost);
