import {
    LOGIN,
    SET_USER,
    SIGN_OUT,
    SET_TOKEN,
    SET_NAVBAR_OPEN,
} from '../actions/auth';

const initialState = {
    loggedUser: undefined,
    token: undefined,
    isUserLogged: false,
    navbarMenuOpen: false,
    // loggedUser: {
    //     admin: false,
    //     email: "chyao@test.com",
    //     exp: 1634104548,
    //     iat: 1634018148,
    //     last_name: "Yao",
    //     name: "Kevin",
    //     tenant: "web",
    //     __v: 0,
    //     _id: "6164fe623384a5f22662f216",
    // },
    // token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTY2NmI1Y2UwYzgyZGFiMDZiMWY4YzMiLCJlbWFpbCI6IndlYjFAdGVzdC5jb20iLCJ0ZW5hbnQiOiJ3ZWIiLCJuYW1lIjoiS2V2aW4iLCJsYXN0X25hbWUiOiJZYW8iLCJhZG1pbiI6ZmFsc2UsIl9fdiI6MCwiaWF0IjoxNjM0OTQ4Njc1LCJleHAiOjE2MzUwMzUwNzV9.5cycfgF0hsHXeTtgWe2TyXAy0cOJ0fBdJjQZfz0wKLY",
    // isUserLogged: true,
}

const authReducer = ( state = initialState, action ) => {
    switch (action.type) {
        case LOGIN:
            return { 
                ...state, 
                loggedUser: action.payload.user,
                isUserLogged: true,
                token: action.payload.token,
            }
        case SET_USER:
            return {
                ...state,
                loggedUser: action.user,
                isUserLogged: true
            }
        case SIGN_OUT:
            return {
                ...state,
                loggedUser: {},
                isUserLogged: false,
                token: ''
            }
        case SET_TOKEN:
            return {
                ...state,
                token: action.payload.token
            }
        case SET_NAVBAR_OPEN:
            return {
                ...state,
                navbarMenuOpen: action.open
            }
        default:
            return state;
    }
}

export default authReducer;