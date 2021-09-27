import React, { useState } from 'react';
import './Login.css';
import { Link, useLocation } from 'react-router-dom';


function Login(props) {

    const signUpPage = props.location.signUpPage;
    console.log(signUpPage);
    const [ isSignUpPage, setIsSignUpPage ] = useState(signUpPage);

  return (

    <div className="login-block">
      <div className= "login-container">
        <p className="iniciar-sesion">{ isSignUpPage ? 'Registrarte' : 'Iniciar Sesión' }</p>
        <div className="email-box">
          <input className="search-input" type="text" placeholder="Email" />
        </div>
        <div className="contraseña-box">
          <input className="search-input" type="text" placeholder="Contraseña" />
        </div>
        {
            isSignUpPage ? (
                <>
                    <Link to="/sign-up" className="sesion-section" >  
                        <p className="link-registar">Comenzá!</p>
                    </Link>
                    <p className="registarte"> Ya tenés cuenta? 
                        <span className="underline" onClick={() => setIsSignUpPage(false)}>Iniciá sesión</span>
                    </p>
                </>
            ) : (
                <>
                    <Link to="/home" className="sesion-section" >  
                        <p className="link-registar"> Iniciar Sesión </p>
                    </Link>
                    <p className="registarte"> Aun no tienes cuenta? 
                        <span className="underline" onClick={() => setIsSignUpPage(true)}>Registrate</span>
                    </p>
                </>
            )
        }
      </div>
    </div>
  );
}

export default Login;
