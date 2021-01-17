import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import {Container} from "react-bootstrap";

import "./PostDetails.css";
import Map from "./Map.jsx";

const Image = (props) => (
    <div>
        <img src={props.img} alt="#" />
    </div>
);

const PostDetail = (props) => {

    function displayImage() {
        console.log(props.location.state);
        return props.location.state.imageCollection.map((image, index) => {
            let url = `https://res.cloudinary.com/ds6o6pq2w/image/upload/v1605056350/images/${image}`;
            return <Image img={url} key={props.location.state._id} />;
        });
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
                                <div>Number: <a href={props.location.state.number}>{props.location.state.number}</a></div>
                        </div>
                        
                        
                            
                        <div className="post-description">
                            <h3>Description</h3>
                            <p>{props.location.state.description}</p>
                        </div>
                        
                        

                        <div className="post-room-description">

                            <ul id="facilities">

                                <li>
                                    Room: {props.location.state.furnished}</li>

                                <li>
                                    Bedroom: {props.location.state.rooms.bedroom}
                                </li>
                                <li>
                                    Kitchen: {props.location.state.rooms.kitchen}
                                </li>
                                <li>
                                    livingRoom:{" "}
                                    {props.location.state.rooms.livingRoom}
                                </li>

                                <li>toilet: {props.location.state.rooms.toilet}</li>
                            </ul>
                        </div>
                        
                        
                        <div className="post-room-facilities">
                            <h3>Facilities:</h3>
                            <ul>
                                {props.location.state.facilities.map(
                                    (facility, index) => (
                                        <li>{facility}</li>
                                    )
                                )}
                            </ul>
                        </div>
                        
                        

                        
                        <div className="post-room-location">
                            <div>Map</div>
                            <Map lng={props.location.state.coordinates.longitude} lat={props.location.state.coordinates.latitude}/>
                        </div>
                        
                    
                        
                        <div className="post-room-comment">
                            <div>Comment</div>
                        </div>
                    </div>
                    </div>
            </Container>
            
        
        </div>
    );
};

export default PostDetail;
