import { SET_CURRENT_USER, CARD_ITEMS, NOTIFICATION_ERROR, NOTIFICATION_SUCCESS, NOTIFICATION_WARNING, NOTIFICATION_INFO } from './types';
import setAuthToken from '../setAuthToken';



export const CloseNotification = (type) => dispatch =>{

	if(type === "error"){
		dispatch({
			type: NOTIFICATION_ERROR,
			payload: {}
		})
	}else if(type === "success"){
		dispatch({
			type: NOTIFICATION_SUCCESS,
			payload: {}
		})
	}else if(type === "warning"){
		dispatch({
			type: NOTIFICATION_WARNING,
			payload: {}
		})
	}else if(type === "info"){
		dispatch({
			type: NOTIFICATION_INFO,
			payload: {}
		})
	}

}

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

const getLocalCartItem = () =>{
    let CardItems = localStorage.getItem('CardItems');
    return JSON.parse(CardItems)
}

export const AddToCart = CardItem => dispatch => {
    const localCardItems = getLocalCartItem() || [];
    const sameItemName = localCardItems.map((item)=>{return item.ProductName}).indexOf(CardItem.ProductName);
  
    const SaveItem = () =>{
        let message = "A New Product Added To Your Cart !"
        localCardItems.push(CardItem);
        let StoreItems = JSON.stringify(localCardItems);
        localStorage.setItem('CardItems', StoreItems);
        localCardItems.forEach((item, i)=>{
            item.ClientId = i;
        })
        dispatch({
            type: CARD_ITEMS,
            payload: localCardItems
         })
         dispatch({
            type: NOTIFICATION_SUCCESS,
            payload: {message: message}
        })
        setTimeout(() => {
            CloseNotification("success")
        }, 5000);
    }

    const SendError = () =>{
        let message= "This Product Already Added To Your Cart !"
        dispatch({
            type: NOTIFICATION_ERROR,
            payload: {message: message}
        })
        setTimeout(() => {
            CloseNotification("error")
        }, 5000); 
    }

    if(sameItemName === -1){
        SaveItem();
    }else{
        let sameItemsName = [];
        localCardItems.forEach((item)=>{
            if(item.ProductName === CardItem.ProductName){
                sameItemsName.push(item)
            }
        })
        const sameItemColor = sameItemsName.map((item)=>{return item.ProductColor}).indexOf(CardItem.ProductColor);
        if(sameItemColor === -1){
            SaveItem();
        }else{
            let sameItemsColor = [];
            sameItemsName.forEach((item)=>{
                if(item.ProductColor === CardItem.ProductColor){
                    sameItemsColor.push(item)
                }
            })
            const sameItemSize = sameItemsColor.map((item)=>{return item.ProductSize}).indexOf(CardItem.ProductSize);
            if(sameItemSize === -1){
                SaveItem();
            }else{
                SendError();
            }

        }
    }
}

export const DeleteCartProduct = (Products) => (dispatch) =>{
    localStorage.removeItem('CardItems');
    let StoreItems = JSON.stringify(Products);
    localStorage.setItem('CardItems', StoreItems);
    dispatch({
        type: CARD_ITEMS,
        payload: Products
    })    
}

