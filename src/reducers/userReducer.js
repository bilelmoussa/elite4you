import { SET_CURRENT_USER } from '../action/types';
import { empty } from '../is-empty';


const initialState = {
    IsLoggedIn: false,
    user: {}
}

export default function(state = initialState, action){
    switch(action.type){
        case SET_CURRENT_USER:
            return {
                ...state,
                IsLoggedIn: !empty(action.payload),
                user: action.payload
            } 
        default:
            return state;   
    }
}