import React from "react";
import Layout from "../components/Layout";

import AuthModule from "../components/AuthModule";
import { useHistory } from "react-router-dom";
import { useAuthContext } from "../store/auth";

const Authentication = () => {
  const history = useHistory();

  const authState = useAuthContext();
  if (authState.token) {
    history.push("/home");
  }
  return (
    <Layout>
      <AuthModule />
    </Layout>
  );
};

export default Authentication;
