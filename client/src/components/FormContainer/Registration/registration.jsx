import React from "react";
import "./registration.css";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { registerUser } from "../../../actions/authAction.jsx";
import { connect } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

class Registration extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {},
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard/profile");
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps.errors.response.data.msg);
    console.log(nextProps.errors.response.status);
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
    if (nextProps.errors.response.status == 400) {
      console.log("asdfasdf");
      toast.info(`${nextProps.errors.response.data.msg}`, {
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

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
    };
    console.log(newUser);

    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="reg-contents">
        <form onSubmit={this.onSubmit}>
          <div className="row">
            <div className="col-25">Name</div>
            <div className="col-75">
              <input
                type="text"
                name="name"
                id="name"
                onChange={this.onChange}
                value={this.state.name}
                error={errors.name}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-25">Email</div>
            <div className="col-75">
              <input
                type="email"
                id="email"
                name="email"
                onChange={this.onChange}
                value={this.state.email}
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
              />
            </div>
          </div>

          <div className="row">
            <div className="col-25">Confirm Password</div>
            <div className="col-75">
              <input
                type="password"
                id="password2"
                name="password2"
                onChange={this.onChange}
                value={this.state.password2}
              />
            </div>
          </div>

          <div className="row">
            <input type="submit" value="Register" />
          </div>
          <div>
            have an account? <Link to="/login">Login</Link>
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

Registration.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { registerUser })(
  withRouter(Registration)
);
