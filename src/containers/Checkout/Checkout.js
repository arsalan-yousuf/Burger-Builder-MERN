import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';
import Burger from '../../components/Burger/Burger';
import classes from './Checkout.css';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {  

    continueCheckoutHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    cancelCheckoutHandler = () => {
        this.props.history.goBack();
    }

    render(){
        return(
            <div className={classes.Checkout}>
                <h1>We hope it tastes well!</h1>
                <div>
                    <Burger ingredients={this.props.ingredients}/>
                </div>
                <button className={classes.Button + ' ' + classes.Danger} onClick={this.cancelCheckoutHandler}>Cancel</button>
                <button className={classes.Button + ' ' + classes.Success} onClick={this.continueCheckoutHandler}>Continue</button>
                <Route path={this.props.match.path + '/contact-data'} component={ContactData}/>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        ingredients: state.ingredients
    }
}

export default connect(mapStateToProps)(Checkout);