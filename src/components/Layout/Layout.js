import React from 'react';
import Aux from '../../hoc/auxiliary/auxiliary';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import classes from './Layout.module.css';

const layout = (props) => {
    console.log("lay ",props.isAuthenticated);
    return(
        <Aux>
            <Toolbar isAuth={props.isAuthenticated}/>
            <main className={classes.Content}>{props.children}</main>
        </Aux>
    );
};

export default layout;