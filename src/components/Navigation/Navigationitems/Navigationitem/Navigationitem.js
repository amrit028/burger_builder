import React from 'react';
import classes from './Navigationitem.module.css';

const Navigationitem=(props)=>{

    return (
        <ul className={classes.Navigationitem}>
            <a 
                href={props.link}
                className={props.active?classes.active:null}
            >{props.children}</a>
        </ul>
    );
};

export default Navigationitem;