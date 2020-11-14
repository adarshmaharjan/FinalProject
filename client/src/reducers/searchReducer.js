import { DISPLAY_STUFF } from "../actions/types.jsx";

const initialState = {
    data: {},
};

export default function (state = initialState, action) {
    switch (action.type) {
        case DISPLAY_STUFF:
            return {
                ...state,
                data: action.payload,
            };
        default:
            return state;
    }
}
