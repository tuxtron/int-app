import React, { useState, useEffect, useRef } from "react";
import { Button } from "./Button";
import { Link, useLocation, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as authActions from "../store/actions/auth";
import searchIcon from "../assets/icons/search.svg";
import "./Navbar.scss";

function Navbar() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const isUserLogged = useSelector((state) => state.auth.isUserLogged);
  const user = useSelector((state) => state.auth.loggedUser);
  const token = useSelector((state) => state.auth.token);

  const [click, setClick] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [openSearchMenu, setOpenSearch] = useState(false);

  const allMovies = useSelector((state) => state.movies.allMovies);
  const moviesByCategories = useSelector((state) => state.movies.movies);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("showFavModal", false);
    // console.log(localStorage.getItem("showFavModal"));
    authActions.checkTokenExpiration(token, history);
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpenSearch(false);
        dispatch(authActions.toggleSearchBar(openSearchMenu));
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", (event) =>
        handleClickOutside(event)
      );
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showNavbar = () => {
    const currentPath = location.pathname.split("/");
    const path = currentPath[currentPath.length - 1];
    return !["sign-up", "login"].includes(path);
  };

  const toggleMenu = () => {
    dispatch(authActions.toggleNavBar(!showMenu));
    setShowMenu(!showMenu);
  };

  const getSearchResults = () => {
    const searchedMovies = allMovies.filter((movie) =>
      movie.movie.title.toLowerCase().includes(searchText.toLowerCase())
    );
    const uniqueMovies = [
      ...new Map(searchedMovies.map((m) => [m.movie["title"], m])).values(),
    ];
    if (searchedMovies.length === 0) {
      return <p>No se encontr?? ninguna pel??cula</p>;
    } else {
      return uniqueMovies.map((movie, index) => {
          const catIndex = moviesByCategories.findIndex((c) => c.movies.some(m => m.movie._id === movie.movie._id));
          const category = moviesByCategories[catIndex].name || '';
        return (
          <Link
            key={index}
            to={{
              pathname: `/detail/${category}/${movie.movie.title}`,
              movieUrl: movie.movieUrl,
            }}
            className="result"
            onClick={() => setSearchText("")}
          >
            <img src={movie.movie.imageMobile} alt="movie-img" />
            <div className="result-info">
              <p className="title">{movie.movie.title}</p>
              <p className="description">
                {movie.movie.description.slice(0, 200)}...
              </p>
              <div className="tags">
                <span className="detail-tags">
                  <span>??? </span>
                  <span>{movie.movie.value.split("/")[0]}</span>
                </span>
              </div>
            </div>
          </Link>
        );
      });
    }
  };

  const openSelfManagmentWindow = () => {
    window.open(
      `https://facturacion-front.vercel.app/?from=web&token=${token}`
    );
    setShowMenu(false);
    dispatch(authActions.toggleNavBar(false));
  };

  const openFavModal = () => {
    toggleMenu();
    localStorage.setItem("showFavModal", true);
    // console.log(localStorage.getItem("showFavModal"));
  };

  const signOutBtnClicked = () => {
    dispatch(authActions.signOut());
    setShowMenu(false);
    dispatch(authActions.toggleNavBar(false));
    history.push("/");
  };

  return (
    <>
      {showNavbar() ? (
        <nav className="navbar">
          <div className="navbar-container">
            <Link
              to={isUserLogged ? "/home" : "/"}
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
              <i className={click ? "fas fa-times" : "fas fa-bars"} />
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
                      placeholder="??Qu?? buscas?"
                      value={searchText}
                      onChange={(event) => {
                        setSearchText(event.target.value);
                        setOpenSearch(true);
                        dispatch(authActions.toggleSearchBar(true));
                      }}
                      onFocus={() => {
                        setOpenSearch(true);
                        dispatch(authActions.toggleSearchBar(true));
                      }}
                    />
                    {openSearchMenu && searchText !== "" ? (
                      <div className="search-result-section" ref={wrapperRef}>
                        {getSearchResults()}
                      </div>
                    ) : null}
                  </div>
                  <div
                    className={showMenu ? "button-menu active" : "button-menu"}
                    onClick={toggleMenu}
                  >
                    <span className="top"></span>
                    <span className="mid"></span>
                    <span className="bot"></span>
                  </div>
                  {
                      showMenu ? (
                        <div className="menu-content">
                            <div className="triangle"></div>
                            <div className="user-logo-container">
                            <img
                                className="user-icon"
                                src={require("../assets/icons/user.svg")}
                                alt="logo"
                            />
                            </div>
                            <p className="menu-name">
                            {user ? user.name + " " + user.last_name : ""}
                            </p>
                            <p className="menu-email">{user ? user.email : ""}</p>
                            <div
                            className="self-managment-btn"
                            onClick={openFavModal}
                            style={{ marginTop: "15px" }}
                            >
                            <p>Mis Favoritos</p>
                            </div>
                            <div
                            className="self-managment-btn"
                            onClick={openSelfManagmentWindow}
                            >
                            <p>Autogesti??n</p>
                            </div>
                            <div className="sign-out-btn" onClick={signOutBtnClicked}>
                            <p>Cerrar sesi??n</p>
                            </div>
                        </div>
                      ) : null
                  }
                </div>
              ) : null}
              {location.pathname === "/" || location.pathname === "/sign-up" ? (
                <li className="nav-item">
                  <Link
                    to={isUserLogged ? "/home" : "/login"}
                    className="nav-links"
                    onClick={closeMobileMenu}
                  >
                    {isUserLogged ? "Ingresar" : "Iniciar Sesi??n"}
                  </Link>
                </li>
              ) : null}
              {(location.pathname === "/" || location.pathname === "/login") &&
              !isUserLogged ? (
                <li className="nav-item button-item">
                  <Button buttonStyle="btn--outline">Registrarte</Button>
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
