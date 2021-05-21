// import { element } from 'prop-types';
import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const Burger = (props) => {
    const ingredientTypes = Object.keys(props.ingredients)
    const ingredientsQtys = Object.values(props.ingredients);      // we need to return BurgerIngredient elements according to each qty
    // console.log(ingredientTypes, ingredientsQtys);
    let dynamicIngredients = [];
    ingredientTypes.forEach((element, index ) => {
        let qty = ingredientsQtys[index];
        while(qty!==0)
        {
            dynamicIngredients.push(<BurgerIngredient key={element+qty} type={element}/>);
            qty--;
        }
    });
    if(dynamicIngredients.length === 0)
        dynamicIngredients = <p>Please start adding Ingredients</p>
    // console.log(dynamicIngredients);
    return(
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {/* <BurgerIngredient type="cheese" />
            <BurgerIngredient type="meat" /> */}
            {dynamicIngredients}
            <BurgerIngredient type="bread-bottom" />
            
        </div>
    )
}

export default Burger;