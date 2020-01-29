import React, { Component } from "react";
import { CardHeader } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { commentPost, deleteComment } from "../lib/api";
import Context from "../Context/Context";
const styles = theme => ({
  cardHeader: {
    paddingTop: theme.spacing(),
    paddingBottom: theme.spacing()
  },
  smallAvatar: {
    width: 25,
    height: 25
  },
  commentField: {
    width: "96%"
  },
  commentText: {
    backgroundColor: "white",
    padding: theme.spacing(),
    margin: `2px ${theme.spacing(2)}px 2px 2px`
  },
  commentDate: {
    display: "block",
    color: "gray",
    fontSize: "0.8em"
  },
  commentDelete: {
    fontSize: "1.6em",
    verticalAlign: "middle",
    cursor: "pointer"
  },
  userLink: {
    textDecoration: "none"
  }
});

class Comments extends Component {
  static contextType = Context;

  state = { text: "" };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  deleteComment = async commentID => {
    try {
        let success = await deleteComment(this.props.postId, commentID)
        this.props.updateComments(success);
        // this.setState({
        //     text: ""
        // });
    } catch (e) {
      console.log(e);
    }
  };

  handleKeyDown = async e => {
    if (e.key === "Enter") {
      try {
        let success = await commentPost(this.props.postId, this.state.text);
        this.props.updateComments(success);
        this.setState({
          text: ""
        });
      } catch (e) {
        console.log(e);
      }
    }
  };

  render() {
    const { classes } = this.props;
    const { user } = this.context;

    const commentBody = item => {
      return (
        <p className={classes.commentText}>
          <Link to={""} className={classes.userLink}>
            {item.postedBy.username}
          </Link>
          <br />
          {item.text}
          <span className={classes.commentDate}>
            {item.created} |{" "}
            {item.postedBy._id === this.context.user.id && (
              <IconButton
                //! call id in callback
                onClick={() => {
                  this.deleteComment(item._id);
                }}
              >
                <DeleteIcon />
              </IconButton>
            )}
          </span>
        </p>
      );
    };
    return (
      <div>
        <CardHeader
          avatar={<Avatar className={classes.smallAvatar} src={""} />}
          title={
            <TextField
              multiline
              value={this.state.text}
              onChange={this.handleChange("text")}
              placeholder="Write something ..."
              className={classes.commentField}
              margin="normal"
              onKeyDown={this.handleKeyDown}
            />
          }
          className={classes.cardHeader}
        />
        {this.props.comments.map((item, i) => {
          return (
            <CardHeader
              avatar={<Avatar className={classes.smallAvatar} src={""} />}
              //   action={
              //     item.postedBy._id === this.context.user.id && (
              //       <IconButton onClick={this.deleteComment} className={item._id}>
              //         <DeleteIcon />
              //       </IconButton>
              //     )
              //   }
              title={commentBody(item)}
              className={classes.cardHeader}
              key={i}
            />
          );
        })}
      </div>
    );
  }
}
export default withStyles(styles)(Comments);
