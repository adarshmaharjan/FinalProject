import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { logoutUser } from "../../../actions/authAction.jsx";
import DrawerToggleButton from "../SideDrawer/DrawerToggleButton";
import { Container } from "react-bootstrap";
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
      <header>
        <Container>
          <div className="toolbar">
            <nav className="toolbar-nav">
              <div className="toolbar-logo">
                <a href="/">
                  <img src="./images/main-logo.png" alt="logo" />
                </a>
              </div>

              <div className="toolbar-nav-items">
                <ul>
                  <li>
                    <a href="/">FOR RENT</a>
                  </li>
                <Link to="/dashboard/form">
                  <li>
                    <a href="/">FOR OWNERS</a>
                  </li>
                </Link>
                </ul>
              </div>
              <div className="spacer" />

              <div className="toolbar-button">
                <DrawerToggleButton click={props.drawerClickHandler} />
              </div>
              <Link to="/login">
              <button className="login-button" click={props.formClickHandler}>
                Login/Sign-Up
              </button>
              </Link>
            </nav>
          </div>
        </Container>
      </header>
    );
  } else {
    return (
      <header>
        <Container>
          <div className="toolbar">
            <nav className="toolbar-nav">
              <div className="toolbar-logo">
                <a href="/">
                  <img src="./images/main-logo.png" alt="logo" />
                </a>
              </div>

              <div className="toolbar-nav-items">
                <ul>
                  <li>
                    <a href="/">FOR RENT</a>
                  </li>

                  <li>
                    <a href="/">FOR OWNERS</a>
                  </li>
                </ul>
              </div>
              <div className="spacer" />

              <div className="toolbar-button">
                <DrawerToggleButton click={props.drawerClickHandler} />
              </div>

              <button className="login-button" onClick={onLogoutClick}>
                Logout
              </button>
            </nav>
          </div>
        </Container>
      </header>
    );
  }
};

// export default Toolbar;
Toolbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Toolbar);
