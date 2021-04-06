import React from 'react';
import classes from './Navigationitems.module.css';
import Navigationitem from './Navigationitem/Navigationitem';

const Navigationitems=(props)=>{

    return (
        <div className={classes.Navigationitems}>
            <Navigationitem link="/" active>BURGER BUILDER</Navigationitem>
            <Navigationitem link="/">CHECKOUT</Navigationitem>
        </div>
    );
};

export default Navigationitems;