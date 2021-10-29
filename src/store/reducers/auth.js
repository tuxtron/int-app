import {
    LOGIN,
    SET_USER,
    SIGN_OUT
} from '../actions/auth';

const initialState = {
    loggedUser: {
        admin: false,
        email: "chyao@test.com",
        exp: 1634104548,
        iat: 1634018148,
        last_name: "Yao",
        name: "Kevin",
        tenant: "web",
        __v: 0,
        _id: "6164fe623384a5f22662f216",
    },
    token: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGFpbXMiOltdLCJfaWQiOiI2MTY2NmI1Y2UwYzgyZGFiMDZiMWY4YzMiLCJlbWFpbCI6IndlYjFAdGVzdC5jb20iLCJ0ZW5hbnQiOiJ3ZWIiLCJuYW1lIjoiS2V2aW4iLCJsYXN0X25hbWUiOiJZYW8iLCJhZG1pbiI6ZmFsc2UsIl9fdiI6MCwiaWF0IjoxNjM1Mzc0MzU5LCJleHAiOjE2MzU0NjA3NTl9.WrYiJ5N6h9EXXE_-_gQyF4mvOZzmG36AxrbILHuikLo6SdYLUZ_Ozjoy6fnKMJyZnsTtnkPcghLKRtLXRSuL2CrZ8fB9MAOaqG95DqPxa-kfI5OMEGrYcFxQiZe44dR7EsA1I-zQ-hvoVyfwc1aNWGn5VwErIFFGV2th-cHVKV4qcCwCCq9vtOpTO2aTKBBEbMG8LPV22sphJDGn4KGD8qQ_l1qY3xUrZCNtCqerx0g8qsBPAAezAY_Os0Tyxj8_RJHW4gtZuLtTvGSjBsQNRuvWfnpCwrD69o6JUjL8vSPO5oatwJCbrfZSKT_4UtA7f4gLWTFR4wgnRx50sKm9NdS3NZ6GaXH1-kNWWhQGx5vePZak-Checm3ZJNm_Y2p1OiohZuoetLoE-q8BDw8xe4kCWNoPu-jLe4ZjIr-5TpJ19Ci9gg5cVsJBHgYfw38Xq8OL8Yg54SPx5OZY5EHgTqXuGcXWac9VtVIN_YJ6dcMrmDKlh6bjou2pzkCdSmg_-Gwino5Lz7SUmHUyK_mupKaYKPWgQQ6k7n_oH5QB02Cl8cPApI9I9JXa-0GiMhsuHKTmeQN43Vh-nBmnGCvjZkayK8-rPAjjrUNim_yHQkXN7vuSX7sYmYEZu458bvTeBsiFcrCmSDQgp0tYcW5OH6NupRJ8bUQ_8a7EIDEuqto",
    isUserLogged: true,
    //loggedUser: {},
    //isUserLogged: false,
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
        default:
            return state;
    }
}

export default authReducer;