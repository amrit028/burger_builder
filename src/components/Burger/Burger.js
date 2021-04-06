import React from 'react';
import Burgeringredient from './Burgeringredient/Burgeringredient';
import classes from './Burger.module.css';

const Burger = (props) => {

    let transformedingredients = Object.keys(props.ingredients).map(igkey=>{
        return [...Array(props.ingredients[igkey])].map((_,i)=>{
            return <Burgeringredient key={igkey+i} type={igkey} />;
        });
    }).reduce((arr,el)=>{
        return arr.concat(el);
    },[]);

    if(transformedingredients.length===0)
    transformedingredients="Please add some ingredients!!";

    return (
        <div className={classes.Burger}>
            <Burgeringredient type='bread-top'/>
            {transformedingredients}
            <Burgeringredient type='bread-bottom'/>
        </div>
    );
};

export default Burger;