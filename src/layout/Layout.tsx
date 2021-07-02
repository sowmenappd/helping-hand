import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";

import { useAuthContext } from "../store/auth";

import Authentication from "../pages/Authentication";
import Main from "../pages/MainPage";

const Layout = () => {
  const [auth] = useAuthContext();

  return (
    <Router>
      <Switch>
        <Route path="/home">
          {auth.token !== "" ? <Main /> : <Redirect to="/" />}
        </Route>
        <Route path="/" exact>
          <Authentication />
        </Route>
      </Switch>
    </Router>
  );
};

export default Layout;
