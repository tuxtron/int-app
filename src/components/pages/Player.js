/* eslint-disable no-unused-vars */
import React, {useState} from 'react';
import './Player.scss';
import VideoPlayer from 'react-video-js-player';
import { useHistory } from 'react-router-dom';
import ConfirmDialog from '../ConfirmDialog';

function Player(props) {

    const history = useHistory();
    const [ openModal, setOpenModal ] = useState(false);
    const [ loading, setLoading ] = useState(props.location.state && props.location.state.movieUrl ? false : true);
    const [ movieUrl, setMovieUrl ] = useState(props.location.state && props.location.state.movieUrl);
    
    if (!movieUrl) {
        history.push('/home');
    } 

    // console.log(movieUrl);

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
