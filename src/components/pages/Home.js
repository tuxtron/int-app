import React, { useState, useEffect} from 'react';
import Slider from "react-slick";
import CategorySlider from '../CategorySlider';
import './Home.scss';
import "react-multi-carousel/lib/styles.css";
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as authActions from '../../store/actions/auth';
import * as moviesActions from '../../store/actions/movies';

// import { categoryMovies, featureMovies } from "../../dummy-data";

function Home() {

  const currentToken = useSelector(state => state.auth.token);
  let categories = useSelector(state => state.movies.categories);
  const featureMovies = useSelector(state => state.movies.featureMovies);
  const data = useSelector(state => state.movies.movies);

  const [currentSlide, setCurrentSlide] = useState(0);
//   const [data, setData] = useState([]);

  const dispatch = useDispatch();

  const history = useHistory();

  const test = (oldIndex, newIndex) => {
    setCurrentSlide(newIndex);
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: 0,
    beforeChange: test,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnDotsHover: true,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      }
    ]
  };

//   async function getAllMovies () {
//     await _fetch("https://ia-cms.herokuapp.com/api/v1/public/web", "GET", currentToken).then((res) => res.json())
//       .then((data) => {console.log(data); setData(data)});
//   }

  useEffect( () => {
      if (data.length === 0) {
        dispatch(authActions.checkTokenExpiration(currentToken, history));
        if (currentToken) {
            // getAllMovies();
            dispatch(moviesActions.getCmsMovies(currentToken));
        }
      }
  }, [currentToken]);

  return (
    <div className="container">
      <div className="features-section">
        <Slider {...settings}>
          {data.length != 0 ? (
            data[0].movies.map((movie, index) => {
              return (
                <Link key={index} to={'/detail/feature/' + movie.movie.title}>
                  <div className={index === currentSlide ? 'active-feature-card' : 'blur-feature-card'}>
                    {/* <img className="feature-img" src={movie.url} alt="movie" /> */}
                    <img className="feature-img" src={movie.movie.imageCover} alt="movie" />
                  </div>
                </Link>
              )
            })
          ) :
          null
          }
        </Slider>
      </div>
      <div className="category-section">
        {
          data.map((category, index) => {
            return (
              <div key={index} style={{width: '100%'}}>
                <p className="category-title">{category.name}</p>
                <CategorySlider movies={category.movies} category={category.name}></CategorySlider>
              </div>
            )
          })
        }
      </div>
    </div>
  );
}

export default Home;
