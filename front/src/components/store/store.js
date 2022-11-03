//import { persistReducer } from 'redux-persist'

export const useAuthStore = defineStore("store", {
  state: () => {
    return {
      posts: postsReducer,
      comments: commentsReducer,
      users: usersReducer,
    };
  },
});
