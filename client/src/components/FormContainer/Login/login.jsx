import React from "react";
import "./login.css";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../../actions/authAction.jsx";
import classnames from "classnames";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errors: {},
    };
  }

  componentDidMount() {
    console.log(this.props);
    if (this.props.history.location.state) {
      toast.info(`🦄 ${this.props.history.location.state}`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

    if (this.props.msg.message.status == 200) {
      toast.info(`${this.props.msg.message.data.msg}`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

    //if logged in and user navigates to login page, redirect to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push({
        pathname: "/form",
        state: this.props.auth,
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);

    if (nextProps.auth.isAuthenticated) {
      this.props.history.push({
        pathname: "/profile",
        state: nextProps.auth,
      });
    } else {
      console.log(Object.keys(nextProps.errors).length === 0);
      if (Object.keys(nextProps.errors).length != 0) {
        if (
          nextProps.errors.response.status == 400
          // &&
          //         !nextProps.auth.isAuthenticated
        ) {
          toast.info(`Username or password incorrect`, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }

        if (nextProps.errors.response.status == 401) {
          toast.info(`Please verify your profile`, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }

        if (nextProps.errors.response.status == 404) {
          toast.info(`User does not exists`, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      }
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
    this.props.loginUser(userData, this.props);
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
            <input type="submit" value="Login" />
          </div>
          <div className="log-flex-container">
            Or <Link to="/register">Register</Link>
            <Link to="/resetPasswordLink">Forgot Password ?</Link>
          </div>
        </form>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  msg: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
  msg: state.msg,
});

export default connect(mapStateToProps, { loginUser })(Login);
