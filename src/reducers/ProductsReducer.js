import  {PRODUCTS} from '../action/types';

const initialState = {
    Products: [],
    Size: [],
    Colors: [],
}

export default function(state = initialState, action){
    switch(action.type){
        case PRODUCTS:
            return { ...state, Products: action.payload}
        default:
            return state;
    }
}