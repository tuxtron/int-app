import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './HomeFooter.scss';

function HomeFooter() {

  return (
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
  );
}

export default HomeFooter;