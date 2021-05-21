import React, { Component } from 'react';
import {connect} from 'react-redux';
import Order from '../../components/Order/Order';
import axios from '../../axios';
import withErrorHandler from '../../hoc/withErrorHandler';
import * as actionCreater from '../../store/actions/actions';

class Orders extends Component{
    // state={
    //     orders: [],
    //     loading: true
    // }
    componentDidMount(){
        this.props.fetchOrders(this.props.authToken);
        // axios.get('/orders.json')
        //     .then( response => {
        //         let ordersArray = []
        //         for(let key in response.data)
        //         {
        //             ordersArray.push({
        //                 ...response.data[key],
        //                 id: key
        //             });
        //         }
        //         this.setState({orders: ordersArray, loading: false});
        //     })
        //     .catch( err => {
        //         this.setState({loading: false});
        //     })
    }
    componentDidUpdate(){
        // this.props.fetchOrders(this.props.authToken);   
    }
    render() {
        const orderList = this.props.orders.map( order => {
            return(<Order key={order.id} ingredients={order.ingredients} price={order.price}/>)
        })
        return(
            <div>
                {orderList}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return{
        orders: state.fetchedOrders,
        authToken: state.authToken
    }
}

const mapDispatchToProps = dispatch => {
    return{
        fetchOrders: (token) => dispatch(actionCreater.fetchOrders(token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));