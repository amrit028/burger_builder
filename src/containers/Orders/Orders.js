import React, {Component} from 'react';
import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import classes from './Orders.module.css';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import { connect } from 'react-redux';

class Orders extends Component{
    
    componentDidMount(){
        this.props.onFetchOrders(this.props.token,this.props.userId);
    }

    render(){

        let totalOrder=<Spinner/>;

        if(!this.props.loading){
            totalOrder = (
                <div className={classes.Orders}>
                    {this.props.ord.map(order=>{
                        return(
                            <Order
                                key={order.id}
                                ingredients={order.ingredients}
                                price={+order.price}
                            />
                        );
                    })}
                </div>
            );
        }

        return totalOrder;
    }
}

const mapStateToProps = state =>{
    return{
        ord:state.order.orders,
        loading:state.order.loading,
        token:state.auth.token,
        userId:state.auth.userId
    };
};

const mapDispatchToProps = dispatch =>{
    return{
        onFetchOrders: (token,userId) => dispatch(actions.fetchOrder(token,userId))
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders,axios));