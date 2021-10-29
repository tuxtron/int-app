import React, { useEffect, useState } from 'react';
import './MovieDetail.css';
import arrowimage from "../../assets/icons/arrowRight.svg"
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AiOutlineHeart } from 'react-icons/ai';
import { AiFillHeart } from 'react-icons/ai';


function MovieDetail(props) {

  let movie = props.location.movie;
  console.log(movie);
  const categories = useSelector(state => state.movies.categories);
  const featureMovies = useSelector(state => state.movies.featureMovies);
  let { category, movieName } = useParams();
  const [durationInHours, setDurationInHours] = useState(0);
  const [launchDate, setLaunchDate] = useState(0);
  const [isFav, setIsFav] = useState(true);
  const [favs, setFavs] = useState([]);
  const [favAnimation, setFavAnimation] = useState(false);
 
  if (!movie) {
    if (category !== 'feature') {
      movie = categories.filter(c => c.name === category)[0].movies.filter(m => m.movie.title === movieName)[0].movie;
    } else {
      movie = featureMovies.filter(m => m.title === movieName)[0];
    }
  }

  useEffect(() => {
    function fixMinutes() {
      let hours = 0;
      while (movie.duration >= 60) {
        hours += 1;
        movie.duration -= 60;
      }
      setDurationInHours(hours);
    }
    fixMinutes();
  }, []);

  const updateFavs = m => {
    
    try{
      if(Window.localstorage.getItem('favs')){
        setFavs(Window.localstorage.getItem('favs'));
      }
      favs.append(m);
      Window.localstorage.setItem('favs', favs);
      console.log("FAVS: " + Window.localstorage.getItem('favs'));
    }catch (e) {
      console.log("Error: ", e);
    }

  }

  return (

    <div className="detail-container">
      <Link to="/home" className="detail-link">
        <div className="detail-button">
          <img src={arrowimage} alt="arrow" />
          <p className="detail-back-button-text">
            Volver
          </p>
        </div>
      </Link>
      <div
        className="detail-card"
        style={{
          background: `linear-gradient(180deg, rgba(0, 0, 0, 0.26) 0%, rgba(0, 0, 0, 0.99) 100%), url(${movie.image ? movie.image : movie.imageCover})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center'
        }}>
        <div className="detail-card-left">
          <div className="detail-title-container">
            <p className="detail-movie-title">
              {movie.title}
            </p>
            {isFav ?
              <AiOutlineHeart style={{ margin: 20, fontSize: 40, color: 'rgba(255, 177, 65, 0.8)'}} onClick={()=> {setIsFav(!isFav); updateFavs(props.location.movie);}}/>
              :
              <AiFillHeart style={{ margin: 20, fontSize: 40, color: 'rgba(255, 177, 65, 0.8)' }} onClick={()=> {setIsFav(!isFav); updateFavs(props.location.movie);}}/>
            }
          </div>
          <div className="tags-rows">
            <span className="detail-tags">
              {movie.launch.split('-')[0]}
            </span>
            <span className="detail-tags">
              {movie.director}
            </span>
            <span className="detail-tags">
              {movie.minAge}
            </span>
            <span className="detail-tags">
              {durationInHours}h {movie.duration}min
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
