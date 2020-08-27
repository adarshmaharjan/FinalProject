import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

/**
 * PrivateRoute.
 *
 * @param {}
 */
const PrivateRoute = ({components: Component, auth, ...res}) => (
    <Route 
    {...res}
    render={props => 
        auth.isAuthenticatd === true ? (
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
