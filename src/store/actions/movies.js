const axios = require('axios').default;

export const SET_MOVIES = 'SET_MOVIES';

const CMS_BASE_API_URL = 'https://ia-cms.herokuapp.com/api/v1/';

export const getCmsMovies = (token) => {
    console.log(token);
    return async dispatch => {
        await axios.get(CMS_BASE_API_URL + 'public/web', {
            headers: {
                'x-access-token': token
            }
        })
        .then( res => {
            console.log(res);
        })
        .catch( err => {
            console.log(err)
        });
    }
}