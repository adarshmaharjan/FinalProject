import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./SearchResult.css";
import Post from "./Posts/Post.js";
import FilterBar from "../FilterBar/FilterBar";
import Pagination from "./Pagination/Pagination.jsx";
import priceFiltering from "../../utils/priceFilter";

const SearchResult = (props) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(2);

  useEffect(() => {
    const fetchPost = async (props) => {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:5000/api/search/search-post",
        props.data
      );
      if (res.data.length != 0) {
        setPosts(res.data);
        sessionStorage.setItem("contentFiltered", JSON.stringify(res.data));
        setLoading(false);
      } else {
        setLoading(false);
        setStatus(true);
      }
      console.log(res.data);
    };

    fetchPost(props);
  }, [props]);

  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  //Change page
  const paginate = (e, pageNumber) => {
    e.preventDefault();
    setCurrentPage(pageNumber);
  };

  const filterOptions = (val, min = 20000, max = 40000) => {
    console.log(val, max, min);
    if (val === "Price") {
      var filtered = priceFiltering(posts, min, max);
      if (filtered == "zero") {
        toast.info(`Max and Min value cannot be empty`, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else if (filtered == "incorrect") {
        toast.info(`Enter correct value in each field`, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        setPosts(priceFiltering(posts, min, max));
      }
    } else {
      setPosts(JSON.parse(sessionStorage.getItem("contentFiltered")));
    }
  };

  return (
    <section className="search-page">
      <FilterBar onselect={filterOptions} />
      <Container>
        <section className="search-page-contents">
          <Post
            posts={currentPosts}
            loading={loading}
            url="/details/"
            status={status}
          />
          <Pagination
            postPerPage={postPerPage}
            totalPosts={posts.length}
            paginate={paginate}
          />
        </section>
      </Container>
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
    </section>
  );
};

SearchResult.propTypes = {
  auth: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
  data: state.data,
});

export default connect(mapStateToProps)(withRouter(SearchResult));
