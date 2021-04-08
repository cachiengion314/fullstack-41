import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import {
    Link
} from 'react-router-dom'

const MainLayout = ({ children }) => {
    return (
        <>
            <Navbar bg="dark" expand="lg" variant="dark">
                <Navbar.Brand href="/">MindX-Images</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Link to="/signup" className="mx-3 text-light">Sign Up</Link>
                        <Link to="/login" className="text-light">Log In</Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            {
                children
            }
        </>
    )
}

export default MainLayout