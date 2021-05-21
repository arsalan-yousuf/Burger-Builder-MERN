import axios from '../../axios';
import authAxios from 'axios';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';
export const SET_INGREDIENTS = 'SET_INGREDIENTS';
export const PURCHASE_BURGER_SUCCESS = 'PURCHASE_BURGER_SUCCESS';
export const PURCHASE_BURGER_FAIL = 'PURCHASE_BURGER_FAIL';
export const PURCHASE_BURGER_START = 'PURCHASE_BURGER_START';
export const ORDERS_FETCHED = 'FETCH_ORDERS';
export const AUTH_START = 'AUTH_START';
export const AUTH_FAIL = 'AUTH_FAIL';
export const AUTH = 'AUTH';
export const AUTH_LOGOUT = 'AUTH_LOGOUT';
export const APP_LOAD = 'APP_LOAD';

export const appLoad  = () => {
    if(localStorage.getItem('token')){
        return{
            type: APP_LOAD
        }
    }
    else{
        console.log("Not loaded");
    }   
}

export const addIngredient = payload => {
    return{
        type: ADD_INGREDIENT,
        ingredientType: payload.ingredientType
    }
}

export const removeIngredient = payload => {
    return{
        type: REMOVE_INGREDIENT,
        ingredientType: payload.ingredientType
    }
}

export const setIngredients = ingredients => {
    // console.log('setIngredients');
    return{
        type: SET_INGREDIENTS,
        ingredients: ingredients
    }
}

export const initIngredients = () => {
    // console.log('initIngredients');
    return dispatch => {
        axios.get('https://react-burger-builder-f25d8-default-rtdb.firebaseio.com/ingredients.json')
            .then( response => {
                // console.log(response.data);
                dispatch(setIngredients(response.data));
            })
            .catch(err => {
                dispatch(setIngredients(null));
            })
    }
}

export const purchaseBurgerSuccess = (orderData, id) => {
    alert('Order Successfuly Posted');
    // alert("Now it should redirect to // but we will do it later, no mood right now");

    return {
        type: PURCHASE_BURGER_SUCCESS,
        id: id,
        orderData: orderData
    }
}

export const purchaseBurgerFail = error => {
    alert('Order Failed');
    // alert("Now it should redirect to // but we will do it later, no mood right now");

    return {
        type: PURCHASE_BURGER_FAIL,
        error: error
    }
}

export const purchaseBurgerStart = () => {
    return{
        type: PURCHASE_BURGER_START
    }
}

export const purchaseBurger = (orderData, props) => {
    return dispatch => {
        dispatch(purchaseBurgerStart())
        axios.post('orders.json?auth=' + props.token, orderData)
        .then( response => {
            dispatch(purchaseBurgerSuccess(orderData, response.data.name));
            props.history.push('/');
        })
        .catch( error => {
            dispatch(purchaseBurgerFail(error));
        })
    }
}

export const fetchOrders = (token) => {
    return dispatch => {
        axios.get('/orders.json?auth=' + token)
            .then( response => {
                let ordersArray = []
                for(let key in response.data)
                {
                    ordersArray.push({
                        ...response.data[key],
                        id: key
                    });
                }
                dispatch({
                    type: ORDERS_FETCHED,
                    ordersArray: ordersArray
                });
            })
            .catch( err => {
                console.log(err);
            })
    }
}

export const authStart = () => {
    return{
        type: AUTH_START,
    }
}

export const authFail = (error) => {
    return {
        type: AUTH_FAIL,
        error: error
    };
};

export const auth = (authData) => {
    const postData = {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
    }
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDzfDZMQ5t4GtfeEcKlWZXnGt0TQgls0Bo';
    if(!authData.isSignup){
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDzfDZMQ5t4GtfeEcKlWZXnGt0TQgls0Bo'
    }
    console.log(postData);
    return (dispatch) => {
        authAxios.post(url, postData)
            .then(response => {
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('userId', response.data.localId);
                localStorage.setItem('expiryDate', new Date(new Date().getTime() + response.data.expiresIn*1000));
                dispatch({
                    type: AUTH,
                    authData: response.data
                });
                dispatch(authTimeout(response.data.expiresIn));
            })
            .catch( err => {
                console.log(err.response.data.error);
                dispatch(authFail(err.response.data.error));
            })
        
    }
} 

export const authTimeout = (expiryTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(signout());
            console.log('Logged Out');
        }, expiryTime*1000)
    }
}

export const signout = () => {
    localStorage.clear('token');
    localStorage.clear('userId');
    localStorage.clear('expiryDate');
    return{
        type: AUTH_LOGOUT
    }
}
