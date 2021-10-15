import React, {useState} from 'react';
import './Player.css';
import VideoPlayer from 'react-video-js-player';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ConfirmDialog from '../ConfirmDialog';

function Player(props) {

    let movieUrl = props.location.movieUrl;
    const [ openModal, setOpenModal ] = useState(false);
    const categories = useSelector(state => state.movies.categories);
    const featureMovies = useSelector(state => state.movies.featureMovies);
    let { category, movieName } = useParams();

    const onVideoPlay = (duration) => {
        console.log("Video played at: ", duration);
        const random = Math.floor(Math.random() * (11 - 1)) + 1;
        if(random < 6){
          setOpenModal(true);
        }else {
          setOpenModal(false);
        }
    }

    if (!movieUrl) {
        if ( category !== 'feature' ) {
            movieUrl = categories.filter(c => c.name === category)[0].movies.filter(m => m.movie.title === movieName)[0].movie.movieUrl;
        } else {
            movieUrl = featureMovies.filter(m => m.title === movieName)[0].movieUrl;
        }
    }

  return (
    <div className="player-container">
      <VideoPlayer src={movieUrl} className="player" onReady={onVideoPlay.bind(this)}/>
      <ConfirmDialog 
        open={openModal} 
        closeHandler={() => {setOpenModal(false); window.location.replace("/home")}} // funcion que se ejecuta despues de clickear "confirmar dentro del modal"
        title="Permisos Inválidos"
        body="Los paquetes a los que estas suscrito no permiten reproducir este contenido."
    />
    </div>
  );
}

export default Player;
