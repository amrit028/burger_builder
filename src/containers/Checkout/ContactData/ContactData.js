import React , {Component} from 'react';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import { connect } from 'react-redux';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';

class ContactData extends Component{

    state={
        orderForm:{
            name:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your Name'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            street:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Street'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            zip:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'ZIP Code'
                },
                value:'',
                validation:{
                    required:true,
                    maxLength:6,
                    minLength:6,
                    isNumber:true
                },
                valid:false,
                touched:false
            },
            country:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Country'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            email:{
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'Your E-mail'
                },
                value:'',
                validation:{
                    required:true,
                    isEmail:true
                },
                valid:false,
                touched:false
            },
            deliveryMethod:{
                elementType:'select',
                elementConfig:{
                    options:[
                        {value:'select' , displayValue:'--Select--'},
                        {value:'fastest' , displayValue:'Fastest'},
                        {value:'cheapest' , displayValue:'Cheapest'}
                    ]
                },
                value:'select',
                validation:{
                    isNotSelect:false
                },
                valid:false,
                touched:false
            }
        },
        isFormValid:false
    }

    orderHandler(event){
        event.preventDefault();

        let formData={};

        for(let key in this.state.orderForm){
            formData[key]=this.state.orderForm[key].value;
        }

        const orders={
            ingredients:this.props.ings,
            price:this.props.price,
            orderData:formData,
            userId:this.props.userId
        };

        this.props.onOrderBurger(orders,this.props.token);        
        this.props.onBurgerBuildingEnd();
    }

    checkValidity=(value,rules)=>{
        let isValid=true;

        if(rules)
        {
            if(rules.required){
                isValid = value.trim()!=='' && isValid;
            }

            if(rules.minLength){
                isValid = value.length>=rules.minLength && isValid;
            }

            if(rules.maxLength){
                isValid = value.length<=rules.maxLength && isValid;
            }

            if(rules.isNotSelect){
                isValid = value!=='select' && isValid;
            }

            if(rules.isNumber){
                const pattern= /^\d+$/;
                isValid = pattern.test(value) && isValid;
            }

            if(rules.isEmail){
                const pattern=/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
                isValid = pattern.test(value) && isValid;
            }
        }

        return isValid;
    }

    clickHandler=(event,inputIdentifier)=>{
        let updatedOrderForm={
            ...this.state.orderForm
        };

        let updatedInputIdentifier={
            ...updatedOrderForm[inputIdentifier]
        };

        updatedInputIdentifier.touched=true;

        updatedOrderForm[inputIdentifier]=updatedInputIdentifier;

        this.setState({orderForm:updatedOrderForm});
    }

    inputChangedHandler=(event,inputIdentifier)=>{
        let updatedOrderForm={
            ...this.state.orderForm
        };

        let updatedInputIdentifier={
            ...updatedOrderForm[inputIdentifier]
        };

        updatedInputIdentifier.value=event.target.value;

        updatedInputIdentifier.valid=this.checkValidity(updatedInputIdentifier.value,updatedInputIdentifier.validation);

        updatedInputIdentifier.touched=true;

        updatedOrderForm[inputIdentifier]=updatedInputIdentifier;

        if(inputIdentifier==='deliveryMethod' && updatedOrderForm[inputIdentifier].value==='select')
        updatedOrderForm[inputIdentifier].valid=false;

        let formIsValid=true;

        for(let key in updatedOrderForm){
            formIsValid = updatedOrderForm[key].valid && formIsValid;
        }

        this.setState({orderForm:updatedOrderForm,isFormValid:formIsValid});
    }

    render(){

        let formData=[];

        for(let key in this.state.orderForm){
            formData.push({
                id:key,
                config:this.state.orderForm[key]
            });
        };

        let form=(<form>
            {formData.map(formElement=>{
                console.log(formElement.id);
                return (
                    <Input
                        id={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        inValid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event)=>this.inputChangedHandler(event,formElement.id)}
                        clicked={(event)=>this.clickHandler(event,formElement.id)}
                    />
                );
            })}

            <Button btnType="Success" disabled={!this.state.isFormValid} clicked={(event)=>this.orderHandler(event)}>Submit</Button>
        </form>);

        console.log("load",this.props.loading);

        if(this.props.loading){
            form=<Spinner/>
        }

        return (
            <div className={classes.ContactData}>
                <h3>Enter your contact data!</h3>
                {form}
            </div>
        );
    }
}

const mapStateToProps=state=>{
    return {
        ings:state.burgerBuilder.ingredients,
        price:state.burgerBuilder.totalPrice,
        loading:state.order.loading,
        token:state.auth.token,
        userId:state.auth.userId
    };
};

const mapDispatchToProps=dispatch=>{
    return {
        onOrderBurger : (orders,token) => dispatch(actions.purchaseBurger(orders,token)),
        onBurgerBuildingEnd : () => dispatch(actions.buildingBurderEnd())
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData,axios));