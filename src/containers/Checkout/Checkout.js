import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route , Redirect } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';
//import * as actions from '../../store/actions/index';
//import withErrorHadler from '../../hoc/withErrorHandler/withErrorHandler';
//import axios from '../../axios-orders';

class Checkout extends Component{

    checkoutCancelledHandler(){
        console.log(this.props);
        this.props.history.goBack();
    }

    checkoutContinuedHandler(){
        this.props.history.push('/checkout/contact-data');
    }

    render(){

        let summary = <Redirect to="/"/>

        let redirectAfterPurchase = this.props.purchased ? <Redirect to="/"/> : null;

        if(this.props.ings){
            summary = (<div>
                {redirectAfterPurchase}
                <CheckoutSummary
                    ingredients={this.props.ings}
                    checkoutCancelled={()=>this.checkoutCancelledHandler()}
                    checkoutContinued={()=>this.checkoutContinuedHandler()}
                />
                <Route 
                    path={this.props.match.path + '/contact-data'}
                    component={ContactData}
                />
            </div>);
        }

        return summary;
    }
}

const mapStateToProps=state=>{
    return{
        ings:state.burgerBuilder.ingredients,
        purchased:state.order.purchased
    };
};

export default connect(mapStateToProps)(Checkout);