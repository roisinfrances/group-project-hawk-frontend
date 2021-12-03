import React from "react";
import { Navbar, NavDropdown, Container, Nav } from "react-bootstrap";

function Header(props) {

    return (
        <Navbar variant="dark">
            <Container>
                <Navbar.Brand href="#home"><h1>Hawk Services</h1> </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav>
                        <NavDropdown title="Welcome!" id="basic-nav-dropdown">
                            <NavDropdown.ItemText className="bg-white">Role: {props.role}</NavDropdown.ItemText>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={props.logoutFunction}>Logout</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header;