import React from 'react';
import classes from './Backprop.module.css'

const Backprop = (props) => (
    props.show?<div className={classes.Backprop} onClick={props.modalClosed}></div>:null
);

export default Backprop;