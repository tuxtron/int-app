import React, { useEffect, useState } from 'react';
import './MovieDetail.css';
import arrowimage from "../../assets/icons/arrowRight.svg"
import { Link, useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as moviesActions from '../../store/actions/movies';
import * as authActions from '../../store/actions/auth';
import axios from 'axios';
import ConfirmDialog from '../ConfirmDialog';


function MovieDetail(props) {

    const dispatch = useDispatch();
    const history = useHistory();
    const currentToken = useSelector(state => state.auth.token);
    // console.log(movie);
    // const categories = useSelector(state => state.movies.categories);
    const allMovies = useSelector(state => state.movies.allMovies);
    let { category, movieName } = useParams();

    const [ loading, setLoading ] = useState(true);
    const [ movie, setMovie ] = useState(undefined);
    const [ openAuthorizationModal, setOpenAuthorizationModal ] = useState(false);

    if (!movie && allMovies.length !== 0) {
        setMovie(allMovies.filter(m => m.movie.title === movieName)[0].movie);
        setLoading(false);
    }

    useEffect( () => {
        if (allMovies.length === 0) {
            dispatch(authActions.checkTokenExpiration(currentToken, history));
            if (currentToken) {
                dispatch(moviesActions.getCmsMovies(currentToken, setLoading));
            }   
        }
      }, [currentToken]);

      const handlePlay = async (url) => {
        await axios.post('https://suscripciones-backend.herokuapp.com/api/content/v1/approve/content/use', { 
            id_contenido: movie._id 
        }, {
            headers: {'Authorization': 'Bearer ' + currentToken}
        }).then( res => {
            if (res.status === 200) {
                history.push({
                    pathname:  `/player/${category}/${movieName}`,
                    state: { movieUrl: url}
                })
            } else {
                console.log('No autorizado');
            }
        }).catch( err => {
            setOpenAuthorizationModal(true);
            console.log(err);
        })

        // history.push({
        //     pathname:  `/player/${category}/${movieName}`,
        //     state: { movieUrl: url}
        // })
      }

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
                          background: `linear-gradient(180deg, rgba(0, 0, 0, 0.26) 0%, rgba(0, 0, 0, 0.99) 100%), url(${
                              movie.image ? movie.image : movie.imageCover
                          })`,
                          backgroundSize: "cover",
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "center",
                      }}
                  >
                      <div className="detail-card-left">
                          <p className="detail-movie-title">{movie.title}</p>
                          <div className="tags-rows">
                              <span className="detail-tags">
                                  {new Date(movie.launch).getFullYear()}
                              </span>
                              <span className="detail-tags">{category}</span>
                              <span className="detail-tags">
                                  <span>★ </span>
                                  <span>{movie.value}</span>
                              </span>
                          </div>
                          <p className="detail-descriptions">
                              {movie.description}
                          </p>
                      </div>
                      <div className="detail-card-rigth">
                          <div className="detail-card-rigth-play" onClick={() => handlePlay(movie.movieUrl)}>
                              <div className="detail-link">
                                  <p className="detail-play">Reproducir</p>
                              </div>
                          </div>
                      </div>
                  </div>
              </>
          ) : null}
            <ConfirmDialog 
                open={openAuthorizationModal} 
                closeHandler={() => setOpenAuthorizationModal(false)} 
                title="Película bloqueada"
                body="Para desbloquear ésta película, necesitás modificar tu suscripción de paquetes"
                autogestion={true}
            />
      </div>
  );
}

export default MovieDetail;
