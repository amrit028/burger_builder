import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import Buildcontrols from '../../components/Burger/Buildcontrols/Buildcontrols';
import Aux from '../../hoc/auxiliary/auxiliary';
import Ordersummary from '../../components/Burger/Ordersummary/Ordersummary';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

class Burgerbuilder extends Component {

    state={
        purchasing:false
    }

    componentDidMount(){
        if(!this.props.building)
        this.props.onIngredientInit();
    };

    purchaseHandler=()=>{
        if(this.props.isAuthenticated)
        this.setState({purchasing:true});
        else
        this.props.history.push("/auth");
    }

    purchaseCancelHandler=()=>{
        this.setState({purchasing:false});
    }

    purchaseContinueHandler=()=>{
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    }

    countTotalIngs=(ingredients)=>{

        let sum=0;

        for(let key in ingredients){
            sum+=ingredients[key];
        }

        console.log(sum," sum");

        return sum;
    };

    render()
    {
        let orderSummary=null;

        let burger= this.props.error ? <p>Ingredients can't be loaded!!</p> : <Spinner/>;
        
        if(this.props.ings){
            console.log("ings",this.props.ings);

            burger=(<Aux>
                <Burger ingredients={this.props.ings}/>
                <Buildcontrols 
                    addClick={(type)=>this.props.onIngredientAdded(type)}
                    removeClick={(type)=>this.props.onIngredientRemoved(type)}
                    count={(type)=>(this.props.ings[type])}
                    price={this.props.price}
                    totalCount={this.countTotalIngs(this.props.ings)}
                    ordered={this.purchaseHandler}
                    isAuth={this.props.isAuthenticated}
                />                 
            </Aux>);

            orderSummary=(<Ordersummary  
                ingredients={this.props.ings}
                totalCost={this.props.price}
                cancelOrder={this.purchaseCancelHandler}
                continueOrder={this.purchaseContinueHandler}
            />);
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
};

const mapStateToProps=state=>{
    return{
        ings:state.burgerBuilder.ingredients,
        price:state.burgerBuilder.totalPrice,
        error:state.burgerBuilder.error,
        isAuthenticated:state.auth.token!=null,
        building:state.burgerBuilder.building
    }
};

const mapDispatchToProps=dispatch=>  {
    return{
        onIngredientAdded : ingName=>dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved : ingName=>dispatch(actions.removeIngredient(ingName)),
        onIngredientInit : ()=>dispatch(actions.initIngredient()),
        onInitPurchase : ()=>dispatch(actions.purchaseInit())
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Burgerbuilder,axios));