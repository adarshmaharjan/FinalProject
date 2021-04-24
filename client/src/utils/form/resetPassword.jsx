import React from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { Form, Button, Spinner } from "react-bootstrap";
import { resetPasswordLink } from "../../../actions/authAction.jsx";
import "react-toastify/dist/ReactToastify.css";
import "./ResetPassword.css";

class EmailForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      isProcessing: false,
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);

    if (
      nextProps.errors.response.status == 403 ||
      nextProps.errors.response.status == 404
    ) {
      this.setState({ isProcessing: false });
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
    if (nextProps.errors.response.status == 400) {
      this.setState({ isProcessing: false });
      toast.info(`${nextProps.errors.response.data.password2}`, {
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
    console.log(e.target.name);
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    console.log(this.state.email);
    this.setState({ isProcessing: true });
    this.props.resetPasswordLink(
      {
        email: this.state.email,
      },
      this.props.auth.user.id
    );
  };

  render() {
    return (
      <div className="reset-password-container">
        <Form>
          {this.props.auth.isAuthenticated && 
           <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter email"
              onChange={this.onChange}
            />
            <Form.Text className="text-muted">
              Enter you email to get a password reset link
            </Form.Text>
          </Form.Group>
          }
                    <div className="btn-flex-container">
            <Button variant="primary" type="submit" onClick={this.onSubmit}>
              {this.state.isProcessing === true && (
                <Spinner animation="border" className="spinner" />
              )}
              &nbsp; Get Link
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

EmailForm.propTypes = {
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

export default connect(mapStateToProps, { resetPasswordLink })(EmailForm);
