import { SET_CURRENT_USER } from './types';
import setAuthToken from '../setAuthToken';

export const LogInUser = (user, history) => dispatch => {
    let user_obj =  JSON.stringify(user)
    localStorage.setItem('jwtToken', user_obj);
    setAuthToken(user);
    dispatch(setCurrentUser(user));
    history.push('/Admin/dashboard');
}

export const logoutUser = (history) => dispatch => {
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
    dispatch(setCurrentUser({}));
	if(history){
		history.push('/Admin/login')
	}
}

export const setCurrentUser = user => {
    return {
        type: SET_CURRENT_USER,
        payload: user
    }
}