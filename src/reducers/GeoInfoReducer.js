import {GEO_INFO} from '../action/types';

const initialState = {
    data: {}
}

export default function(state = initialState, action){
    switch(action.type){
        case GEO_INFO:
            return{
                ...state,
                data: action.payload
            }
        default:
            return state;
    }
}