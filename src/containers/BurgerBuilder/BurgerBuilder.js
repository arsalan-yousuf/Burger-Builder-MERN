import React, {Component} from 'react';
import {connect} from 'react-redux';
import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler';
import * as actionCreater from '../../store/actions/actions';

// const INGREDIENT_PRICES = {
//     salad: 0.3,
//     bacon: 0.5,
//     cheese: 0.7,
//     meat: 1.5
// };

class BurgerBuilder extends Component {

    state = {
        // ingredients: {
        //     salad: 0,
        //     bacon: 0,
        //     cheese: 0,
        //     meat: 0
        // },
        // totalPrice: 3,
        purchasable: false,
        ordering: false,
        loading: false,
        // burgerLoaded: true,
        // error: false
    };

    componentDidMount () {
        this.props.initIngredients();
        // axios.get('https://react-burger-builder-f25d8-default-rtdb.firebaseio.com/ingredients.json')
        //     .then( response => {
        //         this.setState({ingredients: response.data, burgerLoaded: true});
        //     })
        //     .catch(err => {
        //         this.setState({error: true});
        //     })
    }
    
    updatePurchasable = () => {
        let ingredientCount = 0;
        for( let key in this.props.ingredients)
        {
            ingredientCount += this.props.ingredients[key];
        }
        // console.log(ingredientCount);
        if(ingredientCount > 0)
            return true;// this.setState({purchasable: true});
        else
            return false;// this.setState({purchasable: false});

        // console.log(this.state.purchasable);
    };

    // addIngredientHandler = (type) => {
    //     const copyState = {...this.state};
    //     copyState.ingredients[type] += 1;   
    //     copyState.totalPrice += INGREDIENT_PRICES[type];
    //     this.setState({
    //         ingredients: copyState.ingredients,
    //         totalPrice: copyState.totalPrice
    //     })
    //     // console.log(copyState);
    //     this.updatePurchasable();
    // };

    orderButtonHandler = () => {
        if(this.props.isAuth){
            this.setState({ordering: true});
        }
        else{
            this.props.history.push('/auth');
        }
        // console.log(this.state.ordering);
    };

    // removeIngredientHandler = (type) => {
    //     const copyState = {...this.state};
    //     if(copyState.ingredients[type] > 0)
    //     {
    //         copyState.ingredients[type] -= 1;
    //         copyState.totalPrice -= INGREDIENT_PRICES[type];
    //         this.setState({
    //             ingredients: copyState.ingredients,
    //             totalPrice: copyState.totalPrice
    //         })
    //         this.updatePurchasable();
    //     }
    //     else return;
    //     // console.log(copyState);
    // };

    modelCloserHandler = () => {
        this.setState({ordering: true});
        // console.log("Div clicked");
    };

    continueOrderHandler = () => {
        
        // let queryParams = [];
        // for(let i in this.props.ingredients){
        //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.props.ingredients[i]));
        // }
        // queryParams.push('price='+this.props.totalPrice);
        // queryParams = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            // search:'?' + queryParams
        });
    };
    
    render() {
        const disabledHandler = {
            ...this.props.ingredients
        };
        for(let key in disabledHandler)
        {
            disabledHandler[key] = (disabledHandler[key] <= 0);
        }
        // console.log(disabledHandler);
        let orderSummary = (<OrderSummary ingredients = {this.props.ingredients}
            modelCloser={this.modelCloserHandler}
            continueOrder={this.continueOrderHandler}
            priceTotal = {this.props.totalPrice}/>);
        if(this.state.loading)
        {
            orderSummary = <Spinner/>;
        }

        let burger = [<Modal show={this.state.ordering} modelCloser={this.modelCloserHandler}>
            {orderSummary}
        </Modal>,
        <Burger 
            ingredients={this.props.ingredients} 
            totalPrice = {this.props.totalPrice}/>,
        <BuildControls
            ordering = {this.orderButtonHandler}
            purchasable = {this.updatePurchasable()}
            totalPrice = {this.props.totalPrice}
            disableStatus = {disabledHandler}
            addHandler = {this.props.addIngredient}
            removeHandler = {this.props.removeIngredient}
            isAuth = {this.props.isAuth}/>
        ];

        if(!this.props.burgerLoaded)
        {
            burger =  this.props.error? <h3 style={{textAlign:'center'}}>Ingredients can't be loaded</h3> : <Spinner/>;
        }

        return(
            <Aux>
                {burger}
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return{
        ingredients: state.ingredients,
        totalPrice: state.totalPrice,
        error: state.error,
        burgerLoaded: state.burgerLoaded,
        isAuth: state.authToken != null
        
    }
}

const mapDispatchToProps = dispatch => {
    return{
        addIngredient: (ingredientType) => dispatch(actionCreater.addIngredient({ingredientType: ingredientType})),
        removeIngredient: (ingredientType) => dispatch(actionCreater.removeIngredient({ingredientType: ingredientType})),
        initIngredients: () => dispatch(actionCreater.initIngredients())
    }
}

export default connect(mapStateToProps,  mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));