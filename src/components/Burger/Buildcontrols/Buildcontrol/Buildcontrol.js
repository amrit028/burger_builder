import React from 'react';
import classes from './Buildcontrol.module.css';

const Burgercontrol = (props) => {

    return (
        <div className={classes.BuildControl}>
            <div className={classes.Label}>{props.label}</div>
            <button
                disabled={props.count===0}
                className={classes.Less}
                onClick={props.removed}
            >Less</button>
            <button 
                className={classes.More}
                onClick={props.added}
            >More</button>
        </div>
    );
};

export default Burgercontrol;