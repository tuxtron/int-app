import React from 'react';
import './App.css';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import authReducer from './store/reducers/auth';
import movieReducer from './store/reducers/movies';
import packageReducer from './store/reducers/package';

import Services from './components/pages/Services';
import SignIn from './components/pages/SignIn';
import SignUp from './components/pages/SignUp';
import MovieDetail from './components/pages/MovieDetail';
import Player from './components/pages/Player';
import HomeFooter from './components/HomeFooter';
import Login from './components/pages/Login';
import Landing from './components/pages/Landing';
import Home from './components/pages/Home';
import Navbar from './components/Navbar';

function App() {

    const rootReducer = combineReducers({
        auth: authReducer,
        movies: movieReducer,
        package: packageReducer,
    });
    
    const store = createStore(rootReducer, applyMiddleware(ReduxThunk))

  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Landing} />
          <Route path='/home' exact component={Home} />
          <Route path='/services' component={Services} />
          <Route path='/sign-in' component={SignIn} />
          <Route path='/sign-up' component={SignUp} />
          <Route path='/login' component={Login} />
          <Route path='/detail/:category/:movieName' component={MovieDetail} />
          <Route path='/player/:category/:movieName' component={Player} />
        </Switch>
        <HomeFooter />
      </Router>
    </Provider>
  );
}

export default App;
