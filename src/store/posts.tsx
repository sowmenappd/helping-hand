import React, { createContext, useContext, useReducer } from "react";
import produce from "immer";
import { Dispatch } from "./types";

const initialState: any = {
  posts: [],
  currentPost: null,
};

const PostsContext = createContext(initialState);
export const usePostsContext = () => {
  return useContext(PostsContext);
};

const postsReducer = (state: any, action: Dispatch) => {
  switch (action.type) {
    default:
      return state;
  }
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
