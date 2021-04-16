import React from 'react'
import { Navbar, Nav, Dropdown, ButtonGroup } from 'react-bootstrap'
import {
    Link, useHistory
} from 'react-router-dom'
import { AuthContext } from "../../App"
import Vars from '../../utility/Vars'

const MainLayout = ({ children }) => {
    const { user, setUser } = React.useContext(AuthContext)
    const history = useHistory()

    const pustImg = () => {
        history.push("/create")
    }


    return (
        <>
            <Navbar bg="dark" expand="lg" variant="dark">
                <Navbar.Brand href="/">Post Your Images</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    {
                        ((Vars.isUserSignIn() && user) &&
                            <Nav className="mr-auto">
                                <Nav.Item className="text-light mx-2">
                                    {user.email}
                                </Nav.Item>
                                <Nav.Item>
                                    <Dropdown as={ButtonGroup}>
                                        <Dropdown.Toggle split variant="success" id="dropdown-split-basic" className="bg-dark border-white" />
                                        <Dropdown.Menu>
                                            <Dropdown.Item onClick={Vars.signOut.bind(null, setUser)} href="#/action-1">Sign Out</Dropdown.Item>
                                            <Dropdown.Item onClick={pustImg}>Post Img</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Nav.Item>
                            </Nav>
                        )
                        ||
                        <Nav className="mr-auto">
                            <Nav.Item>
                                <Link to="/signup" className="mx-3 text-light">Sign Up</Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Link to="/login" className="mx-3 text-light">Log In</Link>
                            </Nav.Item>
                        </Nav>
                    }
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