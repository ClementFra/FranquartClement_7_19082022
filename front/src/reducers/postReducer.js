import { createSlice } from "@reduxjs/toolkit";

export const postSlice = createSlice({
  name: "post",
  initialState: {
    posts: null,
  },
  reducers: {
    setPosts: (state, { payload }) => {
      state.posts = payload;
    },
    setDeletePost: (state, { payload }) => {
      state.posts = state.posts.filter((id) => id.post_id !== payload.post_id);
    },
    setLikePost: (state, { payload }) => {
      state.posts = state.posts.map((post) => {
        if (post.post_id === payload.post_id) {
          return { ...post, Likes: [payload, ...post.Likes] };
        }

        return post;
      });
    },
  },
});

export const { setPosts, setDeletePost, setLikePost} = postSlice.actions;
export default postSlice.reducer;