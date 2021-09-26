import React from 'react';
import './Login.css';
import { Link } from 'react-router-dom';


function Login() {

  return (

    <div className="login-block">
      <div className= "login-container">
        <p className="iniciar-sesion"> Iniciar Sesión</p>
        <div className="email-box">
          <input className="search-input" type="text" placeholder="Email" />
        </div>
        <div className="contraseña-box">
          <input className="search-input" type="text" placeholder="Contraseña" />
        </div>
        <div className="sesion-section" >  
          <Link to="/Home" className="link-registar"> Iniciar Sesión </Link>
          </div>
        <p className="registarte"> Aun no tienes cuenta? <Link to="/sign-up" className="link-registar"> Registrate </Link></p>
      </div>
    </div>
  );
}

export default Login;
