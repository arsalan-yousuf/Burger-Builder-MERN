import React, { Component } from 'react';
import {connect} from 'react-redux';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import {Route, Switch, withRouter} from 'react-router-dom';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import * as actionCreater from './store/actions/actions';


class App extends Component {
  componentDidMount(){
    this.props.appLoad();
    console.log("Reloaded");
  }
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/orders" component={Orders}/>
            <Route path="/checkout" component={Checkout}/>
            <Route path="/auth" component={Auth} />
            <Route path="/signout" component={Logout}/>
            <Route path="/" exact component={BurgerBuilder}/>
          </Switch>
          {/* <BurgerBuilder></BurgerBuilder>
          <Checkout/> */}
        </Layout>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return{
    appLoad: () => dispatch(actionCreater.appLoad())
  }
}

export default withRouter(connect(null, mapDispatchToProps)(App));
