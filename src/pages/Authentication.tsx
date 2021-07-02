import React, { useEffect } from "react";
import Layout from "../components/Layout";

import AuthModule from "../components/AuthModule";
import { useHistory } from "react-router-dom";
import { useAuthContext } from "../store/auth";

const Authentication = () => {
  const history = useHistory();

  const [authState] = useAuthContext();

  useEffect(() => {
    if (authState.token) {
      history.replace("/home");
    }
  }, [history.location]);
  return (
    <Layout>
      <AuthModule />
    </Layout>
  );
};

export default Authentication;
