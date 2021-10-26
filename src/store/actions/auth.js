import jwt_decode from "jwt-decode";
const axios = require('axios').default;

export const LOGIN = 'LOGIN';
export const SIGN_UP = 'SIGN_UP';
export const SET_USER = 'SET_USER';
export const SIGN_OUT = 'SIGN_OUT';
export const SET_TOKEN = 'SET_TOKEN';

const SSO_BASE_API_URL = 'https://singlesignonbackend.herokuapp.com/api/users/';

export const login = (email, password, history, errorCallback) => {

    return async dispatch => {
        await axios.post(SSO_BASE_API_URL + 'login', {
            email,
            password,
            tenant: 'web'
        })
        .then( res => {
            if (res.status === 200) {
                console.log( 'ÉXITO: SSO-API /login' ); 
                console.log( 'Resultado del usuario: \n', res.data);
                const user = jwt_decode(res.data.token);
                dispatch({
                    type: LOGIN,
                    payload: {
                        user,
                        token: res.data.token
                    }
                });
                localStorage.setItem('notflixUserData', JSON.stringify(user));
                localStorage.setItem('notflixUserToken', res.data.token);
                history.push('/home');
            }
        })
        .catch( err => {
            console.log( 'ERROR: SSO-API /login' );
            console.log( 'Error: ', err );
            errorCallback();
        })
    }
    // RESPONSE EXAMPLE for login
    // {
    //     "status": 200,
    //     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTY0ZmU2MjMzODRhNWYyMjY2MmYyMTYiLCJlbWFpbCI6ImNoeWFvQHRlc3QuY29tIiwidGVuYW50Ijoid2ViIiwibmFtZSI6IktldmluIiwibGFzdF9uYW1lIjoiWWFvIiwiYWRtaW4iOmZhbHNlLCJfX3YiOjAsImlhdCI6MTYzNDAwODcyNCwiZXhwIjoxNjM0MDk1MTI0fQ.p3lxEE5HLDjxltKNnRIuQ5czQtzP0fgEcptvzR0lENM",
    //     "message": "Token created successfully.",
    //     "redirect": "https://www.google.com/maps"
    // }
}

export const setUserData = (user) => {
    return dispatch => {
        dispatch({
            type: SET_USER,
            user
        })
    }
}

export const setUserToken = (token) => {
    return dispatch => {
        dispatch({
            type: SET_TOKEN,
            token
        })
    }
}



export const signOut = () => {
    return dispatch => {
        dispatch({
            type: SIGN_OUT,
        })
    }
}

export const signUp = (email, password, name, last_name, nextStep, errorCallback) => {
    console.log({email, password, name, last_name});
    return async dispatch => {
        await axios.post(SSO_BASE_API_URL + 'register', {
            email,
            password,
            tenant: 'web',
            name,
            last_name,
            admin: false
        })
        .then( res => {
            if (res.status === 201) {
                console.log( 'ÉXITO: SSO-API /register' ); 
                console.log( 'Resultado del register: \n', res.data);

                nextStep(4);
            }
        })
        .catch( err => {
            console.log( 'ERROR: SSO-API /register' );
            console.log( 'Error: ', err );
            errorCallback();
        })
    }
    // RESPONSE EXAMPLE for register
    // {
    //     "user": {
    //         "email": "chyao@test.com",
    //         "tenant": "web",
    //         "name": "Kevin",
    //         "last_name": "Yao",
    //         "admin": false,
    //         "_id": "6164fe623384a5f22662f216",
    //         "__v": 0
    //     },
    //     "message": "Succesfully Created User"
    // }
}

export const checkTokenExpiration = (currentToken, history) => {
        console.log('INICIAR TOKEN CHECK')
        const lsUserData = JSON.parse(localStorage.getItem('notflixUserData'));
        const lsUserToken = localStorage.getItem('notflixUserToken');
        const currentTime = new Date().getTime();
        if (!lsUserData && !currentToken) {
            console.log('NO CURRENT NI LS USER DATA');
            history.push('/login');
        } else if (lsUserData && !currentToken) {
            if (lsUserData.exp && new Date(lsUserData.exp * 1000) > currentTime) {
                setUserData(lsUserData);
                setUserToken(lsUserToken);
                console.log('NO CURRENT USER DATA and SET LS USER DATA');
            } else {
                history.push('/login');
                console.log('NO CURRENT USER DATA and LS USER DATA expired');
            }
        } else if (!lsUserData && currentToken) {
            const user = jwt_decode(currentToken);
            if (!(user.exp && new Date(user.exp * 1000) > currentTime)) {
                console.log('NO LS USER DATA and CURRENT USER DATA expired');
                history.push('/login');
            }
        } else if (lsUserData && currentToken) {
            const currentUser = jwt_decode(currentToken);
            let currentUserExpTime = currentUser.exp ? currentUser.exp * 1000 : undefined;
            let lsUserExpTime = lsUserData.exp ? lsUserData.exp * 1000 : undefined;
            if (!currentUserExpTime && !lsUserExpTime) {
                console.log('NO CURRENT TIME NI LS USER TIME');
                history.push('/login');
            } else if (!currentUserExpTime && lsUserExpTime) {
                if (lsUserExpTime > currentTime) {
                    console.log('NO CURRENT USER TIME and LS USER TIME NOT EXPIRED, SET LS USER DATA');
                    setUserData(lsUserData);
                    setUserToken(lsUserToken);
                } else {
                    console.log('NO CURRENT USER TIME and LS USER TIME expired');
                    history.push('/login');
                }
            } else if (currentUserExpTime && !lsUserExpTime) {
                if (currentUserExpTime < currentTime) {
                    console.log('HAS CURRENT USER TIME and NO LS USER TIME and CURRENT USER TIME expired');
                    history.push('/login');
                }
            } else if (currentUserExpTime && lsUserExpTime) {
                if (lsUserExpTime > currentUserExpTime) {
                    if (lsUserExpTime > currentTime) {
                        console.log('HAS BOTH TIME, and not expired');
                        setUserData(lsUserData);
                        setUserToken(lsUserToken);
                    } else {
                        console.log('HAS BOTH TIME, but LS USER TIME expired');
                        history.push('/login');
                    }
                } else if (currentUserExpTime < currentTime) {
                    console.log('HAS BOTH TIME, but CURRENT USER TIME expired');
                    history.push('/login');
                }
            }
        }  
}