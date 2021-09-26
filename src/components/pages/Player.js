import React from 'react';
import './Player.css';
import VideoPlayer from 'react-video-js-player';


function Player(props) {

  return (
    <div className="player-container">
      <VideoPlayer src='/videos/video-1.mp4' autoplay={false} className="player"/>
    </div>
  );
}

export default Player;
