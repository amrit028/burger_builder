import React from 'react';
import Burgercontrol from './Buildcontrol/Buildcontrol';
import classes from './Buildcontrols.module.css';

const Burgercontrols = (props) => {

    const contents=[
        {label:'Salad',type:'salad'},
        {label:'Cheese',type:'cheese'},
        {label:'Bacon',type:'bacon'},
        {label:'Meat',type:'meat'}
    ]

    const ingredients=contents.map(val=>(
        <Burgercontrol
            key={val.type}
            label={val.label} 
            added={()=>props.addClick(val.type)}
            removed={()=>props.removeClick(val.type)}
            count={props.count(val.type)}
        /> 
    ));

    return (
        <div className={classes.BuildControls}>
            <p><strong>Current Price: $ {props.price.toFixed(2)}</strong></p>
            {ingredients}
            <br/>
            <button style={{margin:'0 0 20px 0'}}
                className={classes.Order}
                disabled={props.totalCount===0} 
                onClick={props.ordered}
            >ORDER NOW</button>
        </div>
    );
};

export default Burgercontrols;