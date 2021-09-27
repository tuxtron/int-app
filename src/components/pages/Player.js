import React from 'react';
import './Player.css';
import VideoPlayer from 'react-video-js-player';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

function Player(props) {

    let movieUrl = props.location.movieUrl;
    const categories = useSelector(state => state.movies.categories);
    let { category, movieName } = useParams();

    if (!movieUrl) {
        movieUrl = categories.filter(c => c.name === category)[0].movies.filter(m => m.movie.title === movieName)[0].movie.movieUrl;
    }

  return (
    <div className="player-container">
      <VideoPlayer src={movieUrl} autoplay className="player"/>
    </div>
  );
}

export default Player;
