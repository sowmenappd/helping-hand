export interface Dispatch {
  type: string;
  payload: any;
}

export const AUTH_ACTIONS = {
  LOGIN: "LOGIN",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_FAILED: "LOGIN_FAILED",
  SIGNUP: "SIGNUP",
  SIGNUP_SUCCESS: "SIGNUP_SUCCESS",
  SIGNUP_FAILED: "SIGNUP_FAILED",
  FIELD: "FIELD",
};

export const POST_ACTIONS = {
  ADD_POST: "ADD_POST",
  ADD_POST_SUCCESS: "ADD_POST_SUCCESS",
  ADD_POST_ERROR: "ADD_POST_ERROR",
  EDIT_CURRENT_POST: "EDIT_CURRENT_POST",
  FETCH_POSTS: "FETCH_POSTS",
  FETCH_POSTS_SUCCESS: "FETCH_POSTS_SUCCESS",
  FETCH_POSTS_ERROR: "FETCH_POSTS_ERROR",
  SEARCH_POSTS: "SEARCH_POSTS",
  SET_POST_AUTHOR: "SET_POST_AUTHOR",
  SET_POST_TYPE: "SET_POST_TYPE",
  TOGGLE_TYPE: "TOGGLE_TYPE",
  VIEW_POST: "VIEW_POST",
  HIDE_VIEW_POST: "HIDE_VIEW_POST",
  FETCH_VIEW_POST_MESSAGES: "FETCH_VIEW_POST_MESSAGES",
  FETCH_VIEW_POST_MESSAGES_SUCCESS: "FETCH_VIEW_POST_MESSAGES_SUCCESS",
  FETCH_VIEW_POST_MESSAGES_ERROR: "FETCH_VIEW_POST_MESSAGES_ERROR",
};
