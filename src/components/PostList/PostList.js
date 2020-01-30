import React, { Component } from "react";
import Post from "./Post";
import getAllPosts from "../lib/api";
import Context from "../Context/Context";

export default class PostList extends Component {
  static contextType = Context;

  async componentDidMount () {
    try {
      let success = await getAllPosts();
      this.context.getAllPosts(success);
    } catch (e) {
      console.log(e);
    }
  };

  render() {

    return (
      <div>
        {this.context.posts.map((item, i) => {
          return <Post post={item} key={item._id} />;
        })}
      </div>
    );
  }
}
