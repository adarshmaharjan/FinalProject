import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {logoutUser} from '../../actions/authAction.jsx';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {
  Button,
  NavDropdown,
  Form,
  FormControl,
  Navbar,
  Nav,
} from 'react-bootstrap';

const NavbarComp = props => {
  // const onLogoutClick = e => {
  //   e.preventDefault();
  // };
    return(
        <div>
            // code for navbar goes here
            <h1>This is a navbar</h1>
        </div>
    )
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {logoutUser})(NavbarComp);
