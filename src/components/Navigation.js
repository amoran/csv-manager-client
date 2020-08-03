import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

const Navigation = () => {
    return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#home">CSV Manager</Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="upload">Upload</Nav.Link>
                <Nav.Link href="about">About</Nav.Link>
            </Nav>
        </Navbar>
    )
}

export default Navigation;
