import React, { createContext, useContext, useReducer } from "react";
import produce from "immer";
import { Dispatch, POST_ACTIONS } from "./types";

import PostController from "../controller/posts";

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
  isViewingPost: false,
  viewPost: null,
  messages: {
    data: [],
    loading: false,
    error: false,
  },
};

const PostsContext = createContext(initialState);
export const usePostsContext = () => {
  return useContext(PostsContext);
};

const postsReducer = (state: any, action: Dispatch) => {
  switch (action.type) {
    case POST_ACTIONS.SET_POST_AUTHOR:
      state.currentPost.username = action.payload.username;
      state.currentPost.author = action.payload.author;
      console.log(state.currentPost);
      break;
    case POST_ACTIONS.SET_POST_TYPE:
      state.currentPost.type = action.payload;
      break;
    case POST_ACTIONS.ADD_POST:
      state.currentPost.datetimeISO = new Date().toISOString();
      state.posts.loading = true;
      break;
    case POST_ACTIONS.ADD_POST_SUCCESS:
      state.currentPost = {};
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
    case POST_ACTIONS.SEARCH_POSTS:
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
    case POST_ACTIONS.VIEW_POST:
      state.isViewingPost = true;
      state.viewPost = action.payload;
      break;
    case POST_ACTIONS.HIDE_VIEW_POST:
      state.isViewingPost = false;
      state.viewPost = null;
      break;
    case POST_ACTIONS.FETCH_VIEW_POST_MESSAGES:
      state.messages.data = [];
      state.messages.loading = true;
      state.messages.error = false;
      break;
    case POST_ACTIONS.FETCH_VIEW_POST_MESSAGES_SUCCESS:
      state.messages.data = action.payload;
      state.messages.loading = false;
      break;
    case POST_ACTIONS.FETCH_VIEW_POST_MESSAGES_ERROR:
      state.messages.error = true;
      state.messages.loading = false;
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

////////////////////////////////////////////////////////////

//                    DISPATCH FUNCTIONS

////////////////////////////////////////////////////////////

export const addPost = async (
  post: any,
  type: "help" | "social",
  token: string,
  dispatch: (obj: Dispatch) => void
) => {
  if (!post.title || !post.description) return;

  dispatch({
    type: POST_ACTIONS.ADD_POST,
  });
  try {
    await PostController.addPost(post, token);
    dispatch({
      type: POST_ACTIONS.ADD_POST_SUCCESS,
    });
    fetchPosts(type, post.username, dispatch, token);
  } catch (err) {
    dispatch({
      type: POST_ACTIONS.ADD_POST_ERROR,
      // TODO: add error messag as payload to show as a toast notification
    });
    console.log(err);
  }
};

export const addPostMessage = async (
  postId: string,
  postOwner: string,
  username: string,
  message: string,
  firstTime: boolean,
  dispatch: (obj: Dispatch) => void,
  token: string
) => {
  PostController.addPostMessage(
    postId,
    postOwner,
    message,
    username,
    firstTime,
    token
  )
    .then(() => {
      return fetchPostMesssages(postId, dispatch, token);
    })
    .catch((err) => console.log(err));
};

export const fetchPosts = async (
  type: "help" | "social",
  ownUsername: string,
  dispatch: (dispatchObj: Dispatch) => void,
  token: string
) => {
  dispatch({
    type: POST_ACTIONS.FETCH_POSTS,
    payload: { type },
  });

  try {
    const { data } = await PostController.fetchPosts(type, ownUsername, token);
    console.log(data);
    dispatch({
      type: POST_ACTIONS.FETCH_POSTS_SUCCESS,
      payload: data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const fetchPostMesssages = async (
  postId: string,
  dispatch: (dispatchObj: Dispatch) => void,

  token: string
) => {
  return PostController.fetchPostMessages(postId, token)
    .then(({ data }) => {
      dispatch({
        type: POST_ACTIONS.FETCH_VIEW_POST_MESSAGES_SUCCESS,
        payload: data,
      });
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: POST_ACTIONS.FETCH_VIEW_POST_MESSAGES_ERROR,
      });
    });
};

export const searchPosts = async (
  searchText: string,
  dispatch: (obj: Dispatch) => void,
  token: string
) => {
  if (searchText.length < 4) return;
  dispatch({
    type: POST_ACTIONS.SEARCH_POSTS,
  });
  PostController.search(searchText, token)
    .then(({ data }) => {
      dispatch({
        type: POST_ACTIONS.FETCH_POSTS_SUCCESS,
        payload: data,
      });
      console.log(data);
    })
    .catch((err) => {
      dispatch({
        type: POST_ACTIONS.FETCH_POSTS_ERROR,
      });
      console.log(err);
    });
};
