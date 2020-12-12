import React from "react";
import "./login.css";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../../actions/authAction.jsx";
import classnames from "classnames";

class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            errors: {},
        };
    }

   componentDidMount() {
       //if logged in and user navigates to login page, redirect to dashboard
       if (this.props.auth.isAuthenticated) {
           this.props.history.push({
               pathname: '/form',
               state: this.props.auth,
           });
       }
   }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push({
                pathname: '/form',
                state: nextProps.auth,
            });
        }
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors,
            });
        }
    }

    onChange = (e) => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = (e) => {
        e.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password,
        };
        this.props.loginUser(userData);
    };

    render() {
        const { errors } = this.state;
        return (
            <div className="login-contents">
                <form onSubmit={this.onSubmit}>
                    <div className="row">
                        <div className="col-25">Email</div>
                        <div className="col-75">
                            <input
                                type="email"
                                id="email"
                                name="email"
                                onChange={this.onChange}
                                value={this.state.email}
                                errors={errors.email}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-25">Password</div>
                        <div className="col-75">
                            <input
                                type="password"
                                id="password"
                                name="password"
                                onChange={this.onChange}
                                value={this.state.password}
                                autoComplete="on"
                            />
                        </div>
                    </div>
                    <div className="row">
                        <span className="red-text">
                            {errors.password}
                            {errors.passwordincorrect}
                        </span> 
                    </div>
                    <div className="row">
                        <input type="submit" value="Login"/>
                    </div>
                    <div>
                        Or <Link to="/register">Register</Link>
                    </div>
                </form>
            </div>
        );
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors,
});

export default connect(mapStateToProps, { loginUser })(Login);
