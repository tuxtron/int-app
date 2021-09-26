import React from 'react';
import './Player.css';
import arrowimage from "../../assets/icons/arrowRight.svg";
import { Link } from 'react-router-dom';
import VideoPlayer from 'react-video-js-player';


function Player(props) {

  return (

    <div className="player-container">
      <VideoPlayer src='/videos/video-1.mp4' autoplay className="player"/>
    </div>
  );
}

export default Player;
