import React from 'react';
import Navbar from './components/Navbar';
import './App.css';
import Landing from './components/pages/Landing';
import Home from './components/pages/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Services from './components/pages/Services';
import SignIn from './components/pages/SignIn';
import SignUp from './components/pages/SignUp';
import MovieDetail from './components/pages/MovieDetail';
import Player from './components/pages/Player';
import HomeFooter from './components/HomeFooter';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Landing} />
          <Route path='/home' exact component={Home} />
          <Route path='/services' component={Services} />
          <Route path='/sign-in' component={SignIn} />
          <Route path='/sign-up' component={SignUp} />
          <Route path='/detail' component={MovieDetail} />
          <Route path='/player' component={Player} />
        </Switch>
        <HomeFooter />
      </Router>
    </>
  );
}

export default App;
