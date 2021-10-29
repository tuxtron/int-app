import React, { useEffect, useState } from 'react';
import './MovieDetail.css';
import arrowimage from "../../assets/icons/arrowRight.svg"
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AiOutlineHeart } from 'react-icons/ai';
import { AiFillHeart } from 'react-icons/ai';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
/*
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Favorite from "@material-ui/icons/Favorite";
import IconButton from '@material-ui/core/IconButton';

const [fav, setFav] = React.useState(false);

function handleFav(){
      setFav(!fav)
      if(fav == true){
        //save it to firestore
      }else{
        //or delete it from firestore
      }
     
    }

export function readFavs(website,user) {
  var postData = []
  firestore.collection('favs').where("user", "==", user).where("website", "==", website).onSnapshot((snapshot) => {
    snapshot.map((doc) => postData.push({ ...doc.data(), id: doc.id }));
    
})
return postData; 
}    
    
export function createFav(url,uid) {
  return firestore
    .collection("favs")
    .add({
      user: uid,
      website: url
    })
    .then(function(docRef) {
        console.log("Tutorial created with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding Tutorial: ", error);
    });;
}

export function deleteFav(website,user) {
  var dt = firestore.collection('favs').where('website','==',website).where('user','==',user);
return dt.get().then(function(querySnapshot) {
  querySnapshot.forEach(function(doc) {
    doc.ref.delete();
    console.log('deleted!')
  });
});
}

{fav && 
<IconButton onClick={() => { setFav(!fav) }}  aria-label="delete" color="primary">
<FavoriteBorderIcon></FavoriteBorderIcon>
</IconButton>
}
{!fav &&
<IconButton onClick={() => { setFav(!fav) }} aria-label="delete" color="primary">
<Favorite></Favorite>
</IconButton>
}
*/


function MovieDetail(props) {

  let movie = props.location.movie;
  //console.log(movie);
  const categories = useSelector(state => state.movies.categories);
  const featureMovies = useSelector(state => state.movies.featureMovies);
  let { category, movieName } = useParams();
  const [durationInHours, setDurationInHours] = useState(0);
  const [isFav, setIsFav] = useState(false);
  const [launchDate, setLaunchDate] = useState(0);
  const [favAnimation, setFavAnimation] = useState(false);

  if (!movie) {
    if (category !== 'feature') {
      movie = categories.filter(c => c.name === category)[0].movies.filter(m => m.movie.title === movieName)[0].movie;
    } else {
      movie = featureMovies.filter(m => m.title === movieName)[0];
    }
  }

  useEffect(() => {
    isFavourite(props.location.movie);
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

    let favs = [];
    let found = false;
    try {
      if (window.localStorage.getItem('favs')) {
        favs = JSON.parse(window.localStorage.getItem('favs'));
        console.log("My favs: " + favs);
      }
      if (favs.length !== 0) {
        const aux = favs.filter((fav) => fav._id !== m._id);
        console.log("AUX: " + JSON.stringify(aux));
        if (aux.length === favs.length)
          favs[favs.length] = m;
        else
          favs = aux;
      } else
        favs[favs.length] = m;
      window.localStorage.setItem('favs', JSON.stringify(favs));
      console.log("FAVS: " + window.localStorage.getItem('favs'));
      console.log("CANT FAVS: " + JSON.parse(window.localStorage.getItem('favs')).length);
    } catch (e) {
      console.log("Error: ", e);
    }

    isFavourite(m);

  }

  const isFavourite = m => {
    let favs = [];

    if (window.localStorage.getItem('favs')) {
      favs = JSON.parse(window.localStorage.getItem('favs'));
    } else {
      setIsFav(false);
    }

    if (favs.length !== 0) {
      const aux = favs.filter((fav) => fav._id !== m._id);
      if (aux.length === favs.length)
        setIsFav(true);
      else {
        setIsFav(false);
      }
    } else {
      setIsFav(false);
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
            {isFav ?/*<FontAwesomeIcon icon={faHeart}/>*/

              <AiOutlineHeart style={{ margin: 20, fontSize: 40, color: 'rgba(255, 177, 65, 0.8)' }} onClick={() => { updateFavs(props.location.movie); }} />
              :
              <AiFillHeart style={{ margin: 20, fontSize: 40, color: 'rgba(255, 177, 65, 0.8)' }} onClick={() => { updateFavs(props.location.movie); }} />
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
