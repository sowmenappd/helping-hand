import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Authentication from "../pages/Authentication";
import Main from "../pages/Main";

const Layout = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Authentication />
        </Route>
        <Route path="/h" exact>
          <Main />
        </Route>
      </Switch>
    </Router>
  );
};

export default Layout;
