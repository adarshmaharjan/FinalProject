import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

/**
 * PrivateRoute.
 *
 * @param {Component} Component [Component the needs to be protected using private route]
 * @param {object} auth [User info as jwt to keep user logged in]
 * @param {object}
 */
const PrivateRoute = ({ component: Component, auth, ...res}) => (
    <Route 
    {...res}
    render={props => 
        auth.isAuthenticated === true ? (
        <Component {...props}/>
    ) : (
        <Redirect to="/login"/>
    )
    }  
    />
);

PropTypes.propTypes = {
    auth: PropTypes.object.isRequired
}


const mapStateToProps = state => ({
    auth:state.auth,
});


export default connect(mapStateToProps)(PrivateRoute);
