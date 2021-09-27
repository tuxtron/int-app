import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { Link, useLocation } from 'react-router-dom';
import searchIcon from '../assets/icons/search.svg';
import './Navbar.css';

function Navbar() {

  const location = useLocation();

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

  const showNavbar = () => {
    const currentPath = location.pathname.split('/');
    const path = currentPath[currentPath.length - 1];
    return !['sign-up', 'login'].includes(path);
}

  return (
    <>
        {   
            showNavbar() ? (
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
                        {
                            location.pathname === '/home' ? (
                                <div className="search-section">
                                    <div className="search-box">
                                        <img className="search-icon" src={searchIcon} alt="search" />
                                        <input className="search-input" type="text" placeholder="Qué estás buscando?" />
                                    </div>
                                </div>
                            ) : null
                        }
                        {
                            location.pathname === '/' || location.pathname === '/sign-up' ? (
                                <li className='nav-item'>
                                    <Link to='/login' className='nav-links' onClick={closeMobileMenu}>
                                        Iniciar Sesión
                                    </Link>
                                    </li>
                            ) : null
                        }
                    </ul>
                    {
                        location.pathname === '/' || location.pathname === '/login' ? (
                            <Button buttonStyle='btn--outline'>Registrarte</Button>
                        ) : null
                    }
                    </div>
                </nav>
            ) : null
    }
    </>
  );
}

export default Navbar;
