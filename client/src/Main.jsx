import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import PrivateRoute from "./components/privateRoute/privateRoute.jsx";
import Login from "./components/FormContainer/Login/login.jsx";
import Toolbar from "./components/Layout/Toolbar/Toolbar.jsx";
import Registration from "./components/FormContainer/Registration/registration.jsx";
import SideDrawer from "./components/Layout/SideDrawer/SideDrawer";
import Backdrop from "./components/Backdrop/Backdrop";
import BannerSearch from "./components/BannerSearch/BannerSearch";
import Footer from "./components/Layout/Footer/Footer.jsx";
import Addroom from "./components/FormComponent/form.component";
import Landing from './components/dashboard/landing.jsx';

class Main extends Component {
    state = {
        sideDrawerOpen: false,
    };

    drawerToggleClickHandler = () => {
        this.setState((prevState) => {
            return { sideDrawerOpen: !prevState.sideDrawerOpen };
        });
    };

    backdropClickHandler = () => {
        this.setState({ sideDrawerOpen: false });
    };

    bannerFormClickHandler = () => {};

    render() {
        let sideDrawer;
        let backdrop;

        if (this.state.sideDrawerOpen) {
            backdrop = <Backdrop click={this.backdropClickHandler} />;
        }

        return (
            <Router>
                <div className="App" style={{ height: "100%" }}>
                    <Toolbar
                        drawerClickHandler={this.drawerToggleClickHandler}
                    />
                    <SideDrawer show={this.state.sideDrawerOpen} />
                    {backdrop}
                    <Switch>
                        <Route path="/" exact component={BannerSearch} />
                        <Route path="/login" exact component={Login} />
                        <Route
                            path="/register"
                            exact
                            component={Registration}
                        />
                        <PrivateRoute
                            exact
                            path="/dashboard/form"
                            component={Addroom}
                        />
                        <PrivateRoute exact path="/dashboard/profile" component={Landing}/>
                    </Switch>
                    <Footer />
                </div>
            </Router>
        );
    }
}

export default Main;
