import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { connect } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import "./Modal.css";
import { Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Model = (props) => {
  return (
    <Modal
      className="modal"
      {...props}
      size="lg"
      centered
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.comment.post.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="show-grid">
        <Container>
          <Row>
            <Col xs={12} md={4}>
              <img
                src={`https://res.cloudinary.com/ds6o6pq2w/image/upload/v1607069456/images/${props.comment.post.image}.jpg`}
                alt="#"
              />
            </Col>
            <Col xs={6} md={8}>
              <div className="usr-info">
                <div>User</div>
                  <div>{props.comment.comment.name}</div>
              </div>
              <div className="usr-cmt">
                <h5>{props.comment.comment.question}</h5>
                <em>
                  <span>Posted in</span>
                    &nbsp;
                    &nbsp;
                  <span>
                    {`${props.comment.comment.createdAt}`.slice(0, 10)}
                  </span>
                </em>
              </div>
              <Col>
                <form>
                  <div>
                    <textarea
                      onChange={(e) => props.onChange(e)}
                      className="cmt-txt-border"
                      cols="40"
                      row="10"
                      placeholder={props.comment.comment.isAnswered ? props.comment.comment.answer : "Enter your response" }
                    ></textarea>
                  </div>
                </form>
              </Col>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={(e) => props.save(e)}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Model;
