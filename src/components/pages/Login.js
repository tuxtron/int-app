import React, { useState } from "react";
import "./Login.css";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as authActions from "../../store/actions/auth";
import ConfirmDialog from "../ConfirmDialog";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

function Login(props) {
  const dispatch = useDispatch();
  const history = useHistory();

  const signUpPage = props.location.signUpPage;
  const [isSignUpPage, setIsSignUpPage] = useState(signUpPage);
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loginSpinner, setLoginSpinner] = useState(false);

  const [openModal, setOpenModal] = useState(false);
  const [openPasswordModal, setOpenPasswordModal] = useState(false);
  const [openEmailPatternModal, setOpenEmailPatternModal] = useState(false);

  const loginErrorHandler = () => {
    setOpenModal(true);
  };

  const login = () => {
    setLoginSpinner(true);
    dispatch(authActions.login(user, password, history, loginErrorHandler));
  };

  const goToLanding = () => {
    history.push("/");
  };

  const handleSignup = () => {
    if (!checkEmailPattern()) {
      setOpenEmailPatternModal(true);
    } else if (password !== confirmPassword) {
      setOpenPasswordModal(true);
    } else {
      history.push({
        pathname: "/sign-up",
        state: {
          email: user,
          password,
        },
      });
    }
  };

  const checkEmailPattern = () => {
    const regex = new RegExp("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$");
    return regex.test(user);
  };

  return (
    <>
      <div className="login-block">
        <img class="logo" src="/logo192.png" alt="logo" onClick={goToLanding} />
        <div className="login-container">
          <p className="iniciar-sesion">
            {isSignUpPage ? "Registrarte" : "Iniciar Sesión"}
          </p>
          <div className={"email-box"}>
            <input
              className="search-input"
              type="text"
              placeholder="Email"
              autofocus
              value={user}
              onChange={(event) => setUser(event.target.value)}
            />
          </div>
          <div className={"email-box"}>
            <input
              className="search-input"
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          {isSignUpPage ? (
            <div className={"email-box"}>
              <input
                className="search-input"
                type="password"
                placeholder="Confirmar contraseña"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
              />
            </div>
          ) : null}
          {isSignUpPage ? (
            <>
              <div onClick={handleSignup} className="sesion-section">
                <p className="link-registar">Comenzá!</p>
              </div>
              <p className="registarte">
                {" "}
                Ya tenés cuenta?
                <span
                  className="underline"
                  onClick={() => setIsSignUpPage(false)}
                >
                  Iniciá sesión
                </span>
              </p>
            </>
          ) : (
            <>
              <div onClick={login} className="sesion-section">
                {/* <Link to="/home" className="sesion-section"> */}
                <p className="link-registar">
                  {" "}
                  {loginSpinner ? (
                    <Loader
                      type="Oval"
                      color="#FFFFFF"
                      height={50}
                      width={50}
                      timeout={10000} //10 secs
                    />
                  ) : (
                    "Iniciar Sesión"
                  )}{" "}
                </p>
              </div>
              <p className="registarte">
                {" "}
                Aun no tienes cuenta?
                <span
                  className="underline"
                  onClick={() => {
                    setIsSignUpPage(true);
                    setUser("");
                    setPassword("");
                  }}
                >
                  Registrate
                </span>
              </p>
            </>
          )}
        </div>
      </div>
      <ConfirmDialog
        open={openModal}
        closeHandler={() => { setOpenModal(false); setLoginSpinner(false)}}
        title="Credencial incorrecta"
        body="Hubo un error al iniciar sesión, por favor intentá nuevamente"
      />
      <ConfirmDialog
        open={openPasswordModal}
        closeHandler={() => setOpenPasswordModal(false)}
        title="Contraseñas incorrectas"
        body="Las contraseñas ingresadas no coinciden, por favor ingresá nuevamente"
      />
      <ConfirmDialog
        open={openEmailPatternModal}
        closeHandler={() => setOpenEmailPatternModal(false)}
        title="Email inválido"
        body="El formato de email es inválido, por favor ingresá nuevamente"
      />
    </>
  );
}

export default Login;
