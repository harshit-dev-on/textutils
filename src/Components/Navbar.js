import React from 'react';
import texticon from './texticon.svg';
import ModeToggle from './ModeToggle';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <div className="mb-4">
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
    <Link className="navbar-brand" to="/">
      <img src={texticon} alt="Logo" width="30" height="30" className="d-inline-block align-text-top"/>
    </Link>
    <Link className="navbar-brand" to="/">TextUtils</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className ="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/about">About</Link>
        </li>
      </ul>
      <div className="d-flex align-items-center">
        <ModeToggle />
        
        
      </div>
    </div>
  </div>
</nav>
    </div>
  )
}
