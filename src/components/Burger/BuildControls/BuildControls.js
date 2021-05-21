import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label: 'Salad', type:'salad'},
    {label: 'Bacon', type:'bacon'},
    {label: 'Cheese', type:'cheese'},
    {label: 'Meat', type:'meat'},
];

const BuildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Total Price: <strong>${props.totalPrice.toFixed(2)}</strong></p>
        {controls.map((ctrl) => (
            <BuildControl disable = {props.disableStatus[ctrl.type]} addIngredientHandler = {() => props.addHandler(ctrl.type)} removeIngredientHandler = {() => props.removeHandler(ctrl.type)} key={ctrl.label} label={ctrl.label}/>
        ))}
        <button onClick={props.ordering} disabled={!props.purchasable} className={classes.OrderButton}>{props.isAuth? 'ORDER NOW':'SIGN IN TO ORDER'}</button>
    </div>
);

export default BuildControls;