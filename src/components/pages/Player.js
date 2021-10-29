import React, {useState, useEffect} from 'react';
import './Player.css';
import VideoPlayer from 'react-video-js-player';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import ConfirmDialog from '../ConfirmDialog';
import * as moviesActions from '../../store/actions/movies';
import * as authActions from '../../store/actions/auth';

function Player(props) {

    const dispatch = useDispatch();
    const history = useHistory();
    const currentToken = useSelector(state => state.auth.token);
    const [ openModal, setOpenModal ] = useState(false);
    const [ loading, setLoading ] = useState(props.location.state && props.location.state.movieUrl ? false : true);
    const [ movieUrl, setMovieUrl ] = useState(props.location.state && props.location.state.movieUrl);

    const categories = useSelector(state => state.movies.categories);
    const allMovies = useSelector(state => state.movies.allMovies);
    let { category, movieName } = useParams();

    // const onVideoPlay = (duration) => {
    //     console.log("Video played at: ", duration);
    //     const random = Math.floor(Math.random() * (11 - 1)) + 1;
    //     if(random < 6){
    //       setOpenModal(true);
    //     }else {
    //       setOpenModal(false);
    //     }
    // }
    
    if (!movieUrl) {
        history.push('/home');
    } 

    // if (!movieUrl && allMovies.length !== 0) {
    //     setMovieUrl(allMovies.filter(m => m.movie.title === movieName)[0].movie.movieUrl);
    //     setLoading(false);
    // }

    // useEffect( () => {
    //     if (allMovies.length === 0) {
    //       dispatch(authActions.checkTokenExpiration(currentToken, history));
    //       if (currentToken) {
    //           // getAllMovies();
    //           dispatch(moviesActions.getCmsMovies(currentToken));
    //       }
    //     }
    // }, [currentToken]);

    console.log(movieUrl);

  return (
    <div className="player-container">
        {
            !loading && movieUrl ? (
                <>
                <VideoPlayer src={movieUrl} className="player"/>
                <ConfirmDialog 
                    open={openModal} 
                    closeHandler={() => {setOpenModal(false); window.location.replace("/home")}} // funcion que se ejecuta despues de clickear "confirmar dentro del modal"
                    title="Permisos Inválidos"
                    body="Los paquetes a los que estas suscrito no permiten reproducir este contenido."
                />
                </>
            ) : null
        }
    </div>
  );
}

export default Player;
