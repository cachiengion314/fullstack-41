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
                        <Nav.Item>
                            <Link to="/signup" className="mx-3 text-light">Sign Up</Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Link to="/login" className="mx-3 text-light">Log In</Link>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <div className="w-100 content">
                {
                    children
                }
            </div>
        </>
    )
}

export default MainLayout