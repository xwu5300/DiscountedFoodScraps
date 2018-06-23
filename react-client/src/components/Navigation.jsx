import React from 'react'
import { Nav, Navbar, NavItem } from 'react-bootstrap';

export default function Navigation() {
  return (
    <Navbar>
      <Navbar.Header>
        <Navbar.Brand>
          <a href="#home">ScrapIt</a>
        </Navbar.Brand>
      </Navbar.Header>
      <Nav>
        <NavItem eventKey={1} href="#">Restaurants</NavItem>
      </Nav>
    </Navbar>
  )
}
