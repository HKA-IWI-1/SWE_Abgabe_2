/*
 * Copyright (c) 2024 - present Florian Sauer
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
 * documentation files (the “Software”), to deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions
 * of the Software.
 *
 * THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT
 * LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
 * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 */
import './NavBar.scss';
import Container from 'react-bootstrap/Container';
import { DarkModeSwitch } from '../DarkModeSwitch/DarkModeSwitch.tsx';
import { Link } from 'react-router-dom';
import { Login } from '../Login/Login/Login.tsx';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../../../assets/logo.jpg';
import { paths } from '../../../config/paths.ts';

export const NavBar = () => (
    <Navbar expand="lg" className="custom-navbar">
        <Container fluid>
            <Navbar.Brand as={Link} to={paths.root}>
                <img
                    src={logo}
                    alt="logo"
                    width="40"
                    height="35"
                    className="d-inline-block align-middle me-2"
                />
                Buch-Frontend
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link as={Link} to={paths.search}>
                        Suchen
                    </Nav.Link>
                    <Nav.Link as={Link} to={paths.createBook}>
                        Neues Buch
                    </Nav.Link>
                    <NavDropdown title="Diagramme" id="basic-nav-dropdown">
                        <NavDropdown.Item as={Link} to={paths.diagramsArt}>
                            Art
                        </NavDropdown.Item>
                        <NavDropdown.Item as={Link} to={paths.diagramsTags}>
                            Tags
                        </NavDropdown.Item>
                        <NavDropdown.Item as={Link} to={paths.diagramsDates}>
                            Datum
                        </NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
            <Navbar className="Toggle">
                <Login />
            </Navbar>
            <Navbar className="Toggle">
                <DarkModeSwitch />
            </Navbar>
        </Container>
    </Navbar>
);
