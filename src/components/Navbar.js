import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import searchIcon from '../assets/icons/search.svg';
import './Navbar.css';

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
             <img
              style={{ height: 'auto', width: 'auto'}}
              alt='Logo'
              src="/logo192.png"
            />
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <div className="search-section">
                <div className="search-box">
                    <img className="search-icon" src={searchIcon} alt="search" />
                    <input className="search-input" type="text" placeholder="Qué estás buscando?" />
                </div>
            </div>
            <li className='nav-item'>
              <Link to='/products' className='nav-links' onClick={closeMobileMenu}>
                Paquetes
              </Link>
            </li>
            {/* <li className='nav-item'>
              <Link
                to='/home'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Iniciar Sesión
              </Link>
            </li> */}

            <li>
              <Link
                to='/sign-up'
                className='nav-links-mobile'
                onClick={closeMobileMenu}
              >
                SUSCRIBITE
              </Link>
            </li>
          </ul>
          {button && <Button buttonStyle='btn--outline'>SUSCRIBITE</Button>}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
