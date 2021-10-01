import React from 'react';
import './MovieDetail.css';
import arrowimage from "../../assets/icons/arrowRight.svg"
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';


function MovieDetail(props) {

    let movie = props.location.movie;
    const categories = useSelector(state => state.movies.categories);
    const featureMovies = useSelector(state => state.movies.featureMovies);
    let { category, movieName } = useParams();

    if (!movie) {
        if (category !== 'feature') {
            movie = categories.filter(c => c.name === category)[0].movies.filter(m => m.movie.title === movieName)[0].movie;
        } else {
            movie = featureMovies.filter(m => m.title === movieName)[0];
        }
    }


  return (

    <div className="detail-container">
      <Link to="/home" className="detail-link">
      <div className="detail-button">
        <img src={arrowimage} alt="arrow"/>
        <p className="detail-back-button-text">
          Volver
        </p>
      </div>
      </Link>
      <div 
        className="detail-card" 
        style={{ 
            background: `linear-gradient(180deg, rgba(0, 0, 0, 0.26) 0%, rgba(0, 0, 0, 0.99) 100%), url(${movie.image ? movie.image : movie.imageCover})`, 
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center'
        }}>
        <div className="detail-card-left">
            <p className="detail-movie-title">
                {movie.title}
            </p>
          <div className="tags-rows">
            <span className="detail-tags">
              {movie.launch.split(' ')[0].split('/')[2]}
            </span>
            <span className="detail-tags">
              {category}
            </span>
            <span className="detail-tags">
                <span>★ </span>
                <span>{movie.value.split('/')[0]}</span>
            </span>
          </div>
          <p className="detail-descriptions">
            {movie.description}
          </p>
        </div>
        <div className="detail-card-rigth">
          <div className="detail-card-rigth-play">
            <Link 
                to={{
                    pathname: `/player/${category}/${movieName}`,
                    movieUrl: movie.movieUrl
                }}
                className="detail-link"
            >
            <p className="detail-play">
              Reproducir
            </p>
            </Link>
          </div>
        </div>
        
      </div>



        
    </div>
  );
}

export default MovieDetail;
