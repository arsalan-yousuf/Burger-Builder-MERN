import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actionCreater from '../../../store/actions/actions';

class Logout extends Component{
    componentDidMount(){
        this.props.signout();
    }
    render(){
        return <Redirect to="/"/>
    }
}

const mapDispatchToProps = dispatch => {
    return{
        signout: () => dispatch(actionCreater.signout())
    }
}

export default connect(null, mapDispatchToProps)(Logout);