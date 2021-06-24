import React, { createContext, useReducer } from "react";
import produce from "immer";
import { useContext } from "react";
import { AUTH_ACTIONS, Dispatch } from "./types";

export const initialState: any = {
  username: "",
  password: "",
  confirm_password: "",
  first_name: "",
  last_name: "",
  loading: false,
  error: "",
  token: "",
  refresh_token: "",
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
