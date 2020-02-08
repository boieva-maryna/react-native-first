import { FETCH_IMAGES_SUCCESS, FETCH_IMAGES_FAILURE, FETCHING_IMAGES } from './constants';
const URL='https://api.unsplash.com/photos/?client_id=ab3411e4ac868c2646c0ed488dfd919ef612b04c264f3374c97fff98ed253dc9';

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
export function fetchImages(page) {

    return (dispatch,page) => {
        dispatch(getImages())

        return(fetch(URL+`&page=${page?page:1}`))
        .then(res => res.json())
        .then(json => {

            return(dispatch(getImagesSuccess({images:json,page:page})))
        })
        .catch(err => dispatch(getImagesFailure(err)))
    }
}