import React from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { Form, Button, Spinner } from "react-bootstrap";
import { resetPassword , resetPasswordToken} from "../../../actions/authAction.jsx";
import "react-toastify/dist/ReactToastify.css";
import "./ResetPassword.css";

class ResetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      oldPassword: "",
      newPassword: "",
      rePassword: "",
      isProcessing: false,
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount(){

    console.log(this.props.match.params.token);
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);

    if (nextProps.msg.message.status == 200 && this.props.auth.isAuthenticated) {
      this.props.history.push({
        pathname: "/profile",
        state: nextProps.auth,
      });
    }
   if (nextProps.msg.message.status == 200 && !this.props.auth.isAuthenticated) {
      this.props.history.push({
        pathname: "/login",
        state: nextProps.auth,
      });
    }
    // if (nextProps.errors.response.status == 403) {
    //   this.setState({ isProcessing: false });
    //   toast.info(`${nextProps.errors.response.data.msg}`, {
    //     position: "bottom-right",
    //     autoClose: 5000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //   });
    // }
    // if (nextProps.errors.response.status == 400) {
    //   this.setState({ isProcessing: false });
    //   toast.info(`${nextProps.errors.response.data.password2}`, {
    //     position: "bottom-right",
    //     autoClose: 5000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //   });
    // }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    console.log(this.props.auth.isAuthenticated);
    this.setState({ isProcessing: true });
    if (this.props.auth.isAuthenticated) {
      this.props.resetPassword(
        {
          oldPassword: this.state.oldPassword,
          newPassword: this.state.newPassword,
          rePassword: this.state.rePassword,
        },
        this.props.auth.user.id
      );
    } else {
      console.log(this.state.newPassword, this.state.rePassword);
      this.props.resetPasswordToken(
        {
          newPassword: this.state.newPassword,
          rePassword: this.state.rePassword,
        },
        this.props.match.params.token
      );
    }
  };

  render() {
    return (
      <div className="reset-password-container">
        <Form>
          {this.props.auth.isAuthenticated && (
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Enter Your Old Password</Form.Label>
              <Form.Control
                type="password"
                name="oldPassword"
                placeholder="Old Password"
                onChange={this.onChange}
              />
            </Form.Group>
          )}
          <Form.Group controlId="formBasicPassword">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              name="newPassword"
              placeholder="Password"
              onChange={this.onChange}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Re-Enter Password</Form.Label>
            <Form.Control
              type="password"
              name="rePassword"
              placeholder="Re-Enter Password"
              onChange={this.onChange}
            />
          </Form.Group>
          <div className="btn-flex-container">
            <Button variant="primary" type="submit" onClick={this.onSubmit}>
              {this.state.isProcessing === true && (
                <Spinner animation="border" className="spinner" />
              )}
              &nbsp; Reset Password
            </Button>
          </div>
        </Form>
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

ResetPassword.propTypes = {
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

export default connect(mapStateToProps, { resetPassword , resetPasswordToken})(ResetPassword);
