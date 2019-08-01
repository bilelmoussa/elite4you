import { SET_CURRENT_USER, CARD_ITEMS, NOTIFICATION_ERROR, NOTIFICATION_SUCCESS, NOTIFICATION_WARNING, NOTIFICATION_INFO, GEO_INFO, LOADING, LOG_ERRORS, PRODUCTS, SIZE, COLOR} from './types';
import setAuthToken from '../setAuthToken';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { empty } from '../is-empty';


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

export const ResetLogErr = () => (dispatch) =>{
    dispatch({
        type: LOG_ERRORS,
        payload: {},
    })
}

export const AddOrRemoveLoading = (loading, dispatch)  => {
	dispatch({
		type: LOADING,
		payload: loading
	})
}

export const LogInUser = (user, history) => dispatch => {
    AddOrRemoveLoading(true, dispatch);
    axios.post('/api/user/login', user)
    .then(res=>{
        const  { token } = res.data;
        localStorage.setItem('jwtToken', token);
		setAuthToken(token);
        const decoded = jwt_decode(token);
        dispatch(setCurrentUser(decoded));
        dispatch({
            type: NOTIFICATION_SUCCESS,
            payload: {message: "Loged in With Success !"}
        })
        history.push('/Admin/dashboard');
        AddOrRemoveLoading(false, dispatch)
    })
    .catch(err=>{
        dispatch({
            type: LOG_ERRORS,
            payload: err.response.data.msg
        });
       console.log(err)
        AddOrRemoveLoading(false, dispatch)
    })
}

export const logoutUser = (history) => dispatch => {
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
    dispatch(setCurrentUser({}));
    dispatch({
        type: NOTIFICATION_SUCCESS,
        payload: {message: "Loged out With Success !"}
    })
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

export const ChangeProducts = (Products) => (dispatch) =>{
    localStorage.removeItem('CardItems');
    let StoreItems = JSON.stringify(Products);
    localStorage.setItem('CardItems', StoreItems);
    dispatch({
        type: CARD_ITEMS,
        payload: Products
    })    
}

export const getGeoInfo = () => (dispatch) => {
    axios.get('https://ipapi.co/json/').then((response) => {
        let data = response.data;
        
        dispatch({
            type: GEO_INFO,
            payload: data,
        })
        
    }).catch((error) => {
        console.log(error);
        let message= "Can't Get 'https://ipapi.co/json/' Error 404 !"
        dispatch({
            type: NOTIFICATION_ERROR,
            payload: {message: message}
        })
    });
};

export const ChangeClientCountry = (val) => (dispatch) =>{
    let data ={
        country: val
    }
    
    dispatch({
        type:GEO_INFO,
        payload: data
    })
}

export const Add_Products = (files, data) => dispatch =>{
    AddOrRemoveLoading(true, dispatch);
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    };

    let formdata = new FormData();

    files.forEach((file)=>{
            formdata.append("MyImage", file);
    });
    
    for ( var key in data ) {
        if(key === "ProductSize" || key === "ProductColors"){
            formdata.append(key, JSON.stringify(data[key]));
        }
       else{
            formdata.append(key, data[key]);
        }
    }

    axios.post("/api/product/AddProduct", formdata, config)
    .then((res)=>{
        console.log(res);
        AddOrRemoveLoading(false, dispatch)
        dispatch({
            type: NOTIFICATION_SUCCESS,
            payload: {message: "Product Added With Success !"}
        })
    })
    .catch((err)=>{
        console.log(err);
        AddOrRemoveLoading(false, dispatch);
        dispatch({
            type: NOTIFICATION_ERROR,
            payload: {message: "Server Error !"}
        })
    })
}

export const GetProducts = (query) => dispatch =>{
    AddOrRemoveLoading(true, dispatch);
    axios.get(`/api/product/getProduct`, {params: query})
    .then(res=>{
        AddOrRemoveLoading(false, dispatch);
        //console.log(res);
        dispatch({ 
            type: PRODUCTS,
            payload: res.data.data
        })
    })
    .catch(err=>{
        console.log(err)
        AddOrRemoveLoading(false, dispatch);
    })
}

export const GetSize = (query) => dispatch =>{
    AddOrRemoveLoading(true, dispatch);
    axios.get(`/api/product/sizes`, {params: query})
    .then(res=>{
        AddOrRemoveLoading(false, dispatch);
        dispatch({ 
            type: SIZE,
            payload: res.data.size
        })
        console.log(res);
    })
    .catch(err=>{
        console.log(err);
        AddOrRemoveLoading(false, dispatch);
    })
}

export const GetColor = (query) => dispatch =>{
    AddOrRemoveLoading(true, dispatch);
    axios.get(`/api/product/colors`, {params: query})
    .then(res=>{
        AddOrRemoveLoading(false, dispatch);
        dispatch({ 
            type: COLOR,
            payload: res.data.colors
        })
        //console.log(res);
    })
    .catch(err=>{
        console.log(err);
        AddOrRemoveLoading(false, dispatch);
    })
}

export const ResetPageProducts = () => dispatch =>{
    dispatch({ 
        type: PRODUCTS,
        payload: []
    });
    dispatch({ 
        type: SIZE,
        payload: []
    });
    dispatch({ 
        type: COLOR,
        payload: []
    });
}

