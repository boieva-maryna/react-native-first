import { FETCH_IMAGES_SUCCESS, FETCH_IMAGES_FAILURE, FETCHING_IMAGES } from '../constants';
const URL='https://api.unsplash.com/photos/?client_id=cf49c08b444ff4cb9e4d126b7e9f7513ba1ee58de7906e4360afc1a33d1bf4c0';

getImages=()=>({
    type:FETCHING_IMAGES
  });
getImagesSuccess=(data)=>({
        type: FETCH_IMAGES_SUCCESS,
        data
});

getImagesFailure=()=>({
        type: FETCH_IMAGES_FAILURE
});
export const fetchImages= (page) => dispatch => {
        dispatch(getImages());
        return(fetch(`${URL}&page=${page}`))
        .then(res => res.json())
        .then(json => {
            return(dispatch(getImagesSuccess({images:json,page:page})))
        })
        .catch(err => {
            return dispatch(getImagesFailure(err));
        })
}
