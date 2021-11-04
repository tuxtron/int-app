import React from 'react';
import Slider from "react-slick";
import { Link } from 'react-router-dom';

import './CategorySlider.scss';
import "react-multi-carousel/lib/styles.css";

import { categoryMovies } from '../dummy-data';

function FavouriteSlider(props) {

    console.log('MOVIES F: ', props.movies);
    const category = props.category;

    var settings = {
        dots: false,
        infinite: props.movies.length >= 8,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 1,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1740,
                settings: {
                  slidesToShow: 6,
                  slidesToScroll: 1,
                }
            },
            {
                breakpoint: 1499,
                settings: {
                  slidesToShow: 5,
                  slidesToScroll: 1,
                }
            },
            {
                breakpoint: 1365,
                settings: {
                  slidesToShow: 4,
                  slidesToScroll: 1,
                }
            },
            {
                breakpoint: 1099,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 3,
                }
            },
            {
                breakpoint: 899,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 2,
                }
            },
            {
                breakpoint: 500,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                }
            },
        ],
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
            props.movies.map((m, index) => {
            // categoryMovies.map(m => {
                return (
                    <Link
                        key={index}
                        to={{
                            pathname: `/detail/${category}/${m.title}`,
                            movie: m,
                            category
                        }}
                    >
                        <div className="category-movie-card">
                            <img className="movie-img" src={m.imageMobile} alt="movie" />
                        </div>
                    </Link>
                )
            })
        }
        </Slider>
    </div>
  );
}

export default FavouriteSlider;
