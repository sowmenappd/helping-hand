import React, { createContext, useEffect, useReducer, useState } from "react";
import produce from "immer";
import { useContext } from "react";
import { AUTH_ACTIONS, Dispatch } from "./types";
import AuthController from "../controller/auth";

const getState = () => {
  const state = localStorage.getItem("p:auth");
  if (state && state !== "undefined") {
    return JSON.parse(state);
  }
  return null;
};

export const initialState: any = getState() || {
  username: "",
  password: "",
  imgB64: "",
  confirm_password: "",
  first_name: "",
  last_name: "",
  loading: false,
  error: "",
  token: "",
  refresh_token: "",
  bio: "",
};

const AuthContext = createContext(initialState);

export const useAuthContext = () => {
  return useContext(AuthContext);
};

const authReducer = (state: any, action: Dispatch) => {
  switch (action.type) {
    case AUTH_ACTIONS.LOGIN:
      state.error = "";
      state.loading = true;
      break;
    case AUTH_ACTIONS.SIGNUP:
      state.error = "";
      state.loading = true;
      break;
    case AUTH_ACTIONS.FIELD:
      state[action.payload.field] = action.payload.value;
      state.error = "";
      break;
    case AUTH_ACTIONS.LOGIN_SUCCESS:
      state.error = "";
      state.loading = false;
      state.token = action.payload.token;
      state.refresh_token = action.payload.refresh_token;
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.first_name = action.payload.first_name;
      state.last_name = action.payload.last_name;
      state.bio = action.payload.bio;
      state.imgB64 = action.payload.imgB64;
      localStorage.setItem("p:auth", JSON.stringify(state));
      break;
    case AUTH_ACTIONS.LOGIN_FAILED:
      state.error = {
        // [action.payload.field]: true,
        message: action.payload.message,
      };
      state.loading = false;
      break;
    case AUTH_ACTIONS.LOGOUT:
      state = initialState;
      localStorage.setItem("p:auth", "");

      break;
    case AUTH_ACTIONS.SIGNUP:
      state.error = {};
      state.loading = true;
      break;
    case AUTH_ACTIONS.SIGNUP_SUCCESS:
      state.error = {};
      state.loading = false;
      break;
    case AUTH_ACTIONS.SIGNUP_FAILED:
      state.error = {
        ...state.error,
        [action.payload.field]: true,
        message: state.error.message || action.payload.message,
      };
      state.loading = false;
      break;
  }
  console.log(action);
};

const AuthStoreProvider: React.FC<any> = (props) => {
  const [state, dispatch] = useReducer(produce(authReducer), initialState);

  // useEffect(() => {
  //   localStorage.setItem("p:auth", JSON.stringify(state));
  // }, [state]);

  return (
    <AuthContext.Provider value={[state, dispatch]}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthStoreProvider;

////////////////////////////////////////////////////////////

//                    DISPATCH FUNCTIONS

////////////////////////////////////////////////////////////

export const login = async (
  { username, password }: any,
  dispatch: (dispatchObj: Dispatch) => void,
  onSuccess: () => void
) => {
  try {
    dispatch({ type: AUTH_ACTIONS.LOGIN });

    const res = await AuthController.login({ username, password });
    dispatch({
      type: AUTH_ACTIONS.LOGIN_SUCCESS,
      payload: {
        ...res,
      },
    });
    onSuccess();
  } catch (err) {
    console.log(err.message);
    dispatch({
      type: AUTH_ACTIONS.LOGIN_FAILED,
      payload: { message: err.message },
    });
  }
};

export const logout = (dispatch: (obj: Dispatch) => void) => {
  localStorage.setItem("p:auth", "");
  dispatch({
    type: AUTH_ACTIONS.LOGOUT,
  });
};

export const signup = async (
  {
    username,
    email,
    password,
    confirm_password,
    first_name,
    last_name,
    imgB64,
  }: any,
  dispatch: (action: Dispatch) => void,
  onSuccess: () => void
) => {
  let valid = true;

  if (!first_name) {
    dispatch({
      type: AUTH_ACTIONS.SIGNUP_FAILED,
      payload: {
        field: "first_name",
        message: "First name cannot be empty.",
      },
    });
    valid = false;
  }

  if (!last_name) {
    dispatch({
      type: AUTH_ACTIONS.SIGNUP_FAILED,
      payload: {
        field: "last_name",
        message: "Last name cannot be empty.",
      },
    });
    valid = false;
  }

  if (!email) {
    dispatch({
      type: AUTH_ACTIONS.SIGNUP_FAILED,
      payload: {
        field: "email",
        message: "A valid email must be provided.",
      },
    });
    valid = false;
  }

  if (!username || username.length < 5) {
    dispatch({
      type: AUTH_ACTIONS.SIGNUP_FAILED,
      payload: {
        field: "username",
        message: "Username must be at least 5 characters.",
      },
    });
    valid = false;
  }

  if (password.length < 6) {
    dispatch({
      type: AUTH_ACTIONS.SIGNUP_FAILED,
      payload: {
        field: "password",
        message: "Password must be at least 6 characters in length.",
      },
    });
    valid = false;
  }

  if (password != confirm_password) {
    dispatch({
      type: AUTH_ACTIONS.SIGNUP_FAILED,
      payload: { field: "password", message: "Passwords do not match." },
    });
    valid = false;
  }

  if (!valid) return;

  dispatch({ type: AUTH_ACTIONS.SIGNUP });
  try {
    await AuthController.signup({
      email,
      username,
      password,
      first_name,
      last_name,
      imgB64,
    });

    dispatch({
      type: AUTH_ACTIONS.SIGNUP_SUCCESS,
    });
    onSuccess();
  } catch (err) {
    console.log(err.message);
    dispatch({
      type: AUTH_ACTIONS.SIGNUP_FAILED,
      payload: { field: "form", message: "Signup failed." },
    });
  }
};
