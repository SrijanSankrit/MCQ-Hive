import { SET_ALERT, REMOVE_ALERT } from "../actions/Types";

const initialState = [];

export default function(state=initialState,action){
    const {type, payload} = action;

    switch(type){
        case SET_ALERT:
            return [...state, payload]
        case REMOVE_ALERT:
            return state.filter(alert => alert.id !== payload) // For every alert, check if the alert has been removed and if it has, remove it from the state.
        
        default:
            return state
    }
}