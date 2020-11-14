import React from "react";
import axios from 'axios';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {withRouter} from 'react-router-dom';

class Landing extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        axios
            .post("http://localhost:5000/api/search/search-post", this.props.data)
            .then((res) => console.log(res.data))
            .catch((error) => {
                console.log(error.response);
            });

        // console.log(this.props);
    }

    render() {
        return <h1>You have been logged</h1>;
    }
}

Landing.propTypes = {
    auth: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors,
    data: state.data,
});

export default connect(mapStateToProps)(withRouter(Landing));
