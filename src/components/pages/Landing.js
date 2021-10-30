import React, { useState, useEffect} from 'react';
import '../../App.css';
import HeroSection from '../HeroSection';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as authActions from '../../store/actions/auth';
import * as moviesActions from '../../store/actions/movies';

function Home() {
    const currentToken = useSelector(state => state.auth.token);
    const data = useSelector(state => state.movies.movies);

    const dispatch = useDispatch();
    const history = useHistory();

    useEffect( () => {
        if (data.length === 0) {
          dispatch(authActions.checkTokenExpiration(currentToken, history, true));
          if (currentToken) {
              // getAllMovies();
              dispatch(moviesActions.getCmsMovies(currentToken));
          }
        }
    }, [currentToken]);

  return (
    <>
      <HeroSection />
    </>
  );
}

export default Home;
