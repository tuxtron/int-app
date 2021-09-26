import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import './HomeFooter.scss';

function HomeFooter() {

    const location = useLocation();

  return (
      !location.pathname.includes('player') ? (
        <div className="home-footer-container">
            <Link to='/' className='navbar-logo'>
                <img
                style={{ height: 'auto', width: 'auto'}}
                alt='Logo'
                src="/logo192.png"
            />
            </Link>
            <p>All rights reserved</p>
        </div>
      ) : null
  );
}

export default HomeFooter;