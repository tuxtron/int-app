import React, { useEffect, useState } from "react";
import "./MovieDetail.scss";
import arrowimage from "../../assets/icons/arrowRight.svg";
import { Link, useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import Loader from "react-loader-spinner";
import * as moviesActions from "../../store/actions/movies";
import * as authActions from "../../store/actions/auth";
import axios from "axios";
import ConfirmDialog from "../ConfirmDialog";

function MovieDetail(props) {
  //   let movie = props.location.movie;
  //console.log(movie);

  let { category, movieName } = useParams();
  const [durationInHours, setDurationInHours] = useState(0);
  const [durationInMinutes, setDurationInMinutes] = useState(0);
  const [isFav, setIsFav] = useState(false);

  const [longTitle, setLongTitle] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();
  const currentToken = useSelector((state) => state.auth.token);
  const currentUser = useSelector((state) => state.auth.loggedUser);
  const [currentUserID, setCurrentUserID] = useState('');
  // const categories = useSelector(state => state.movies.categories);
  const allMovies = useSelector((state) => state.movies.allMovies);

  const [loading, setLoading] = useState(true);
  const [playerSpinner, setPlayerSpinner] = useState(false);
  const [movie, setMovie] = useState(undefined);
  const [openAuthorizationModal, setOpenAuthorizationModal] = useState(false);

  //   if (!movie) {
  //     if (category !== 'feature') {
  //       movie = categories.filter(c => c.name === category)[0].movies.filter(m => m.movie.title === movieName)[0].movie;
  //     } else {
  //       movie = featureMovies.filter(m => m.title === movieName)[0];
  //     }
  //   }
  //   console.log("movie: ", movie);

  if (!movie && allMovies.length !== 0) {
    setMovie(allMovies.filter((m) => m.movie.title === movieName)[0].movie);
    setLoading(false);
  }

  useEffect(() => {
    if (currentUser) { setCurrentUserID(currentUser._id) }
  }, [currentUser])

  useEffect(() => {
    if (allMovies.length === 0) {
      dispatch(authActions.checkTokenExpiration(currentToken, history));
      if (currentToken) {
        dispatch(moviesActions.getCmsMovies(currentToken, setLoading));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentToken]);

  useEffect(() => {
    //   console.log("bucle")
    if (movie) {
      isFavourite(movie);
      if (movie.title.length > 35) {
        setLongTitle(true);
      }
      function fixMinutes() {
        let hours = 0;
        let minutes = movie.duration;
        while (minutes >= 60) {
          hours += 1;
          minutes -= 60;
        }
        setDurationInMinutes(minutes);
        setDurationInHours(hours);
      }
      fixMinutes();
    }
  }, [movie]);

  const updateFavs = (m) => {
    setIsFav(!isFav);

    let favs = [];
    try {
      if (window.localStorage.getItem(`favs${currentUserID}`)) {
        favs = JSON.parse(window.localStorage.getItem(`favs${currentUserID}`));
        // console.log("My favs: " + favs);
      }
      if (favs.length !== 0) {
        const aux = favs.filter((fav) => fav._id !== m._id);
        //console.log("AUX: " + JSON.stringify(aux));
        if (aux.length === favs.length) favs[favs.length] = m;
        else favs = aux;
      } else favs[favs.length] = m;
      window.localStorage.setItem(`favs${currentUserID}`, JSON.stringify(favs));
    } catch (e) {
      console.log("Error: ", e);
    }
  };

  const isFavourite = (m) => {
    let favs = [];

    if (window.localStorage.getItem(`favs${currentUserID}`)) {
      favs = JSON.parse(window.localStorage.getItem(`favs${currentUserID}`));
    } else {
      setIsFav(false);
    }
    if (favs.length !== 0) {
      const aux = favs.filter((fav) => fav._id !== m._id);
      if (aux.length === favs.length) setIsFav(false);
      else {
        setIsFav(true);
      }
    } else {
      setIsFav(false);
    }
  };

  const toggleLongTitle = () => {
    if (movie.title.length > 35) {
      setLongTitle(!longTitle);
    }
  };

  const handlePlay = async (url) => {
    setPlayerSpinner(true);
    await axios
      .post(
        "https://suscripciones-backend.herokuapp.com/api/content/v1/approve/content/use",
        {
          id_contenido: movie._id,
        },
        {
          headers: { Authorization: "Bearer " + currentToken },
        }
      )
      .then((res) => {
        setPlayerSpinner(false);
        if (res.status === 200) {
          history.push({
            pathname: `/player/${category}/${movieName}`,
            state: { movieUrl: url },
          });
        } else {
          setPlayerSpinner(false);
          console.log("No autorizado");
        }
      })
      .catch((err) => {
        setPlayerSpinner(false);
        setOpenAuthorizationModal(true);
        console.log(err);
      });

    // history.push({
    //     pathname:  `/player/${category}/${movieName}`,
    //     state: { movieUrl: url}
    // })
  };

  return (
    <div className="detail-container">
      {!loading && movie ? (
        <>
          <Link to="/home" className="detail-link">
            <div className="detail-button">
              <img src={arrowimage} alt="arrow" />
              <p className="detail-back-button-text">Volver</p>
            </div>
          </Link>
          <div
            className="detail-card"
            style={{
              background: `linear-gradient(180deg, rgba(0, 0, 0, 0.26) 0%, rgba(0, 0, 0, 0.99) 100%), url(${movie.imageCover})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          >
            <div className="detail-card-left">
              <div className="detail-title-container">
                {longTitle ? (
                  <p onMouseEnter={toggleLongTitle} className="detail-movie-title">
                    {movie.title.slice(0, 35) + "..."}
                  </p>
                ) : (
                  <p onMouseLeave={toggleLongTitle} className="detail-movie-title">{movie.title}</p>
                )}
                <div className="svg-title">
                  {!isFav ? (
                    <AiOutlineHeart
                      style={{
                        margin: 20,
                        fontSize: 40,
                        color: "rgba(255, 177, 65, 0.8)",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        updateFavs(movie);
                      }}
                    />
                  ) : (
                    <AiFillHeart
                      style={{
                        margin: 20,
                        fontSize: 40,
                        color: "rgba(255, 177, 65, 0.8)",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        updateFavs(movie);
                      }}
                    />
                  )}
                </div>
              </div>
              <div className="tags-rows">
                <span className="detail-tags">
                  {new Date(movie.launch).getFullYear()}
                </span>
                <span className="detail-tags">{movie.director}</span>
                <span className="detail-tags">{movie.minAge}</span>

                <span className="detail-tags">
                  {durationInHours}h {durationInMinutes}min
                </span>
                <span className="detail-tags">{category}</span>
                <span className="detail-tags">
                  <span>★ </span>
                  <span>{movie.value}</span>
                </span>
              </div>
              <p className="detail-descriptions">{movie.description}</p>
            </div>
            <div className="detail-card-rigth">
              <div
                className="detail-card-rigth-play"
                onClick={() => handlePlay(movie.movieUrl)}
              >
                <div className="detail-link">
                  <p className="detail-play">
                    {playerSpinner ? (
                      <Loader
                        type="Oval"
                        color="#FFFFFF"
                        height={40}
                        width={40}
                        timeout={3000} //3 secs
                      />
                    ) : (
                      "Reproducir"
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <ConfirmDialog
            open={openAuthorizationModal}
            closeHandler={() => setOpenAuthorizationModal(false)}
            title="Película bloqueada"
            body="Para desbloquear ésta película, necesitás modificar tu suscripción de paquetes"
            autogestion={true}
          />
        </>
      ) : null}
    </div>
  );
}

export default MovieDetail;
