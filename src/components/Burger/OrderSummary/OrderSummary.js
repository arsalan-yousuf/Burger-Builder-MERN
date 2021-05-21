import React from 'react';
import Aux from '../../../hoc/Auxiliary';
import classes from './OrderSummary.css';

const OrderSummary = (props) => {
    const ingredientList = [];
    for(let key in props.ingredients)
    {
        ingredientList.push(
            <li key={key}>{key.toUpperCase()}: {props.ingredients[key]}</li>
        );
    }
    return(
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientList}
            </ul>
            <p><strong>Total Price: ${props.priceTotal.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p>
            <button className={classes.Button + ' ' + classes.Danger} onClick={props.modelCloser}>Cancel</button>
            <button className={classes.Button + ' ' + classes.Success} onClick={props.continueOrder}>Continue</button>
        </Aux>
    );
};

export default OrderSummary;
