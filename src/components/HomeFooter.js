import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import './HomeFooter.scss';

function HomeFooter() {

    const location = useLocation();

    const showFooter = () => {
        const currentPathArr = location.pathname.split('/');
        return !['player', 'sign-up', 'login', 'detail'].includes(currentPathArr[1]);
    }

  return (
      showFooter() ? (
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