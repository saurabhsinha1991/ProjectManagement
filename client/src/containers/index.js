import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Header from "../components/Header";
import PrivateRoute from "./PrivateRoute";
import useFindUser from "../hooks/useFindUser";
import { UserContext } from "../hooks/UserContext";
import Home from "./Home";
import Login from "./Login";

function Main() {
    const { user, loading, setUser, findUser } = useFindUser();

    return (
        <UserContext.Provider value={{ user, setUser, findUser }}>
            {user && (
                <Header />
            )}
            <Router>
                {!loading && (
                    <Switch>
                        <Route component={Login} path="/login" />
                        <PrivateRoute component={Home} path="/" />
                    </Switch>
                )}
            </Router>
        </UserContext.Provider>
    )
}

export default Main;
