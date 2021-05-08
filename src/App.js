import React , { Component } from 'react';
import Layout from './components/Layout/Layout';
import Burgerbuilder from './containers/Burgerbuilder/Burgerbuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import { Redirect, Route, Switch} from 'react-router-dom';
import { connect } from 'react-redux';
import * as action from './store/actions/index';

class App extends Component{

  componentDidMount() {
    this.props.onTryAutoSignUp();
  }

  render()
  {
    let routes=(
      <Switch>
          <Route path="/auth" component={Auth}/>
          <Route path="/" exact component={Burgerbuilder}/>
          <Redirect to="/"/>
      </Switch>
      );

    if(this.props.isAuth)
    routes=(
    <Switch>
        <Route path="/auth" component={Auth}/>
        <Route path="/logout" component={Logout}/>
        <Route path="/orders" component={Orders}/>
        <Route path="/checkout" component={Checkout}/>
        <Route path="/" exact component={Burgerbuilder}/>
    </Switch>
    );

    console.log("app",this.props.isAuth);
    return (
      <Layout isAuthenticated={this.props.isAuth}>
        {routes}
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return{
    isAuth : state.auth.token!=null
  }
}

const mapDispatchToProps = dispatch => {
  return{
    onTryAutoSignUp : () => dispatch(action.checkAuthState())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
