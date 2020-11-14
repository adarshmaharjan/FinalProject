// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { logoutUser } from "../../actions/authAction.jsx";
// import PropTypes from "prop-types";
// import { connect } from "react-redux";

// import {
//     Button,
//     NavDropdown,
//     Form,
//     FormControl,
//     Navbar,
//     Nav,
// } from "react-bootstrap";
// import 'bootstrap/dist/css/bootstrap.css';

// const NavbarComp = (props) => {
//     const onLogoutClick = (e) => {
//         e.preventDefault();
//         props.logoutUser();
//     };

//     const [isOpen, setIsOpen] = useState(false);
//     const toggle = () => setIsOpen(!isOpen);
//     console.log(props.auth);
//     if (props.auth.isAuthenticated) {
//         return (
//             <Navbar bg="light" expand="lg">
//                 <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
//                 <Navbar.Toggle aria-controls="basic-navbar-nav" />
//                 <Navbar.Collapse id="basic-navbar-nav">
//                     <Nav className="mr-auto">
//                         <Nav.Link href="#home">Home</Nav.Link>
//                         <Nav.Link href="/login">Login</Nav.Link>
//                     </Nav>
//                 </Navbar.Collapse>
//             </Navbar>
//         );
//     } else {
//         return (
//             <Navbar bg="light" expant="lg">
//                 <Navbar.Brand href="#home">Rentit</Navbar.Brand>
//                 <Navbar.Toggle aria-controls="basic-navbar-nav" />
//                 <Navbar.Collapse id="basic-navbar-nav">
//                     <Nav className="ml-auto">
//                         <Nav.Link href="/">Search</Nav.Link>
//                         <Nav.Link href="/login">Login</Nav.Link>
//                     </Nav>
//                 </Navbar.Collapse>
//             </Navbar>
//         );
//     }
// };



// NavbarComp.propTypes = {
//     logoutUser: PropTypes.func.isRequired,
//     auth: PropTypes.object.isRequired,
// }

// const mapStateToProps = (state) => ({
//     auth: state.auth,
// });

// export default connect(mapStateToProps, { logoutUser })(NavbarComp);
