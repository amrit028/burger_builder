import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import Burgercontrols from '../../components/Burger/Buildcontrols/Buildcontrols';
import Aux from '../../hoc/hoc';
import Ordersummary from '../../components/Burger/Ordersummary/Ordersummary';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';

class Burgerbuilder extends Component {

    state={
        ingredients:{
            salad:0,
            cheese:0,
            bacon:0,
            meat:0
        },
        price:{
            salad:1.42,
            cheese:3.36,
            bacon:2.25,
            meat:4.90
        },
        totalPrice:4,
        totalIngredients:0,
        purchasing:false,
        loading:false
    }

    purchaseHandler=()=>{
        this.setState({purchasing:true});
    }

    purchaseCancelHandler=()=>{
        this.setState({purchasing:false});
    }

    purchaseContinueHandler=()=>{

        this.setState({loading:true});

        const orders={
            ingredients:this.state.ingredients,
            price:this.state.totalPrice,
            name:'Amrit'
        };

        axios.post('./orders.json',orders)
        .then(res=>{
            this.setState({loading:false,purchasing:false});
        })
        .catch(err=>{
            this.setState({loading:false,purchasing:false});
        });
    }

    addIngredientsHandler=(type)=>
    {
        let updatedIngredients={...this.state.ingredients};
        updatedIngredients[type]=updatedIngredients[type]+1;
        const newPrice=this.state.totalPrice+this.state.price[type];
        const newCount=this.state.totalIngredients+1;

        this.setState({totalIngredients:newCount,totalPrice:newPrice,ingredients:updatedIngredients});
    }

    removeIngredientsHandler=(type)=>
    {
        let updatedIngredients={...this.state.ingredients};
        updatedIngredients[type]=updatedIngredients[type]-1;
        const newPrice=this.state.totalPrice-this.state.price[type];
        const newCount=this.state.totalIngredients-1;

        this.setState({totalIngredients:newCount,totalPrice:newPrice,ingredients:updatedIngredients});
    }

    render()
    {
        let orderSummary=(<Ordersummary  
            ingredients={this.state.ingredients}
            totalCost={this.state.totalPrice}
            cancelOrder={this.purchaseCancelHandler}
            continueOrder={this.purchaseContinueHandler}
        />);

        if(this.state.loading===true)
        orderSummary=<Spinner/>

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <Burgercontrols 
                    addClick={(type)=>this.addIngredientsHandler(type)}
                    removeClick={(type)=>this.removeIngredientsHandler(type)}
                    count={(type)=>(this.state.ingredients[type])}
                    price={this.state.totalPrice}
                    totalCount={this.state.totalIngredients}
                    ordered={this.purchaseHandler}
                />
            </Aux>
        );
    }
};

export default Burgerbuilder;