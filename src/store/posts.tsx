import React, { createContext, useContext, useReducer } from "react";
import produce from "immer";
import { Dispatch, POST_ACTIONS } from "./types";

export const POST_TYPE = {
  HELP: "help",
  SOCIAL: "social",
};

const initialState: any = {
  posts: {
    data: [],
    loading: true,
    error: false,
  },
  currentPost: null,
  currentPostsType: POST_TYPE.HELP,
};

const PostsContext = createContext(initialState);
export const usePostsContext = () => {
  return useContext(PostsContext);
};

const postsReducer = (state: any, action: Dispatch) => {
  switch (action.type) {
    case POST_ACTIONS.TOGGLE_TYPE:
      state.currentPostsType = action.payload;
      break;
    case POST_ACTIONS.FETCH_POSTS:
      state.currentPostsType = action.payload.type;
      state.posts.loading = true;
      state.posts.error = false;
      break;
    case POST_ACTIONS.FETCH_POSTS_SUCCESS:
      state.posts.data = action.payload;
      state.posts.loading = false;
      state.posts.error = false;
      break;
    case POST_ACTIONS.FETCH_POSTS_ERROR:
      state.posts = [];
      state.posts.loading = false;
      state.posts.error = true;
      break;
  }
  console.log(action);
};

const PostsStoreProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(produce(postsReducer), initialState);

  return (
    <PostsContext.Provider value={[state, dispatch]}>
      {children}
    </PostsContext.Provider>
  );
};

export default PostsStoreProvider;
