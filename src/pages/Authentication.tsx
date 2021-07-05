import React, { useEffect } from "react";
import Layout from "../components/Layout";

import AuthModule from "../components/AuthModule";
import { useHistory } from "react-router-dom";
import { login, useAuthContext } from "../store/auth";

const Authentication = () => {
  const history = useHistory();

  const [authState, dispatch] = useAuthContext();
  const { token, refresh_token, username, password } = authState;

  useEffect(() => {
    if (token) {
      login({ username, password, refresh_token }, dispatch, () => {
        history.replace("/home");
      });
    }
  }, [history.location]);
  return (
    <Layout>
      <AuthModule />
    </Layout>
  );
};

export default Authentication;
