import {CARD_ITEMS} from '../action/types';

const initialState = {
    CartItems: []
}

export default function(state = initialState, action){
    switch(action.type){
        case CARD_ITEMS:
            return{
                ...state,
                CartItems: action.payload
            }
        default:
            return state;
    }
}