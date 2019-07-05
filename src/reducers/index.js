import { combineReducers } from 'redux';
import userReducer  from './userReducer';
import cartReducer from './cartReducer'
import NotificationReducer from './NotificationReducer';
import GeoInfoReducer from './GeoInfoReducer'

export default combineReducers({
    user: userReducer,
    cart: cartReducer,
    Notification: NotificationReducer,
    GeoInfo: GeoInfoReducer
})