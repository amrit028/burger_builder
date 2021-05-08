import React from 'react';
import classes from './Order.module.css';

const order = (props) => {

    let ingredients=[];

    for(let ingredientsName in props.ingredients){
        ingredients.push({
            name:ingredientsName,
            amount:props.ingredients[ingredientsName],
            id:ingredientsName
        });
    };

    let ingredientsOutput=ingredients.map(ing=>{
        return <span className={classes.span} key={ing.id}>{ing.name} {ing.amount}</span>
    })

    return(
        <div>
            <p>Ingredients : {ingredientsOutput}</p>
            <p>USD : {Number.parseFloat(props.price).toFixed(2)}</p>
        </div>
    );
};

export default order;