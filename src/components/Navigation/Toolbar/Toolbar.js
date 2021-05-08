import React from 'react';
import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import Navigationitems from '../Navigationitems/Navigationitems';

const Toolbar=(props)=>{

    return (
        <header className={classes.Toolbar}>
            <div>MENU</div>
            <Logo/>
            <Navigationitems isAuthenticated={props.isAuth}/>
        </header>
    );
};

export default Toolbar;