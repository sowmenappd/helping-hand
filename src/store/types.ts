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
