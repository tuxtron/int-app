const axios = require('axios').default;

export const SET_ALL_PACKAGES = 'SET_ALL_PACKAGES';

const PACKAGE_BASE_API_URL = 'https://suscripciones-backend.herokuapp.com/api/';

export const getAllPackages = () => {
    return async dispatch => {
        await 
            axios.get(PACKAGE_BASE_API_URL + 'packages/v1/list')
            .then( res => {
                // console.log( 'ÉXITO: PACK-SUBS-API /packages/v1/list' ); 
                // console.log( 'Resultado del paquetes: \n', res.data.data);

                dispatch({
                    type: SET_ALL_PACKAGES,
                    packages: res.data.data.sort((a, b) => a.precio - b.precio),
                })
            })
            .catch( err => {
                console.log( 'ERROR: PACK-SUBS-API /packages/v1/list' );
                console.log( 'Error: ', err );
            })
    }
}