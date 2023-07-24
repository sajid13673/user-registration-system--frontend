import {ActionTypes} from "../constants/action-types";
const initialState = {
    user: [] //make this an object
}
export const userReducer = (state = initialState, action) => {
    if(action.type == ActionTypes.SET_USER){
        return {...state, user: action.payload};
    }
    else{
        return state;
    }
}