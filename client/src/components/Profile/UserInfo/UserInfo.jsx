import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Form, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "./UserInfo.css";
import axios from "axios";

const UserInfo = (props) => {
  const [info, setInfo] = useState({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchInfo = async (props) => {
      const res = await axios.get(
        `http://localhost:5000/api/profile/info/${props.auth.user.id}`
      );
      console.log(res.data);
      setName(res.data.name);
      setEmail(res.data.email);
      setInfo(res.data);
    };
    fetchInfo(props);
  }, [props]);

  function updateInfo(e) {
    e.preventDefault();
    let newInfo = {
      email: email,
      name: name,
    };
    axios
      .put(
        `http://localhost:5000/api/profile/updateUser/${props.auth.user.id}`,
        newInfo
      )
      .then((res) =>
        toast.info(`🦄 ${res.data.message}`, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      )
      .catch((err) => console.log(err));
  }

  return (
    <div className="user-info-container">
      <Form>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br />
        </Form.Group>
        <Form.Group>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={updateInfo}>
          UPDATE
        </Button>
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
};

UserInfo.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps)(withRouter(UserInfo));
