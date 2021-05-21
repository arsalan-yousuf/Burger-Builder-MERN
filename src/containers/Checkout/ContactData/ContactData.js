import React, { Component } from 'react';
import {connect} from 'react-redux';
import classes from './ContactData.css';
import axios from '../../../axios';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler';
import * as actionCreater from '../../../store/actions/actions';

class ContactData extends Component {
    state={
        orderForm:{
            name:{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation:{
                    required: true,
                    minLength: 2,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            email:{
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
                validation:{
                    required: true,
                    minLength: 2,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            street:{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Street'
                },
                value: '',
                validation:{
                    required: true,
                    minLength: 2,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            postalCode:{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation:{
                    required: true,
                    minLength: 2,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: 'fastest',
                validation:{
                    required: false,
                },
                valid: true
            }
        },
        // loading: false,
        formIsValid: false
    };

    orderHandler = (event) => {
        event.preventDefault();
        // this.setState({loading: true});
        const formData = {};
        for(let key in this.state.orderForm){
            formData[key]=this.state.orderForm[key].value
        }
        const orderData = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            customer: {
                name: formData.name,
                email: formData.email,
                address: {
                    street: formData.street,
                    postalCode: formData.postalCode
                }
            },
            deliveryMethod: formData.deliveryMethod
        };
        this.props.purchaseBurger(orderData, this.props);
        // axios.post('orders.json', orderData)
        // .then( response => {
        //     this.setState({loading: false});
        //     this.props.history.push('/');
        //     console.log(response);
        //     alert("Order Posted");
        // })
        // .catch( error => {
        //     this.setState({loading: false});
        //     console.log(error);
        // })
    }

    changedHandler = (event, inputId) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        updatedOrderForm[inputId].touched=true;
        updatedOrderForm[inputId].valid = this.checkValidity(event.target.value, updatedOrderForm[inputId].validation);
        updatedOrderForm[inputId].value = event.target.value;
        let formIsValid = true;
        for(let key in updatedOrderForm){
            if(!updatedOrderForm[key].valid){
                formIsValid=false;
                break;
            }
        }
        // console.log('Form: '+formIsValid);
        // console.log(updatedOrderForm[inputId]);
        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
    }

    checkValidity = (value, rules) => {
        if(rules.required){
            //if(value.length >= rules.minLength && value.length <= rules.maxLength)
            if(value.length >= rules.minLength){
                return true;
            }
            else{
                return false;
            }
        }
        return true;
    }

    render() {
        const formElementArray = [];
        for(let key in this.state.orderForm)
        {
            formElementArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }
        let buttonClasses=[classes.Button];
        if(this.state.formIsValid)
        {
            buttonClasses.push(classes.Success);
        }
        else{
            buttonClasses.push(classes.Disabled);
        }


        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementArray.map( formElement => (
                    <Input 
                    key={formElement.id} 
                    elementType={formElement.config.elementType} 
                    elementConfig={formElement.config.elementConfig} 
                    value={formElement.config.value}
                    changed={(event) => this.changedHandler(event, formElement.id)}
                    valid={formElement.config.valid}
                    touched={formElement.config.touched}/>
                ))}
                <button className={buttonClasses.join(' ')} disabled={!this.state.formIsValid}>ORDER</button>
            </form>
        )
        if(this.props.loadingOrder)
        {
            form=<Spinner/>
        }

        return(
            <div className={classes.ContactData}>
                <h4>Enter your contact details</h4>
                {form}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        ingredients: state.ingredients,
        totalPrice: state.totalPrice,
        loadingOrder: state.loadingOrder,
        token: state.authToken
    }
}

const mapDispatchToProps = dispatch => {
    return{
        purchaseBurger: (orderData, props) => dispatch(actionCreater.purchaseBurger(orderData, props))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));