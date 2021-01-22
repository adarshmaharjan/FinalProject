import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import axios from "axios";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { Container } from "react-bootstrap";

import "./PostDetails.css";
import Map from "./Map.jsx";

const Image = (props) => (
  <div>
    <img src={props.img} alt="#" />
  </div>
);

const Comment = (props) => (
  <div className="comment">
    <div className="user-name">{props.comment.name}</div>
      <div className="comment-flex-container">
        <div>
          Q)
          </div>
    <div className="user-comment">
      {props.comment.question}
    </div>

        </div>
  </div>
);

const PostDetail = (props) => {
  const [isLogged, setIsLogged] = useState(true);
  const [question, setQuestion] = useState("");
  const [btnColor, setBtnColor] = useState("btn-disable");
  const [comments, setComments] = useState([]);

  function displayImage() {
    console.log(props.location.state);
    return props.location.state.imageCollection.map((image, index) => {
      let url = `https://res.cloudinary.com/ds6o6pq2w/image/upload/v1605056350/images/${image}`;
      return <Image img={url} key={props.location.state._id} />;
    });
  }

  useEffect(() => {
    localStorage.jwtToken != null ? setIsLogged(true) : setIsLogged(false);
    axios
      .get(
        `http://localhost:5000/api/comment/loadComment/${props.location.state._id}`
      )
      .then((data) => {
        setComments(data.data);
      });

  },[]);

  function loadComment() {
    return comments.map((currentComment, index) => {
        console.log(currentComment.postId);
      return <Comment comment={currentComment} key={currentComment._id} />;
    });
  }

  function comment() {
    if (question != "") {
      setBtnColor("btn-enable");
      console.log(props.auth);
      let id = {
        postId: props.location.state._id,
        userId: props.auth.user.id,
      };
      let data = {
        name: props.auth.user.name,
        question: question,
      };
      console.log(id);
      axios
        .post(
          `http://localhost:5000/api/comment/addComment/${JSON.stringify(id)}`,
          data
        )
        .then((data) => {
          console.log(data);
          axios
            .get(
              `http://localhost:5000/api/comment/loadComment/${props.location.state._id}`
            )
            .then((data) => {
              setComments(data.data);
            });
        });
    } else {
      console.log("comment must not be empty");
    }
  }

  return (
    <div className="post-detail-container">
      <Container>
        <div className="image-container">
          <Carousel autoPlay>{displayImage()}</Carousel>
          <div className="post-details-info">
            <div className="post-title">
              <h3>{props.location.state.title}</h3>
            </div>

            <div className="basic-info">
              <div>Name: {props.location.state.name}</div>
              <div>Email: {props.location.state.email}</div>
              <div>
                Number:{" "}
                <a href={props.location.state.number}>
                  {props.location.state.number}
                </a>
              </div>
            </div>

            <div className="post-description">
              <h3>Description</h3>
              <p>{props.location.state.description}</p>
            </div>

            <div className="post-room-description">
              <ul id="facilities">
                <li>Room: {props.location.state.furnished}</li>

                <li>Bedroom: {props.location.state.rooms.bedroom}</li>
                <li>Kitchen: {props.location.state.rooms.kitchen}</li>
                <li>livingRoom: {props.location.state.rooms.livingRoom}</li>

                <li>toilet: {props.location.state.rooms.toilet}</li>
              </ul>
            </div>

            <div className="post-room-facilities">
              <h3>Facilities:</h3>
              <ul>
                {props.location.state.facilities.map((facility, index) => (
                  <li>{facility}</li>
                ))}
              </ul>
            </div>

            <div className="post-room-location">
              <div>Map</div>
              <Map
                lng={props.location.state.coordinates.longitude}
                lat={props.location.state.coordinates.latitude}
              />
            </div>

            <div className="post-room-comment">
              <div>Comment</div>
              {isLogged ? (
                <div className="cmnt-container">
                  <textarea
                    name="cmnt"
                    id="comment"
                    cols="70"
                    rows="3"
                    placeholder="Add comment"
                    onChange={(e) => {
                      setQuestion(e.target.value);
                    }}
                  ></textarea>
                  <button
                    disabled={question.length < 1}
                    className={btnColor}
                    onClick={comment}
                  >
                    Add Comment
                  </button>
                  <div className="post-comments">
                    <div className="comment-container">{loadComment()}</div>
                  </div>
                </div>
              ) : (
                <span>Log in to add comment</span>
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

PostDetail.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps)(withRouter(PostDetail));
