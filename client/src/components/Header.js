import React, { useContext } from 'react';
import { Container, Navbar } from 'react-bootstrap';
import { UserContext } from '../hooks/UserContext';

function Header() {
    const { user } = useContext(UserContext);
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="#home">Project Timelines</Navbar.Brand>
                Hello {user.name}!
            </Container>
        </Navbar>
    )
}

export default Header;