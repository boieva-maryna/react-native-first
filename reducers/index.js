import { FETCH_IMAGES_SUCCESS, FETCH_IMAGES_FAILURE, FETCHING_IMAGES } from '../constants';
import {combineReducers} from 'redux';
const initialState = {
    images: [],
    isFetching: false,
    error: false,
    page:1
}

export function imagesReducer(state = initialState, action) {

    switch(action.type) {
        case FETCHING_IMAGES:
            return {
                ...state,
                isFetching: true
            }
        case FETCH_IMAGES_SUCCESS:
            console.log(action.data);
            return {
                ...state,
                isFetching: false,
                images: action.data.images,
                page:action.page.page
            }
        case FETCH_IMAGES_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: true
            }
        default:
            return state
    }
}
const rootReducer = combineReducers({
    imagesReducer
})

export default rootReducer;