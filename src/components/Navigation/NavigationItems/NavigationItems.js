import React, { Component } from 'react';
import {connect} from 'react-redux';
import classes from './NavigationItems.css';
import {NavLink} from 'react-router-dom';

class NavigationItems extends Component{
    // state={
    //     token: null
    // }
    // componentDidMount(){
    //     let token = localStorage.getItem('token');
    //     this.setState({
    //         token: token
    //     })
    // }
    render(){
        return(
            <ul className={classes.NavigationItems}>
                <li className={classes.Item}><NavLink to="/">Burger Builder</NavLink></li>
                {this.props.isAuth? <li className={classes.Item}><NavLink to="/orders">Orders</NavLink></li> : null}
                {this.props.isAuth? <li className={classes.Item}><NavLink to="/signout">Signout</NavLink></li>:<li className={classes.Item}><NavLink to="/auth">Signin</NavLink></li>}
            </ul>
        );
    }
}

const mapStateToProps = state => {
    return{
        isAuth: state.authToken != null
    }
}

export default connect(mapStateToProps)(NavigationItems);