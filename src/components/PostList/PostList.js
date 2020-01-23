import React, { Component } from "react";
import Post from './Post'


export default class PostList extends Component {
  state = {
    posts: [
      {
        _id: 1,
        username: "hamster",
        text: "WOW WOW WOW"
      },
      {
        _id: 2,
        username: "Not a hamster",
        text: "HEHE HEHE HEHE "
      }
    ]
  };
  render() {
    return (
      <div>
        {this.state.posts.map((item, i) => {
          return <Post post={item} key={i} />;
        })}
      </div>
    );
  }
}
