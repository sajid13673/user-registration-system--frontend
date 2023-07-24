// import {combineReducers} from "redux";
// import {userReducer} from "./userReducer";

// const reducers = combineReducers({
//     allUsers: userReducer
// });
// export default reducers;
import {combineReducers} from "redux";
import {userReducer} from "./userReducer";
import {tokenReducer} from "./tokenReducer";

const reducers = combineReducers({
    allUsers: userReducer,
    allToken: tokenReducer
});
export default reducers;