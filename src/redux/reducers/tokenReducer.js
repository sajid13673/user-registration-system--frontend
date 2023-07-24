import {ActionTypes} from "../constants/action-types";
const initialState = {
    token: [] //make this an object
}
export const tokenReducer = (state = initialState, action) => {
    if(action.type == ActionTypes.SET_TOKEN){
        return {...state, token: action.payload};
    }
    if(action.type == ActionTypes.REMOVE_TOKEN){
        return {};
    }
    else{
        return state;
    }
}