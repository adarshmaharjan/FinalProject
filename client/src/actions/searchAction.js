import {DISPLAY_STUFF} from './types';

/**
 * displayStuff.
 *
 * @param {} data
 */
export const displayStuff = data => dispatch => {
    console.log(data);
    localStorage.setItem('data',JSON.stringify(data));
    dispatch({
        type: DISPLAY_STUFF,
        payload: data,
    })
}
