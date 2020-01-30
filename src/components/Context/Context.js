import React from "react";

export default React.createContext({
  isAuth: false,
  user: null,
  handleSignin: () => {},
  logout: () => {},
  posts: [],
  users: [],
  getAllPosts: () => {},
  getAllUsers: () => {},
  createPost: () => {},
  deletePost: () => {}
});
