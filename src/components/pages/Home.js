import React, { useState } from 'react';
import Slider from "react-slick";
import CategorySlider from '../CategorySlider';
import './Home.scss';
import "react-multi-carousel/lib/styles.css";

import { featureMovies } from "../../dummy-data";

function Home() {
    const [ currentSlide, setCurrentSlide ] = useState(0);

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



  return (
    <div className="container">
        <div className="features-section">
            <Slider {...settings}>
                {
                    featureMovies.map((movie, index) => {
                        return (
                            <div className={index === currentSlide ? 'active-feature-card' : 'blur-feature-card'}>
                                <img className="feature-img" src={movie.url} alt="movie" />
                            </div>
                        )
                    })
                }
            </Slider>
        </div>
        <div className="category-section">
            <p className="category-title">Aventura</p>
            <CategorySlider></CategorySlider>
            <p className="category-title">Aventura</p>
            <CategorySlider></CategorySlider>
            <p className="category-title">Aventura</p>
            <CategorySlider></CategorySlider>
            <p className="category-title">Aventura</p>
            <CategorySlider></CategorySlider>
        </div>
    </div>
  );
}

export default Home;
