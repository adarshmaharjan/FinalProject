import {DISPLAY_DETAILS} from './types';

export const displayDetails = data => dispatch => {
    console.log("details is being dispatched");
    dispatch({
        type: DISPLAY_DETAILS,
        payload: data,
    })
}
