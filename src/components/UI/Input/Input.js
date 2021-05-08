import React from 'react';
import classes from './Input.module.css';

const input=(props)=>{

    let inputElement=null;

    let inputClasses=[classes.InputElement];

    console.log(props.touched);

    if(props.inValid && props.shouldValidate  && props.touched){
        inputClasses.push(classes.inValid)
    }

    switch(props.elementType){
        case('input'):
            inputElement=<input 
                    key={props.id}  
                    className={inputClasses.join(' ')} 
                    {...props.elementConfig}
                    value={props.value}
                    onChange={props.changed}
                    onClick={props.clicked}
                />;
            break;
        case('textarea'):
            inputElement=<textarea 
                    key={props.id}
                    className={inputClasses.join(' ')} 
                    {...props.elementConfig}
                    value={props.value}
                    onChange={props.changed}
                    onClick={props.clicked}
                />;
            break;

        case('select'):
            inputElement=<select 
                    key={props.id}
                    className={inputClasses.join(' ')} 
                    value={props.value}
                    onChange={props.changed}
                    onClick={props.clicked}
                >
                    {props.elementConfig.options.map(option=>(
                        <option key={option.value} value={option.value}>{option.displayValue}</option>
                    ))}
                </select>;
            break;
        default:
            inputElement=<input 
                key={props.id}
                className={inputClasses.join(' ')} 
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}
                onClick={props.clicked}
            />;
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label} >{props.label}</label>
            {inputElement}
        </div>
    );
};

export default input;