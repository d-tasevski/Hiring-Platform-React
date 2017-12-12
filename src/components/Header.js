import React from 'react';
import { connect } from 'react-redux';
import { Navbar, Nav, NavItem, Glyphicon } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { startLogout } from '../actions/auth';

/* eslint-disable no-shadow */
export const Header = ({ startLogout, startLoadSamples }) => (
  <Navbar className="header">
    <Navbar.Header>
      <Navbar.Brand>
        <h2>InterVenture</h2>
        <p>Growing together</p>
      </Navbar.Brand>
    </Navbar.Header>

    <Nav>
      <LinkContainer
        to="/dashboard"
        exact
        activeClassName="is-active"
        className="header__navlink"
      >
        <NavItem>Dashboard</NavItem>
      </LinkContainer>
      <LinkContainer
        to="/create"
        activeClassName="is-active"
        className="header__navlink"
      >
        <NavItem>Add candidate</NavItem>
      </LinkContainer>
      <LinkContainer
        to="/about"
        activeClassName="is-active"
        className="header__navlink"
      >
        <NavItem>About</NavItem>
      </LinkContainer>
    </Nav>

    <Nav pullRight>
      <NavItem onClick={startLogout}>
        Logout <Glyphicon glyph="log-out" />
      </NavItem>
    </Nav>
  </Navbar>
);

const mapDispatchToProps = dispatch => ({
  startLogout: () => dispatch(startLogout()),
});

export default connect(undefined, mapDispatchToProps)(Header);
