import React from "react";
import { Navbar, Nav } from "react-bootstrap";
// import logo from "../images/logo.svg";
import githubIco from "../images/github_icon.png";
import { NavLink } from "react-router-dom";

const PublicNavbar = () => {
  return (
    <Navbar bg="danger" expand="lg">
      {/* <Navbar.Brand>
        <img src={logo} alt="CoderSchool" width="200px" />
      </Navbar.Brand> */}
      <Nav className="mr-auto">
        <Nav.Link as={NavLink} to="/">
          Home
        </Nav.Link>
        <Nav.Link as={NavLink} to="/favourite">
          Movie Favourite
        </Nav.Link>
      </Nav>
      <Nav>
        <a
          href="https://github.com/HiimBoo/imdb"
          rel="noreferrer"
          target="_blank"
        >
          <img src={githubIco} alt="Github" width="32px" />
        </a>
      </Nav>
    </Navbar>
  );
};

export default PublicNavbar;
