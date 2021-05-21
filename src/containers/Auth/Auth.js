import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom';
import Input from '../../components/UI/Input/Input';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actionCreater from '../../store/actions/actions';
import classes from './Auth.css';

class Auth extends Component{
    state={
        orderForm:{
            email:{
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
                validation:{
                    required: true,
                    minLength: 7
                },
                valid: false,
                touched: false
            },
            password:{
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation:{
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        formIsValid: false,
        isSignup: true
    }


    signupHandler = (event) => {
        event.preventDefault();
        console.log(this.state);
        this.props.authStart();
        this.props.auth({
            email: this.state.orderForm.email.value,
            password: this.state.orderForm.password.value,
            isSignup: this.state.isSignup});
        // this.setState({loading: true});
        // const formData = {};
        // for(let key in this.state.orderForm){
        //     formData[key]=this.state.orderForm[key].value
        // }
        // const orderData = {
        //     ingredients: this.props.ingredients,
        //     price: this.props.totalPrice,
        //     customer: {
        //         name: formData.name,
        //         email: formData.email,
        //         address: {
        //             street: formData.street,
        //             postalCode: formData.postalCode
        //         }
        //     },
        //     deliveryMethod: formData.deliveryMethod
        // };
        // this.props.purchaseBurger(orderData, this.props);
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

    loginHandler = () => {
        this.props.authStart();
        this.props.auth({
            email: this.state.orderForm.email.value,
            password: this.state.orderForm.password.value,
            isSignup: !this.state.isSignup});
    }

    redirectHandler = () => {
        let nextUrl = null
        if(this.props.isAuth)
        {
            nextUrl=<Redirect to="/"/>;
            if(this.props.building){
                nextUrl=<Redirect to="/checkout"/>;
            }
        }
        return nextUrl;
    }

    render(){
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
            <form onSubmit={this.signupHandler}>
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
                <button type="submit" className={buttonClasses.join(' ')} disabled={!this.state.formIsValid}>Signup</button>
            </form>
        )

        if(this.props.authLoading){
            form = <Spinner/>
        }
        
        let errorMsg = null;

        if(this.props.authError){
            errorMsg = <p style={{color: "red"}}>{this.props.authError.message}</p>
        }
        

        return(
            <div className={classes.Auth}>
                <h4>Login</h4>
                {errorMsg}
                {form}
                <button className={buttonClasses.join(' ')} disabled={!this.state.formIsValid} onClick={this.loginHandler}>Signin</button>
                {this.redirectHandler()}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return{
        authLoading: state.authLoading,
        authError: state.authError,
        isAuth: state.authToken != null,
        building: state.building
    }
    
}
const mapDispatchToProps = dispatch => {
    return{
        auth: (authData) => dispatch(actionCreater.auth(authData)),
        authStart: () => dispatch(actionCreater.authStart())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);