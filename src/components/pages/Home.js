
import React, { useState, useEffect } from 'react';
import Slider from "react-slick";
import CategorySlider from '../CategorySlider';
import './Home.scss';
import "react-multi-carousel/lib/styles.css";
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as authActions from '../../store/actions/auth';

// import { categoryMovies, featureMovies } from "../../dummy-data";

function Home() {

  let categories = useSelector(state => state.movies.categories);
  const featureMovies = useSelector(state => state.movies.featureMovies);

  const [currentSlide, setCurrentSlide] = useState(0);

  const test = (oldIndex, newIndex) => {
    setCurrentSlide(newIndex);
  }
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
