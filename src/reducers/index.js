import { combineReducers } from 'redux';
import userReducer  from './userReducer';
import cartReducer from './cartReducer'
import NotificationReducer from './NotificationReducer';
import GeoInfoReducer from './GeoInfoReducer'
import LoadingReducer from './LoadingReducer';
import ErrorsReducer from './ErrorsReducer';
import ProductsReducer from './ProductsReducer';

export default combineReducers({
    user: userReducer,
    cart: cartReducer,
    Notification: NotificationReducer,
    GeoInfo: GeoInfoReducer,
    Loading: LoadingReducer,
    Errors: ErrorsReducer,
    ProductsInfo: ProductsReducer
})