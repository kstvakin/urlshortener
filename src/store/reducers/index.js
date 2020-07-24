import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import Store from "./Store";

export default combineReducers({
  store: Store,
  routing: routerReducer,
});
