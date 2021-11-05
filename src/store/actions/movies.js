const axios = require('axios').default;

export const SET_MOVIES = 'SET_MOVIES';
export const SET_ALL_MOVIES = 'SET_ALL_MOVIES';

const CMS_BASE_API_URL = 'https://ia-cms.herokuapp.com/api/v1/';

export const getCmsMovies = (token, loadingHandler = undefined) => {
    // console.log(token);
    return async dispatch => {
        await axios.get(CMS_BASE_API_URL + 'public/web', {
            headers: {
                'x-access-token': token
            }
        })
        .then( res => {
            // console.log(res);
            let allMovies = [];
            if (res.data.length !== 0) {
                res.data.forEach(category => {
                    allMovies = allMovies.concat(category.movies); 
                });
            }
            dispatch({
                type: SET_MOVIES,
                movies: res.data,
                allMovies: allMovies
            });
            if (loadingHandler) {
                loadingHandler(false);
            }
            
        })
        .catch( err => {
            console.log(err)
        });
    }
}