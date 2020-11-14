import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; //localstorage as default storage

import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import searchReducer from "./searchReducer";

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["data"],
};

const rootReducer = combineReducers({

    auth:authReducer,
    data: searchReducer,
    errors: errorReducer
})


export default persistReducer(persistConfig,rootReducer);
