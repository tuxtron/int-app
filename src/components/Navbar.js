import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as authActions from '../store/actions/auth';
import searchIcon from '../assets/icons/search.svg';
import './Navbar.scss';

function Navbar() {

    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    
    const isUserLogged = useSelector(state => state.auth.isUserLogged);
    const user = useSelector(state => state.auth.loggedUser);
    const token = useSelector(state => state.auth.token);

    const [ click, setClick ] = useState(false);
    const [ button, setButton ] = useState(true);
    const [ showMenu, setShowMenu ] = useState(false);
    const [ searchText, setSearchText ] = useState('');

    const allMovies = useSelector(state => state.movies.allMovies);
    // console.log(allMovies);

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
        localStorage.setItem('showFavModal', false);
        console.log(localStorage.getItem("showFavModal"));
        showButton();
        authActions.checkTokenExpiration(token, history);
    }, []);

    window.addEventListener('resize', showButton);

    const showNavbar = () => {
        const currentPath = location.pathname.split('/');
        const path = currentPath[currentPath.length - 1];
        return !['sign-up', 'login'].includes(path);
    }

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    }

    const getSearchResults = () => {
        const searchedMovies = allMovies.filter(movie => movie.movie.title.toLowerCase().includes(searchText.toLowerCase()));
        if ( searchedMovies.length === 0 ) {
            return <p>No se encontró ninguna película</p>;
        } else {
            return searchedMovies.map(movie => {
                return (
                    <Link  
                        to={{
                        pathname: `/detail/${movie.category}/${movie.movie.title}`,
                        movieUrl: movie.movieUrl
                        }} 
                        className="result"
                        onClick={() => setSearchText('')}
                    >
                        <img src={movie.movie.imageMobile} alt="movie-img" />
                        <div className="result-info">
                            <p className="title">{movie.movie.title}</p>
                            <p className="description">{movie.movie.description.slice(0, 200)}...</p>
                            <div className="tags">
                                <span className="detail-tags">
                                    <span>★ </span>
                                    <span>{movie.movie.value.split('/')[0]}</span>
                                </span>
                            </div>
                        </div>
                    </Link>
                )
            });
        }
    }

    const openSelfManagmentWindow = () => {
        window.open(`https://facturacion-front.vercel.app/?from=web&token=${token}`);
        setShowMenu(false);
    }

    const openFavModal = () => {
        toggleMenu();
        localStorage.setItem('showFavModal', true);
        console.log(localStorage.getItem("showFavModal"));
    }

    const signOutBtnClicked = () => {
        dispatch(authActions.signOut());
        setShowMenu(false);
        history.push('/');
    }

  return (
      <>
          {showNavbar() ? (
              <nav className="navbar">
                  <div className="navbar-container">
                      <Link
                          to="/"
                          className="navbar-logo"
                          onClick={closeMobileMenu}
                      >
                          <img
                              style={{ height: "auto", width: "auto" }}
                              alt="Logo"
                              src="/logo192.png"
                          />
                      </Link>
                      <div className="menu-icon" onClick={handleClick}>
                          <i
                              className={click ? "fas fa-times" : "fas fa-bars"}
                          />
                      </div>
                      <ul className={click ? "nav-menu active" : "nav-menu"}>
                          {location.pathname === "/home" ? (
                              <div className="search-section">
                                  <div className="search-box">
                                      <img
                                          className="search-icon"
                                          src={searchIcon}
                                          alt="search"
                                      />
                                      <input
                                          className="search-input"
                                          type="text"
                                          placeholder="Qué estás buscando?"
                                          value={searchText}
                                          onChange={(event) =>
                                              setSearchText(event.target.value)
                                          }
                                      />
                                      {searchText !== "" ? (
                                          <div className="search-result-section">
                                              {getSearchResults()}
                                          </div>
                                      ) : null}
                                  </div>
                                  <div
                                      className={
                                          showMenu
                                              ? "button-menu active"
                                              : "button-menu"
                                      }
                                      onClick={toggleMenu}
                                  >
                                      <span className="top"></span>
                                      <span className="mid"></span>
                                      <span className="bot"></span>
                                  </div>
                                  <div
                                      className={
                                          showMenu
                                              ? "menu-content"
                                              : "menu-content hide"
                                      }
                                  >
                                      <div className="triangle"></div>
                                      <div className="user-logo-container">
                                          <img
                                              className="user-icon"
                                              src={require("../assets/icons/user.svg")}
                                              alt="logo"
                                          />
                                      </div>
                                      <p className="menu-name">
                                            {
                                              user ?  user.name + " " + user.last_name : ''
                                            }
                                      </p>
                                      <p className="menu-email">{ user ? user.email : ''}</p>
                                      <div
                                          className="self-managment-btn"
                                          onClick={openFavModal}
                                          style={{marginTop:'15px'}}
                                      >
                                          <p>Mis Favoritos</p>
                                      </div>
                                      <div
                                          className="self-managment-btn"
                                          onClick={openSelfManagmentWindow}
                                      >
                                          <p>Autogestión</p>
                                      </div>
                                      <div
                                          className="sign-out-btn"
                                          onClick={signOutBtnClicked}
                                      >
                                          <p>Cerrar sesión</p>
                                      </div>
                                  </div>
                              </div>
                          ) : null}
                          {location.pathname === "/" ||
                          location.pathname === "/sign-up" ? (
                              <li className="nav-item">
                                  <Link
                                      to={isUserLogged ? "/home" : "/login"}
                                      className="nav-links"
                                      onClick={closeMobileMenu}
                                  >
                                      {isUserLogged
                                          ? "Ingresar"
                                          : "Iniciar Sesión"}
                                  </Link>
                              </li>
                          ) : null}
                          {(location.pathname === "/" ||
                              location.pathname === "/login") &&
                          !isUserLogged ? (
                              <li className="nav-item button-item">
                                  <Button buttonStyle="btn--outline">
                                      Registrarte
                                  </Button>
                              </li>
                          ) : null}
                      </ul>
                  </div>
              </nav>
          ) : null}
      </>
  );
}

export default Navbar;
