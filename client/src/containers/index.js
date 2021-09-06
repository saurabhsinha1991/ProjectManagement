import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import Home from "./Home";
import Login from "./Login";

function Main() {
    return (
        <Router>
            <Switch>
                <Route component={Login} path="/login" />
                <PrivateRoute component={Home} path="/" />
            </Switch>
        </Router>
    )
}

export default Main;
