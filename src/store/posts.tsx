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
  currentPost: {},
  currentPostsType: POST_TYPE.HELP,
};

const PostsContext = createContext(initialState);
export const usePostsContext = () => {
  return useContext(PostsContext);
};

const postsReducer = (state: any, action: Dispatch) => {
  switch (action.type) {
    case POST_ACTIONS.SET_POST_AUTHOR:
      state.currentPost.author = action.payload.author;
      console.log(state.currentPost);
      break;
    case POST_ACTIONS.SET_POST_TYPE:
      state.currentPost.type = action.payload;
      break;
    case POST_ACTIONS.ADD_POST:
      state.currentPost.datetimeISO = new Date().toISOString();
      console.log(state.currentPost);
      state.posts.loading = true;
      break;
    case POST_ACTIONS.ADD_POST_SUCCESS:
      state.currentPost = null;
      state.posts.loading = false;
      break;
    case POST_ACTIONS.ADD_POST_ERROR:
      state.currentPost = {};
      state.posts.loading = false;
      break;
    case POST_ACTIONS.EDIT_CURRENT_POST:
      state.currentPost[action.payload.field] = action.payload.value;
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
    case POST_ACTIONS.TOGGLE_TYPE:
      state.currentPostsType = action.payload;
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
