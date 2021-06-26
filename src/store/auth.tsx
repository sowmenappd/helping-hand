import React, { createContext, useReducer } from "react";
import produce from "immer";
import { useContext } from "react";
import { AUTH_ACTIONS, Dispatch } from "./types";
import AuthController from "../controller/auth";

export const initialState: any = {
  username: "sowmenr1",
  password: "test1234",
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
      state.username = action.payload.username;
      state.first_name = action.payload.first_name;
      state.last_name = action.payload.last_name;
      state.bio = action.payload.bio;
      state.imgB64 = action.payload.imgB64;
      break;
    case AUTH_ACTIONS.LOGIN_FAILED:
      state.error = action.payload;
      state.loading = false;
      break;
    case AUTH_ACTIONS.SIGNUP:
      state.error = "";
      state.loading = true;
      break;
    case AUTH_ACTIONS.SIGNUP_SUCCESS:
      state.error = "";
      state.loading = false;
      break;
    case AUTH_ACTIONS.SIGNUP_FAILED:
      state.error = action.payload;
      state.loading = false;
      break;
  }

  console.log(action);
};

const AuthStoreProvider: React.FC<any> = (props) => {
  const [state, dispatch] = useReducer(produce(authReducer), initialState);

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
      payload: err.message,
    });
  }
};

export const signup = async (
  { username, password, confirm_password, first_name, last_name, imgB64 }: any,
  dispatch: (dispatchObj: Dispatch) => void,
  onSuccess: () => void
) => {
  dispatch({ type: AUTH_ACTIONS.SIGNUP });

  if (password != confirm_password) {
    return dispatch({
      type: AUTH_ACTIONS.SIGNUP_FAILED,
      payload: "Passwords do not match.",
    });
  }

  if (!username || username.length < 5) {
    return dispatch({
      type: AUTH_ACTIONS.SIGNUP_FAILED,
      payload: "Username must be at least 5 characters.",
    });
  }

  try {
    await AuthController.signup({
      first_name,
      last_name,
      username,
      password,
      imgB64,
    });

    dispatch({
      type: AUTH_ACTIONS.SIGNUP_SUCCESS,
      payload: "Signup successful!",
    });
    onSuccess?.();
  } catch (err) {
    console.log(err.message);
    dispatch({
      type: AUTH_ACTIONS.SIGNUP_FAILED,
      payload: err.message,
    });
  }
};
