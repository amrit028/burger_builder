import React from 'react';
import classes from './Modal.module.css';
import Backprop from '../Backprop/Backprop';
import Aux from '../../../hoc/auxiliary/auxiliary';

const Modal = (props) => {

    return (
        <Aux>

            <Backprop show={props.show} modalClosed={props.modalClosed}/>

            <div 
                className={classes.Modal} 
                style={{transform:props.show?'translateY(0)':'translateY(-100vh)'}}
            >
                {props.children}
            </div>
        </Aux>
    );
};

export default Modal;