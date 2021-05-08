import React from 'react';
import classes from './Navigationitems.module.css';
import Navigationitem from './Navigationitem/Navigationitem';

const Navigationitems=(props)=>{

    console.log("IsAuth",props.isAuthenticated);

    return (
        <div className={classes.Navigationitems}>
            <Navigationitem link="/" exact>BURGER BUILDER</Navigationitem>
            {props.isAuthenticated
                ? <Navigationitem link="/orders">ORDERS</Navigationitem>
                : null
            }
            {props.isAuthenticated
                ? <Navigationitem link="/logout">LOGOUT</Navigationitem>
                : <Navigationitem link="/auth">AUTHENTICATE</Navigationitem>
            }
        </div>
    );
};

export default Navigationitems;