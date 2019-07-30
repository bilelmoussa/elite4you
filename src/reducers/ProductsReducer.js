import  {PRODUCTS, SIZE, COLOR} from '../action/types';

const initialState = {
    Products: [],
    Size: [],
    Colors: [],
}

export default function(state = initialState, action){
    switch(action.type){
        case PRODUCTS:
            return { ...state, Products: action.payload}
        case SIZE:
            return { ...state, Size: action.payload} 
        case COLOR:
            return { ...state, Colors: action.payload} 
        default:
            return state;
    }
}