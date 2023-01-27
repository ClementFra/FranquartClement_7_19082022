import axios from "../../interceptors/axios";
import { setPosts, setDeletePost, setLikePost} from "../../reducers/postReducer";

const readAllPosts = () => {
  return async () => {
    try {
      const res = await axios.get("/post");
      return setPosts(res.data);
    } catch (error) {
      console.log(error);
    }
  };
};

const createPost = (data) => {
  return async () => {
    try {
      await axios.post("/post", data);
    } catch (error) {
      console.log(error);
    }
  };
};

const updatePost = (post_id, data) => {
  return async () => {
    try {
      await axios.put(`post/${post_id}`, data);
    } catch (error) {
      console.log(error);
    }
  };
};

const deletePost = (post_id) => {
  return async () => {
    try {
      await axios.delete(`post/${post_id}`);
      return setDeletePost({ post_id });
    } catch (error) {
      console.log(error);
    }
  };
};

const createComment = (post_id, content) => {
  return async () => {
    try {
      await axios.post(`comment/${post_id}`, { content });
    } catch (error) {
      console.log(error);
    }
  };
};

const likePost = (post_id, user_id) => {
  return async () => {
    try {
      await axios.post(`${post_id}/like`, { user_id });
      return setLikePost({ post_id, user_id });
    } catch (error) {
      console.log(error);
    }
  };
};


export {readAllPosts, createPost, updatePost, deletePost, createComment, likePost};