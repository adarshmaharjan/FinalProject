import React, { useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { connect } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import Model from "./Modal/Modal.jsx";
import { Link } from "react-router-dom";

async function fetchUserComments(props) {
  return axios
    .get(`/api/profile/loadComment/${props.auth.user.id}`)
    .then((data) => data);
}

const AnswerComment = (props) => {
  const [comment, setComment] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [selectedComment, setSelectedComment] = useState({});
  const [clicked, setClicked] = useState(false);
  const [response, setResponse] = useState("");

  useEffect(() => {
    async function fetchData() {
      let list = await fetchUserComments(props);
      setComment(list.data);
      console.log(list.data);
    }
    fetchData();
  }, [props]);

  function responseSetter(e) {
    if (e.target.value) {
      e.preventDefault();
      setResponse(e.target.value);
      console.log("this is coment" + response);
    }
  }

  function saveReply(e) {
    let reply= {
      answer:response,
    };
    axios
      .put(`/api/comment/ansComment/${selectedComment.comment._id}`,reply)
      .then((res) =>{
        setModalShow(false);}
      )
      .catch((err) => console.log(err));
  }

  const Post = (props) => (
    <Row>
      <Col xs="6" md="2">
        <div className="search-page-image">
          <img
            src={`https://res.cloudinary.com/ds6o6pq2w/image/upload/v1607069456/images/${props.post.image}.jpg`}
            alt="#"
          />
        </div>
      </Col>
      <Col xs="6" md="10">
        <div className="search-page-descriptions">
          <h3 className="search-page-title">{props.post.title}</h3>
        </div>
        <div className="comment-container">
          <p className="cmnt">{props.comment.question}</p>
        </div>
          {
          props.comment.isAnswered  && 
          <div>
            <p className="reply">{props.comment.answer}</p>
          </div>
          } 
        <div>
          <button
            onClick={() => {
              console.log("clicked");
              setSelectedComment(props);
              setModalShow(true);
              setClicked(true);
            }}
          >
            Reply
          </button>
        </div>
      </Col>
    </Row>
  );

  function displayQueries() {
    return comment.map((post, index) => {
      return post.comment.map((comment, index) => {
        return <Post post={post} key={index} comment={comment} />;
      });
    });
  }

  function displayModal() {
    console.log(selectedComment);
    return (
      <Model
        show={modalShow}
        onHide={() => setModalShow(false)}
        onChange={responseSetter}
        comment={selectedComment}
        save={saveReply}
      />
    );
  }

  return (
    <div className="post-comment-container">
      {displayQueries()}
      {clicked ? displayModal() : null}
    </div>
  );
};

AnswerComment.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps)(withRouter(AnswerComment));
