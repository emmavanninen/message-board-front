import React, { Component } from "react";
import { Card, CardHeader, CardContent, CardActions } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import CommentIcon from "@material-ui/icons/Comment";
import Divider from "@material-ui/core/Divider";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import Comments from "./Comments";
import Context from "../Context/Context";
import { deletePost, likePost, deletePostLike, getLikes } from "../lib/api";

const styles = theme => ({
  card: {
    maxWidth: 600,
    margin: "auto",
    marginBottom: theme.spacing(3),
    backgroundColor: "rgba(0, 0, 0, 0.06)"
  },
  cardContent: {
    backgroundColor: "white",
    padding: `${theme.spacing(2)}px 0px`
  },
  cardHeader: {
    paddingTop: theme.spacing(),
    paddingBottom: theme.spacing()
  },
  text: {
    margin: theme.spacing(2)
  },
  photo: {
    textAlign: "center",
    backgroundColor: "#f2f5f4",
    padding: theme.spacing()
  },
  media: {
    height: 200
  },
  button: {
    margin: theme.spacing()
  }
});

class Post extends Component {
  static contextType = Context;

  state = {
    toggleLike: false,
    likes: this.props.post.likes.length,
    comments: []
  };

  componentDidMount() {
    this.setState({ comments: this.props.post.comments });
    this.checkLike();
  }

  checkLike = async likes => {
    for (let user of this.props.post.likes) {
      if (user === this.context.user.id) {
        this.setState({
          toggleLike: true
        });
      } else {
        this.setState({
          toggleLike: false
        });
      }
    }
  };

  like = async () => {
    if (!this.state.toggleLike) {
      let success = await likePost(this.props.post._id);
      try {
        await this.setState({
          toggleLike: true,
          likes: this.props.post.likes.length
        });
      } catch (e) {
        console.log(e);
      }
    } else if (this.state.toggleLike) {
      let success = await deletePostLike(this.props.post._id);
      try {
        await this.setState({
          toggleLike: false,
          likes: this.props.post.likes.length
        });
      } catch (e) {
        console.log(e);
      }
    }
  };

  updateComments = comments => {
    console.log(`!!!`, comments);

    this.setState({
      comments: comments
    });
  };

  deletePost = async () => {
    try {
      let success = await deletePost(this.props.post._id);
      this.context.deletePost(success);
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={<Avatar src={""} />}
          action={
            this.props.post.postedBy._id === this.context.user.id && (
              <IconButton onClick={this.deletePost}>
                <DeleteIcon />
              </IconButton>
            )
          }
          title={<Link to={""}>{this.props.post.postedBy.username}</Link>}
          subheader={this.props.post.created}
          className={classes.cardHeader}
        />
        <CardContent className={classes.cardContent}>
          <Typography component="p" className={classes.text}>
            {this.props.post.text}
          </Typography>
          {this.props.post.photo && (
            <div className={classes.photo}>
              <img
                className={classes.media}
                src={this.props.post.photo}
                alt="something"
              />
            </div>
          )}
        </CardContent>
        <CardActions>
          {this.state.toggleLike ? (
            <IconButton
              onClick={this.like}
              className={classes.button}
              aria-label="Like"
              color="secondary"
            >
              <FavoriteIcon />
            </IconButton>
          ) : (
            <IconButton
              onClick={this.like}
              className={classes.button}
              aria-label="Unlike"
              color="secondary"
            >
              <FavoriteBorderIcon />
            </IconButton>
          )}{" "}
          <span>{this.state.likes}</span>
          <IconButton
            className={classes.button}
            aria-label="Comment"
            color="secondary"
          >
            <CommentIcon />
          </IconButton>{" "}
          <span>{this.state.comments.length}</span>
        </CardActions>
        <Divider />
        <Comments
          postId={this.props.post._id}
          comments={this.state.comments}
          updateComments={this.updateComments}
        />
      </Card>
    );
  }
}
export default withStyles(styles)(Post);
