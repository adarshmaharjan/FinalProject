import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { logoutUser } from "../../../actions/authAction.jsx";
import DrawerToggleButton from "../SideDrawer/DrawerToggleButton";

import "./Toolbar.css";

const Toolbar = (props) => {
    const onLogoutClick = (e) => {
        e.preventDefault();
        props.logoutUser();
    };
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);
    if (!props.auth.isAuthenticated) {
        return (
            <header className="toolbar">
                <nav className="toolbar-nav">
                    <div className="toolbar-button">
                        <DrawerToggleButton click={props.drawerClickHandler} />
                    </div>
                    <Link to="/banner">
                        <div className="toolbar-logo">
                            <a href="/">
                                <img src="/images/main-logo.png" alt="logo" />
                            </a>
                        </div>
                    </Link>

                    <div className="toolbar-nav-items">
                        <ul>
                            <Link to="/">
                                <li>
                                    <a href="/">FOR RENT</a>
                                </li>
                            </Link>
                        </ul>
                    </div>
                    <div className="spacer"></div>
                    <Link to="/login">
                        <button
                            className="login-button"
                            click={props.formClickHandler}
                        >
                            Login/Sign-Up
                        </button>
                    </Link>
                </nav>
            </header>
        );
    } else {
        return (
            <header className="toolbar">
                <nav className="toolbar-nav">
                    <div className="toolbar-button">
                        <DrawerToggleButton click={props.drawerClickHandler} />
                    </div>
                    <Link to="/banner">
                        <div className="toolbar-logo">
                            <a href="/">
                                <img src="/images/main-logo.png" alt="logo" />
                            </a>
                        </div>
                    </Link>

                    <div className="toolbar-nav-items">
                        <ul>
                            <Link to="/">
                                <li>
                                    <a href="/">FOR RENT</a>
                                </li>
                            </Link>
                                <Link to="/dashboard/form">
                                <li>
                                    <a href="/">FOR OWNERS</a>
                                </li>
                            </Link>
                        </ul>
                    </div>
                    <div className="spacer"></div>
                    <Link to="/logout">
                        <button
                            className="logout-button"
                            onClick={onLogoutClick}
                        >
                            Logout
                        </button>
                    </Link>
                </nav>
            </header>
        );
    }
};
Toolbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(Toolbar);
