import jwt_decode from "jwt-decode";
const axios = require('axios').default;

export const LOGIN = 'LOGIN';
export const SIGN_UP = 'SIGN_UP';
export const SET_USER = 'SET_USER';
export const SIGN_OUT = 'SIGN_OUT';

const SSO_BASE_API_URL = 'https://singlesignonbackend.herokuapp.com/api/users/';

export const login = (email, password, history) => {

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
                history.push('/home');
            }
        })
        .catch( err => {
            console.log( 'ERROR: SSO-API /login' );
            console.log( 'Error: ', err );
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

export const signOut = () => {
    return dispatch => {
        dispatch({
            type: SIGN_OUT,
        })
    }
}

export const signUp = (email, password, name, last_name, history) => {
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
            if (res.status === 200) {
                console.log( 'ÉXITO: SSO-API /register' ); 
                console.log( 'Resultado del register: \n', res.data);

                history.push('/login');
            }
        })
        .catch( err => {
            console.log( 'ERROR: SSO-API /register' );
            console.log( 'Error: ', err );
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