import React, { Component } from "react";
import Post from "./Post";
import { getAllPosts } from "../lib/api";
import Context from "../Context/Context";

export default class PostList extends Component {
  static contextType = Context;

  state = {
    posts: [],
    newPost: {}
  }

  componentDidMount = async () => {
    try {
      let success = await getAllPosts();

      for (let post of success) {
        this.setState({ posts: [...this.state.posts, post] });
      }
    } catch (e) {
      console.log(e);
    }
  };

//   handleNewPost = async(post) => {
//       try {
//           let success = await getAllPosts();

//           for (let post of success) {
//               this.setState({ posts: [...this.state.posts, post] });
//           }
//       } catch (e) {
//           console.log(e);
//       }
//       this.context.newPost = []
//   };

  render() {
    const { newPost } = this.context;
    
    if (newPost.length) {
      this.setState({
          newPost: newPost[0]
      })
    }

    return (
      <div>
        {this.state.posts
          .slice(0)
          .reverse()
          .map((item, i) => {
            return <Post post={item} key={i} />;
          })}
      </div>
    );
  }
}
