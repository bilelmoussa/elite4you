import { SET_CURRENT_USER } from '../action/types';
import { isEmpty } from '../is-empty';


const initialState = {
    IsLoggedIn: false,
    user: {}
}

export default function(state = initialState, action){
    switch(action.type){
        case SET_CURRENT_USER:
            return {
                ...state,
                IsLoggedIn: !isEmpty(action.payload),
                user: action.payload
            } 
        default:
            return state;   
    }
}