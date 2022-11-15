import { DELETE_POST, GET_POSTS, LIKE_POST, UNLIKE_POST, GET_LIKES, UPDATE_POST, DELETE_COMMENT } from '../actions/post.actions';

const initialState = {};

export default function postReducer(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
      // Get all post.
      return action.payload;
    case LIKE_POST:
      // If user like the post, add the id.
      return state.map((post) => {
        if (post.id === action.payload.Post.id) {
          post.Likes.push(action.payload.Post.Like.UserId);
        }
        return post;
      })
    case UNLIKE_POST:
      // Delete the id user of the likes post.
      return state.map((post) => {
        if (post.id === action.payload.Post.id) {
          post.Likes.splice(post.Likes.indexOf(action.payload.Post.Like.UserId), 1);
        }
        return post;
      })
    case GET_LIKES:
      // Get likes of post.
      return state.map((post) => {
        action.payload.forEach((like) => {
          return like;
        })
        return post;
      })
    case UPDATE_POST:
      // Upload post an return the post.
      return state.map(post => {
        if (post.id === action.payload.postId) {
          return {
            ...post,
            message: action.payload.message,
          };
        } else return post;
      });
    case DELETE_POST:
      // Delete post with comment.
      return state.filter(post => post.id !== action.payload.postId);
    case DELETE_COMMENT:
      // Delete comment and return the post with no comment.
      return state.map(post => {
        if (post.id === action.payload.postId) {
          post.Comments = post.Comments.filter(comment => comment.id !== action.payload.commentId);
          return post;
        }
        return post;
      });
    default:
      return state;
  }
}