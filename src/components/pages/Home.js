import React, { useState, useEffect } from 'react';
import Slider from "react-slick";
import CategorySlider from '../CategorySlider';
import './Home.scss';
import "react-multi-carousel/lib/styles.css";
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {_fetch} from '../../services/appController';
import * as authActions from '../../store/actions/auth';

// import { categoryMovies, featureMovies } from "../../dummy-data";

function Home() {

  let categories = useSelector(state => state.movies.categories);
  const featureMovies = useSelector(state => state.movies.featureMovies);

  const [currentSlide, setCurrentSlide] = useState(0);

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

//   useEffect(async () => {
//     //await _fetch("https://ia-cms.herokuapp.com/api/v1/public/films", "GET").then((res) => res.json())
//       //  .then((data) => console.log(data));
//   }, []);

  return (
    <div className="container">
      <div className="features-section">
        <Slider {...settings}>
          {
            featureMovies.map((movie, index) => {
              return (
                <Link to={'/detail/feature/' + movie.title}>
                  <div className={index === currentSlide ? 'active-feature-card' : 'blur-feature-card'}>
                    {/* <img className="feature-img" src={movie.url} alt="movie" /> */}
                    <img className="feature-img" src={movie.imageCover} alt="movie" />
                  </div>
                </Link>
              )
            })
          }
        </Slider>
      </div>
      <div className="category-section">
        {
          categories.map(category => {
            return (
              <>
                <p className="category-title">{category.name}</p>
                <CategorySlider movies={category.movies} category={category.name}></CategorySlider>
              </>
            )
          })
        }
      </div>
    </div>
  );
}

export default Home;
