import React from 'react';
import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from 'styled-components';
import SideBarNav from './sideBar';
import '../../App.css'; 

function TopBar() {
  const [sideNav, setSideNav] = useState(0);

  const sideNavToggle = () => {
    setSideNav(prev => {return !prev});
  }
  return (
    <>
      <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
        <a className="navbar-brand ps-3" href="#!">Start Bootstrap</a>
        <button className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" onClick={() => sideNavToggle()}><FontAwesomeIcon icon="fas fa-bars" /></button>
        <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
          <li className="nav-item dropdown">
            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
              <li><a className="dropdown-item" href="#!">Settings</a></li>
              <li><a className="dropdown-item" href="#!">Activity Log</a></li>
              <li><hr className="dropdown-divider" /></li>
              <li><a className="dropdown-item" href="#!">Logout</a></li>
            </ul>
          </li>
        </ul>
      </nav>
      {
        sideNav
        ?
        <SideBarNav />
        :
        ''
      }
    </>
  )
}

export default TopBar;