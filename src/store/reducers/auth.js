import {
    LOGIN,
    SET_USER,
    SIGN_OUT,
    SET_TOKEN
} from '../actions/auth';

const initialState = {
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
    // token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTY0ZmU2MjMzODRhNWYyMjY2MmYyMTYiLCJlbWFpbCI6ImNoeWFvQHRlc3QuY29tIiwidGVuYW50Ijoid2ViIiwibmFtZSI6IktldmluIiwibGFzdF9uYW1lIjoiWWFvIiwiYWRtaW4iOmZhbHNlLCJfX3YiOjAsImlhdCI6MTYzNDAwODcyNCwiZXhwIjoxNjM0MDk1MTI0fQ.p3lxEE5HLDjxltKNnRIuQ5czQtzP0fgEcptvzR0lENM',
    // isUserLogged: true,
    loggedUser: undefined,
    token: undefined,
    isUserLogged: false,
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
                token: action.token
            }
        default:
            return state;
    }
}

export default authReducer;