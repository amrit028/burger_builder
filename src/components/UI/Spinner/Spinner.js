import React from 'react';
import classes from './Spinner.module.css';

const Spinner=(props)=>{

    return (
        <div className={classes.Loader}>loading...</div>
    );
};

export default Spinner;