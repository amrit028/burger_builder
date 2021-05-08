import React , {Component} from 'react';

import { connect } from 'react-redux';

import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';
//import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import Input from '../../components/UI/Input/Input';
//import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import { Redirect } from 'react-router-dom';

class Auth extends Component{

    state={
        controls:{
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
            password:{
                elementType:'input',
                elementConfig:{
                    type:'password',
                    placeholder:'Password'
                },
                value:'',
                validation:{
                    required:true,
                    minLength:6
                },
                valid:false,
                touched:false
            }
        },
        isFormValid:false,
        isSignUp:true
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

            if(rules.isEmail){
                const pattern=/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
                isValid = pattern.test(value) && isValid;
            }
        }

        return isValid;
    }

    clickHandler=(event,inputIdentifier)=>{
        let updatedOrderForm={
            ...this.state.controls
        };

        let updatedInputIdentifier={
            ...updatedOrderForm[inputIdentifier]
        };

        updatedInputIdentifier.touched=true;

        updatedOrderForm[inputIdentifier]=updatedInputIdentifier;

        this.setState({controls:updatedOrderForm});
    }

    inputChangedHandler=(event,inputIdentifier)=>{
        let updatedOrderForm={
            ...this.state.controls
        };

        let updatedInputIdentifier={
            ...updatedOrderForm[inputIdentifier]
        };

        updatedInputIdentifier.value=event.target.value;

        updatedInputIdentifier.valid=this.checkValidity(updatedInputIdentifier.value,updatedInputIdentifier.validation);

        updatedInputIdentifier.touched=true;

        updatedOrderForm[inputIdentifier]=updatedInputIdentifier;

        let formIsValid=true;

        for(let key in updatedOrderForm){
            formIsValid = updatedOrderForm[key].valid && formIsValid;
        }

        this.setState({controls:updatedOrderForm,isFormValid:formIsValid});
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value,this.state.controls.password.value,this.state.isSignUp);
    }

    switchHandler = () => {
        this.setState({isSignUp:!this.state.isSignUp});
    }

    render(){

        let formData=[];

        for(let key in this.state.controls){
            formData.push({
                id:key,
                config:this.state.controls[key]
            });
        };

        let errorMsg=null;

        if(this.props.error){
            errorMsg=<p>{this.props.error}</p>
        }

        let authRedirect=null;

        if(this.props.isAuthenticated){
            console.log("count  ",this.props.tot_ings);
            if(this.props.tot_ings)
            authRedirect=<Redirect to="/checkout"/>;
            else
            authRedirect=<Redirect to="/"/>;
        }

        let form=(
        <div className={classes.Auth}>
            {authRedirect}
            {errorMsg}
            <h2>{!this.state.isSignUp?'SignIn/Login':'SignUp/Register'}</h2>

            <form onSubmit={this.submitHandler}>
                {formData.map(formElement=>{
                    return (
                        <Input
                            key={formElement.id}
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

                <Button btnType="Success" disabled={!this.state.isFormValid}>Submit</Button>
            </form>
        
            <Button
                clicked={this.switchHandler} 
                btnType="Danger" >Switch to {this.state.isSignUp?'SignIn':'SignUp'}
            </Button>
        </div>     
        );

        if(this.props.loading){
            form=<Spinner/>;
        }

        return form;
    }
}

const mapStateToProps = state => {
    return {
        tot_ings: state.burgerBuilder.totalIngredients,
        error: state.auth.error,
        loading: state.auth.loading,
        isAuthenticated:state.auth.token!=null
    };
};

const mapDispatchToProps = dispatch =>{
    return{
        onAuth : (email,password,isSignUp) => dispatch(actions.auth(email,password,isSignUp))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Auth);