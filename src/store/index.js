import {createStore, combineReducers, applyMiddleware} from "redux";
import {logger} from "redux-logger/src";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import notices from "../reducers/noticeReducer"

//合并reducer
const rootReducer = combineReducers({
    notices
})
//构建store
const store = createStore(rootReducer, {}, composeWithDevTools(applyMiddleware(thunk, logger)))
export default store