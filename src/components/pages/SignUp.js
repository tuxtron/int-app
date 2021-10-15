import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import * as authActions from '../../store/actions/auth';
import * as packageActions from '../../store/actions/package';
import './SignUp.scss';

import background from '../../assets/images/signup-bg.png';
import logo from '../../assets/images/logo_notflix.png';
import { packages } from '../../dummy-data';

import InputMask from 'react-input-mask';
import ReactCardFlip from 'react-card-flip';
import ConfirmDialog from '../ConfirmDialog';

export default function SignUp(props) {

    const history = useHistory();
    const dispatch = useDispatch();
    const allAvailablePackages = useSelector(state => state.package.allAvailablePackages);

    let email = props.location.email;
    let password = props.location.password;

    const [ step, setStep ] = useState(1);

    const [ nameInput, setNameInput ] = useState('');
    const [ firsNameInput, setFirstNameInput ] = useState('');
    const [ birthdayInput, setBirthdayInput ] = useState('');

    const [ selectedPackage, setSelectedPackage ] = useState(null);

    const [ creditCardFlipped, setCreditCardFlipped ] = useState(false);
    const [ ccNumberInput, setCcNumberInput ] = useState('');
    const [ ccNameInput, setCcNameInput ] = useState('');
    const [ ccExpiredDateInput, setCcExpiredDateInput ] = useState('');
    const [ ccSecurityCodeInput, setCcSecurityCodeInput ] = useState('');

    const [ cardNumber, setCardNumber ] = useState('****************');
    const [ name, setName ] = useState('Nombre completo');
    const [ expiredDate, setExpiredDate ] = useState('**/**');
    const [ securityCode, setSecurityCode ] = useState('***');

    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        dispatch(packageActions.getAllPackages());
    }, []);
    
    const checkConfirmBtnAvailable = () => {
        if (nameInput !== '' && firsNameInput !== '' && birthdayInput !== '' && !birthdayInput.includes('_')) {
            return true;
        }
        return false;
    }

    const checkPackageBtnAvailable = () => {
        return selectedPackage === null;
    }

    const handleCcNameChange = (text) => {
        setCcNameInput(text);
        if (text.length === 0) {
            setName('Nombre completo');
        } else {
            setName(text);
        }
    }

    const goToLogin = () => {
        history.push('/login');
    }

    const handleCcNumberChange = (text) => {
        const strLength = text.length;
        setCcNumberInput(text);
        if ( text[0] && text[0] === '3' ) {
            setCardNumber(text+"*".repeat(15 - strLength));
            if ( securityCode === '***' ) {
                setSecurityCode('****');
            }
        } else {
            setCardNumber(text+"*".repeat(16 - strLength));
            if ( securityCode === '****' ) {
                setSecurityCode('***');
            }
        }
    }

    const handleExpiredDateChange = (text) => {
        const cleanText = text.replace('/', '');
        if ( cleanText.length === 0 ) {
            setExpiredDate('**/**')
            setCcExpiredDateInput('')
        } else if ( cleanText.length === 1) {
            setExpiredDate(cleanText + "*/**");
            setCcExpiredDateInput(text);
        } else if ( cleanText.length === 2) {
            setExpiredDate(cleanText + "/**");
            setCcExpiredDateInput(text);
        } else if ( cleanText.length === 3) {
            setExpiredDate(cleanText.slice(0, 2) + "/" + cleanText.slice(-1) + '*');
            setCcExpiredDateInput(cleanText.slice(0, 2) + "/" +  cleanText.slice(-1));
        } else if ( cleanText.length === 4) {
            setExpiredDate(cleanText.slice(0, 2) + "/" + cleanText.slice(-2));
            setCcExpiredDateInput(cleanText.slice(0, 2) + "/" + cleanText.slice(-2));
        }
    }    

    const handleSecurityCodeChange = (text) => {
        const strLength = text.length;
        setCcSecurityCodeInput(text);
        if ( cardNumber[0] && cardNumber[0] === '3' ) {
            setSecurityCode(text + "*".repeat(4 - strLength));
        } else {
            setSecurityCode(text + "*".repeat(3 - strLength));
        }
    }

    const checkConfirmPaymentBtnAvailable = () => {
        if (
            ccNameInput !== "" &&
            ccNumberInput !== "" &&
            ccExpiredDateInput !== "" &&
            ccSecurityCodeInput !== "" &&
            !cardNumber.includes("*") &&
            !expiredDate.includes("*") &&
            !securityCode.includes("*")
        ) {
            return true;
        }
        return false;
    }

    const signUpErrorHandler = () => {
        setOpenModal(true);
    }

    const confirmedBtnClicked = () => {
        dispatch(
            authActions.signUp(
                email,
                password,
                nameInput,
                firsNameInput,
                setStep,
                signUpErrorHandler
            )
        );
    }
    

  return (
      <>
        <div className="signup-container">
            <div className="signup-inputs-section">
                <img src={logo} alt="logo" />
                {step === 1 ? (
                    <div className="step-one-section">
                        <p className="signup-text">Completá tus datos</p>
                        <div className="input-container">
                            <input
                                type="text"
                                placeholder="Nombre"
                                value={nameInput}
                                onChange={(event) => {
                                    setNameInput(event.target.value);
                                }}
                            />
                        </div>
                        <div className="input-container">
                            <input
                                type="text"
                                placeholder="Apellido"
                                value={firsNameInput}
                                onChange={(event) => {
                                    setFirstNameInput(event.target.value);
                                }}
                            />
                        </div>
                        <div className="input-container">
                            <InputMask
                                mask="99/99/9999"
                                placeholder="Fecha de nacimiento (Example: 31/12/1990)"
                                value={birthdayInput}
                                onChange={(event) => {
                                    setBirthdayInput(event.target.value);
                                    //   console.log(birthdayInput);
                                }}
                            ></InputMask>
                        </div>
                        <div
                            className={
                                checkConfirmBtnAvailable()
                                    ? "continue-btn active"
                                    : "continue-btn"
                            }
                            onClick={() => setStep(2)}
                        >
                            <p>Continuar</p>
                        </div>
                    </div>
                ) : null}
                {step === 2 ? (
                    <div className="step-two-section">
                        <div className="greeting-section">
                            <p className="greeting-text">Hola {nameInput} 👋🏻</p>
                            <p className="greeting-text">
                                Elegí un paquete para avanzar!
                            </p>
                        </div>
                        <div className="package-section">
                            {allAvailablePackages.map((p, index) => {
                                return (
                                    <div
                                        className={
                                            selectedPackage === index
                                                ? "package selected"
                                                : "package"
                                        }
                                        key={index}
                                        onClick={() => setSelectedPackage(index)}
                                    >
                                        <div className="package-name">
                                            <div className="border">
                                                <p>Paquete</p>
                                                <p>{p.nombre}</p>
                                            </div>
                                        </div>
                                        <div className="package-info">
                                            <p className="package-price">
                                                Por ${p.precio} tenés
                                            </p>
                                            <p className="package-feature">
                                                - {p.descripcion}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <div
                            className={
                                checkPackageBtnAvailable()
                                    ? "package-btn"
                                    : "package-btn active"
                            }
                            onClick={() => setStep(3)}
                        >
                            <p>Ir a pagar</p>
                        </div>
                    </div>
                ) : null}
                {step === 3 ? (
                    <div className="step-three-section">
                        <ReactCardFlip
                            isFlipped={creditCardFlipped}
                            flipDirection="horizontal"
                            containerClassName="credit-card"
                        >
                            <div class="card__front">
                                <span class="chip"></span>
                                {ccNumberInput.length !== 0 &&
                                ccNumberInput[0] === "4" ? (
                                    <img
                                        class="card-company visa"
                                        src={require("../../assets/images/visa.png")}
                                        alt="card_logo"
                                    />
                                ) : null}
                                {ccNumberInput.length !== 0 &&
                                ccNumberInput[0] === "5" ? (
                                    <img
                                        class="card-company"
                                        src={require("../../assets/images/mastercard.png")}
                                        alt="card_logo"
                                    />
                                ) : null}
                                {ccNumberInput.length !== 0 &&
                                ccNumberInput[0] === "3" ? (
                                    <img
                                        class="card-company"
                                        src={require("../../assets/images/amex.png")}
                                        alt="card_logo"
                                    />
                                ) : null}
                                <span class="cc-number">
                                    {ccNumberInput.length !== 0 &&
                                    ccNumberInput[0] === "3"
                                        ? cardNumber.slice(0, 4) +
                                            " " +
                                            cardNumber.slice(4, 10) +
                                            " " +
                                            cardNumber.slice(-5)
                                        : cardNumber.slice(0, 4) +
                                            " " +
                                            cardNumber.slice(4, 8) +
                                            " " +
                                            cardNumber.slice(8, 12) +
                                            " " +
                                            cardNumber.slice(-4)}
                                </span>
                                <span class="cc-date expedition">
                                    Valido <br></br> hasta
                                </span>
                                <span class="cc-date expiry">{expiredDate}</span>
                                <span class="cc-name">{name}</span>
                            </div>

                            <div class="card__back">
                                <div class="card__black-line"></div>
                                <div class="card__back-content">
                                    <div class="card__secret">
                                        <p class="card__secret--last">
                                            {securityCode}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </ReactCardFlip>
                        <div className="credit-card-info">
                            <div className="input-container">
                                <input
                                    type="text"
                                    placeholder="Nombre y apellido"
                                    value={ccNameInput}
                                    onChange={(event) =>
                                        handleCcNameChange(event.target.value)
                                    }
                                    onFocus={() => setCreditCardFlipped(false)}
                                />
                            </div>
                            <div className="input-container">
                                <input
                                    type="text"
                                    placeholder="Número de tarjeta"
                                    value={ccNumberInput}
                                    onChange={(event) =>
                                        handleCcNumberChange(event.target.value)
                                    }
                                    onFocus={() => setCreditCardFlipped(false)}
                                    maxLength={ccNumberInput[0] === "3" ? 15 : 16}
                                />
                            </div>
                            <div className="row">
                                <div className="input-container">
                                    <input
                                        type="text"
                                        placeholder="Vencimiento"
                                        value={ccExpiredDateInput}
                                        onChange={(event) =>
                                            handleExpiredDateChange(
                                                event.target.value
                                            )
                                        }
                                        onFocus={() =>
                                            setCreditCardFlipped(false)
                                        }
                                    />
                                </div>
                                <div className="input-container">
                                    <input
                                        type="text"
                                        placeholder="Cod. Seguridad"
                                        value={ccSecurityCodeInput}
                                        onChange={(event) =>
                                            handleSecurityCodeChange(
                                                event.target.value
                                            )
                                        }
                                        maxLength={
                                            ccNumberInput[0] === "3" ? 4 : 3
                                        }
                                        onFocus={() => setCreditCardFlipped(true)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div
                            className={
                                checkConfirmPaymentBtnAvailable()
                                    ? "confirm-payment-btn active"
                                    : "confirm-payment-btn"
                            }
                            onClick={confirmedBtnClicked}
                        >
                            <p>Confirmar</p>
                        </div>
                    </div>
                ) : null}
                {step === 4 ? (
                    <div className="step-four-section">
                        <p class="success-text">
                            ¡Listo! <br></br> Ya podés empezar a disfrutar{" "}
                            <span className="notflix">NotFlix</span>
                        </p>
                        <img
                            class="success-img"
                            src={require("../../assets/images/success.svg")}
                            alt="success"
                        />
                        <div className="login-btn" onClick={() => goToLogin()}>
                            <p>Iniciar sesión</p>
                        </div>
                    </div>
                ) : null}
            </div>

            <div className="image-container">
                <img src={background} alt="side-bg" />
            </div>
        </div>
      <ConfirmDialog 
            open={openModal} 
            closeHandler={() => setOpenModal(false)} 
            title="Error al registrar cuenta"
            body="Hubo un error al registar tu cuenta, por favor intentá nuevamente"
        />
      </>
  );
}
