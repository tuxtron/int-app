import {
    SET_ALL_PACKAGES,
} from '../actions/package';

const initialState = {
    allAvailablePackages: [],
}

const packageReducer = ( state = initialState, action ) => {
    switch (action.type) {
        case SET_ALL_PACKAGES:
            return { ...state, allAvailablePackages: action.packages }
        default:
            return state;
    }
}

export default packageReducer;