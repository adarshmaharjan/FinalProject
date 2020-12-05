import {DISPLAY_DETAILS} from '../actions/types.jsx';

const initialState = {
    details:{}
}

export default function (state = initialState, action){
    switch(action.type){
        case DISPLAY_DETAILS:
            return {
                ...state,
                details: action.payload,
            }
        default:
            return state;
    }
}
