import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import CategorySlider from "../CategorySlider";
import FavouriteSlider from "../FavouriteSlider";
import "./Home.scss";
import "react-multi-carousel/lib/styles.css";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as authActions from "../../store/actions/auth";
import * as moviesActions from "../../store/actions/movies";
import { Drawer } from "rsuite";
import "rsuite/dist/rsuite.min.css";

// import { categoryMovies, featureMovies } from "../../dummy-data";

function Home() {
  const currentToken = useSelector((state) => state.auth.token);
  let categories = useSelector((state) => state.movies.categories);
  const featureMovies = useSelector((state) => state.movies.featureMovies);
  const data = useSelector((state) => state.movies.movies);

  const [currentSlide, setCurrentSlide] = useState(0);
  //   const [data, setData] = useState([]);

  const [favModal, setFavmodal] = useState(null);

  const dispatch = useDispatch();

  const history = useHistory();

  const test = (oldIndex, newIndex) => {
    setCurrentSlide(newIndex);
  };

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
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
    ],
  };

  //   async function getAllMovies () {
  //     await _fetch("https://ia-cms.herokuapp.com/api/v1/public/web", "GET", currentToken).then((res) => res.json())
  //       .then((data) => {console.log(data); setData(data)});
  //   }

  useEffect(() => {
    console.log("entre set fav modal")
    setFavmodal(JSON.parse(localStorage.getItem("showFavModal")));
  }, [localStorage.getItem("showFavModal")]);

  useEffect(() => {
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
          {data.length != 0
            ? data[0].movies.map((movie, index) => {
                return (
                  <Link
                    key={index}
                    to={{
                      pathname: `/detail/${data[0].name}/` + movie.movie.title,
                      movie: movie.movie,
                    }}
                  >
                    <div
                      className={
                        index === currentSlide
                          ? "active-feature-card"
                          : "blur-feature-card"
                      }
                    >
                      {/* <img className="feature-img" src={movie.url} alt="movie" /> */}
                      <img
                        className="feature-img"
                        src={movie.movie.imageCover}
                        alt="movie"
                      />
                    </div>
                  </Link>
                );
              })
            : null}
        </Slider>
      </div>
      <div className="category-section">
        {data.map((category, index) => {
          return (
            <div key={index} style={{ width: "100%" }}>
              <p className="category-title">{category.name}</p>
              <CategorySlider
                movies={category.movies}
                category={category.name}
              ></CategorySlider>
            </div>
          );
        })}
      </div>
      {favModal ? (
        <Drawer
          size="lg"
          placement="top"
          open={favModal}
          onClose={() => {setFavmodal(false); localStorage.setItem("showFavModal", false)}}
          
        >
          <Drawer.Header className="drawer-header">
            <Drawer.Title style={{ color: "#FFFF" }}>
              Mis Favoritos
            </Drawer.Title>
          </Drawer.Header>
          <Drawer.Body className="drawer-body">
            {window.localStorage.getItem("favs") ? (
              <FavouriteSlider
                movies={JSON.parse(window.localStorage.getItem("favs"))}
                category={"Favoritos"}
              />
            ) : (
              <p>
                Aún no tienes películas en favoritos, ¿Qué estas esperando para
                agregar una?
              </p>
            )}
          </Drawer.Body>
        </Drawer>
      ) : null}
    </div>
  );
}

export default Home;
