import Axios from "./Axios/Axios";
import jwt_decode from "jwt-decode";
//! automatically converts this.props.history
import { createBrowserHistory } from "history";
import setAuthToken from "./Axios/setAuthToken";

export const checkTokenAuth = () => {
  let jwtToken = localStorage.getItem("jwtToken-reddit");

  if (jwtToken) {
    let decoded = jwt_decode(jwtToken);
    const currentTime = Date.now() / 1000;

    if (decoded.exp < currentTime) {
      localStorage.removeItem(jwtToken);

      //! window is the dom (in a way the global object)
      // //! forcing browser to do a hard reload
      // window.location.href = '/sign-in'

      createBrowserHistory().push("/");

      setAuthToken(null);
    } else {
      setAuthToken(jwtToken);
      return decoded;
    }
  }
};

export const signup = async userInfo => {
  try {
    let success = await Axios.post("api/users/sign-up", userInfo);

    return success.data;
    //! or return Promise.resolve(success.data);
  } catch (e) {
    return e.response.data.message;
    // ! or return Promise.reject(e.response.data.message);
  }
};

export const signin = async userInfo => {
  try {
    let success = await Axios.post("api/users/sign-in", userInfo);
    const { token } = success.data;
    localStorage.setItem("jwtToken-reddit", token);
    let decodedJWT = jwt_decode(token);
    return decodedJWT;
  } catch (e) {
    return e.response.data.message;
  }
};

export const getAllUsers = async () =>{
    let jwtToken = localStorage.getItem("jwtToken-reddit");
    checkTokenAuth(jwtToken);
    try {
        let success = await Axios.get("api/users/get-all-users");
        return success.data;
    }
    catch (e) {
        return e.response.data.message;
    }
}

export default async () => {
    let jwtToken = localStorage.getItem("jwtToken-reddit");
    checkTokenAuth(jwtToken);
    try {
        let success = await Axios.get("api/post/get-all-posts");
        return success.data;
    }
    catch (e) {
        return e.response.data.message;
    }
};

export const createPost = async postInfo => {
  try {
    let success = await Axios.post("api/post/create-post", postInfo);
    return success.data;
  } catch (e) {
    return e.response.data.message;
  }
};


export const deletePost = async postid => {
  try {
    let success = await Axios.delete(`api/post/deletePost/${postid}`);

    return success.data;
  } catch (e) {
    return e.response.data.message;
  }
};

export const commentPost = async (postid, comment) => {
  let commentObj = {
    postid: postid,
    comment: comment
  };

  try {
    let success = await Axios.post(`api/post/comment-post`, commentObj);

    return success.data.comments;
  } catch (e) {
    return e.response.data.message;
  }
};

export const deleteComment = async (postID, commentID) => {
  try {
    let success = await Axios.delete(
      `api/post/delete-comment/${postID}/${commentID}`
    );
    return success.data.comments;
  } catch (e) {
    return e.response.data.message;
  }
};

export const likePost = async postID => {
  try {
    let success = await Axios.put(`api/post/like-post/${postID}`);

    return success.data;
  } catch (e) {
    console.log(e);
  }
};

export const deletePostLike = async postID => {
  try {
    let success = await Axios.delete(`api/post/delete-like/${postID}`);
    return success.data;
  } catch (e) {
    console.log(e);
  }
};
