import React from 'react'
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Navigation() {
  return (
    <Navbar>
      <Navbar.Header>
        <Navbar.Brand>
          <Link to="/">WNWN</Link>
        </Navbar.Brand>
      </Navbar.Header>
      <Nav>
        <NavItem componentClass={Link} href="/restaurants" to="/restaurants">Restaurants</NavItem>
        <NavItem componentClass={Link} href="/restaurants/submit" to="/restaurants/submit">Submit New Restaurant</NavItem>
        <NavItem componentClass={Link} href="/cart" to="/cart">Cart</NavItem>
      </Nav>
    </Navbar>
  )
}
