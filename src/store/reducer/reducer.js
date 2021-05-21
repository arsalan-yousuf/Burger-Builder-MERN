import * as actionTypes from '../actions/actions';

const initialState = {
    ingredients: {},
    totalPrice: 0,
    error: false,
    burgerLoaded: false,
    orders:[],
    loadingOrder: false,
    fetchedOrders:[],
    authLoading: false,
    authError: null,
    authUserid: null,
    authToken: null,
    building: false
}

const INGREDIENT_PRICES = {
    salad: 0.3,
    bacon: 0.5,
    cheese: 0.7,
    meat: 1.5
};

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.APP_LOAD:{
            return{
                ...state,
                authToken: localStorage.getItem('token'),
                authUserid: localStorage.getItem('userId')
            }
        }
        
        case actionTypes.ADD_INGREDIENT:
            return{
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientType]: state.ingredients[action.ingredientType] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientType],
                building: true
            }

        case actionTypes.REMOVE_INGREDIENT:
            return{
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientType]: state.ingredients[action.ingredientType] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientType],
                building: true
            }

        case actionTypes.SET_INGREDIENTS:{
            if(action.ingredients !== null){
                return{
                    ...state,
                    ingredients: {
                        salad: action.ingredients.salad,
                        bacon: action.ingredients.bacon,
                        cheese: action.ingredients.cheese,
                        meat: action.ingredients.meat
                    },
                    totalPrice: 0,
                    burgerLoaded: true
                }
            }
            else{
                console.log('error state');
                return{
                    ...state,
                    error: true
                }
            }
        }
        case actionTypes.PURCHASE_BURGER_START:{
            return{
                ...state,
                loadingOrder: true
            }
        }
        case actionTypes.PURCHASE_BURGER_SUCCESS:{
            console.log(state.orders, action.orderData);
            return{
                ...state,
                orders: state.orders.concat(action.orderData),
                loadingOrder: false
            }
        }
        case actionTypes.PURCHASE_BURGER_FAIL:{
            return{
                ...state,
                loadingOrder: false
            }
        }
        case actionTypes.ORDERS_FETCHED:{
            return{
                ...state,
                fetchedOrders: [...action.ordersArray]
            }
        }
        case actionTypes.AUTH_START:{
            return{
                ...state,
                authLoading: true
            }
        }
        case actionTypes.AUTH_FAIL:{
            return{
                ...state,
                authLoading: false,
                authError: action.error
            }
        }
        case actionTypes.AUTH:{
            return{
                ...state,
                authLoading: false,
                authUserid: action.authData.localId,
                authToken: action.authData.idToken,
                authError: null
            }
        }
        case actionTypes.AUTH_LOGOUT:{
            return{
                ...state,
                authUserid: null,
                authToken: null,
            }
        }
    }
    return state;
}

export default reducer;