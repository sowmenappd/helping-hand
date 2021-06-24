import React, { createContext, useReducer } from "react";
import produce from "immer";
import { useContext } from "react";

// export interface AuthState {
//   username?: string;
//   password?: string;
//   confirm_password?: string;
//   first_name?: string;
//   last_name?: string;
//   loading?: boolean;
//   error?: any;
//   token?: any;
//   refresh_token?: any;
// }

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

export interface AuthDispatch {
  type: string;
  payload: any;
}

const authReducer = (state: any, action: AuthDispatch) => {
  switch (action.type) {
    case "LOGIN":
      state.error = "";
      state.loading = true;
      break;
    case "SIGNUP":
      state.error = "";
      state.loading = true;
      break;
    case "FIELD":
      state[action.payload.field] = action.payload.value;
      state.error = "";
      break;
    case "LOGIN_SUCCESS":
      state.error = "";
      state.loading = false;
      state.token = action.payload.token;
      state.refresh_token = action.payload.refresh_token;
      break;
    case "LOGIN_FAILED":
      state.error = action.payload;
      state.loading = false;
      break;
    case "SIGNUP":
      state.error = "";
      state.loading = true;
      break;
    case "SIGNUP_SUCCESS":
      state.error = "";
      state.loading = false;
      break;
    case "SIGNUP_FAILED":
      console.log(action.payload);
      state.error = action.payload;
      state.loading = false;
      break;
  }
  console.log(action);
};

const AuthContext = createContext(initialState);

const AuthStateProvider: React.FC<any> = (props) => {
  const [state, dispatch] = useReducer(produce(authReducer), initialState);

  return (
    <AuthContext.Provider value={[state, dispatch]}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthStateProvider;

export const useAuthContext = () => {
  return useContext(AuthContext);
};
