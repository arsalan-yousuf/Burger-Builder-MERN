import React from 'react';
import Orders from '../../containers/Orders/Orders';
import classes from './Order.css';

const Order = (props) => {
    let ingredients=[];
    for(let ing in props.ingredients){
        ingredients.push(<span>{ing}: {props.ingredients[ing]}</span>);}
    return(
        <div className={classes.Order}>
            <p>Ingredients: {ingredients}</p>
            <p>Price: <strong>USD {props.price.toFixed(2)}</strong></p>
        </div>
    );
}

export default Order;