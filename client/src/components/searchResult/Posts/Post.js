import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import {Container,Row,Col} from 'react-bootstrap';
// import {connect} from "react-redux";
import {displayDetails} from '../../../actions/postAction.js';


const Post = (props) => (
    <div className="search-page-content">
    <Row>
      <Col xs="6" md="2">
        <div className="search-page-image">
          <img
            src={`https://res.cloudinary.com/ds6o6pq2w/image/upload/v1607069456/images/${
              props.post.imageCollection[0]
            }.jpg`}
            alt="#"
          />
        </div>
      </Col>
      <Col xs="6" md="10">
        <div className="search-page-descriptions">
          <h3 className="search-page-title">{props.post.title}</h3>
          <p className="search-page-description">{props.post.description}</p>
          <div>{props.post.price}</div>
          <div className="detail">
            <Link to={{ pathname: `${props.url}`, state: props.post }}>
              Details
            </Link>
          </div>
        </div>
      </Col>
    </Row>
  </div>
);

const Posts = (props) => {
    if (props.loading) {
        return <h2> Loading .... </h2>;
    }


    function displayPost() {
        console.log(props)
        return props.posts.map((post, index) => {
            console.log(props)
            return <Post post={post} key={post._id} url={props.url}/>;
        });
    }

    return (
        <div className="posts-group-container">
            {displayPost()}
        </div>
    );
};

export default Posts;
