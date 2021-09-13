import React, { useState } from 'react';
import Slider from "react-slick";

import './CategorySlider.scss';
import "react-multi-carousel/lib/styles.css";

import { categoryMovies } from '../dummy-data';

function CategorySlider() {

    const [ currentSlide, setCurrentSlide ] = useState(0);

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 1,
        initialSlide: 0,
        responsive: [],
        swipeToSlide: true,
        afterChange: function(index) {
            console.log(
            `Slider Changed to: ${index + 1}, background: #222; color: #bada55`
            );
        }
    };

  return (
    <div className="category-container">
        <Slider {...settings}>
        {
            categoryMovies.map(movie => {
                return (
                    <div className="category-movie-card">
                            <img className="movie-img" src={movie.url} alt="movie" />
                    </div>
                )
            })
        }
        </Slider>
    </div>
  );
}

export default CategorySlider;
