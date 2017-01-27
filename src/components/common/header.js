import React, { Component } from 'react';
import { IndexLink, Link } from 'react-router';

class Header extends Component {
  render() {
    const isActive = (route) => (
      document.location.pathname === route ? 'item active' : 'item'
    );
    return (
      <div className='ui secondary pointing menu'>
        <IndexLink to="/" className={isActive('/')}>Home</IndexLink>
        <Link to='/cars/new' className={isActive('/cars/new')}>New Car</Link>
        <Link to='/makers' className='item'>Marks</Link>
        <Link to='/' className='item'>New Mark</Link>
      </div>
    );
  }
}

export default Header;
