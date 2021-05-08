import React from 'react';
import classes from './Navigationitem.module.css';
import { NavLink } from 'react-router-dom';

const Navigationitem=(props)=>{

    return (
        <ul className={classes.Navigationitem}>
            <NavLink 
                to={props.link}
                activeClassName={classes.active}
                exact={props.exact}
            >
                {props.children}
            </NavLink>
        </ul>
    );
};

export default Navigationitem;