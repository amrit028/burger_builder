import React from 'react';
import Button from '../../UI/Button/Button';

const Ordersummary = (props) => {

    const details=Object.keys(props.ingredients).map(igkey=>{
        return <li key={igkey}>{igkey}: {props.ingredients[igkey]}</li>
    });

    return (
        <div>
            <p>This is your Order:</p>
            {details}
            <br/>
            <strong>Total price: ${props.totalCost.toFixed(2)}</strong>
            <p>Do you wish to continue?</p>
            <Button btnType="Danger" clicked={props.cancelOrder}>CANCEL</Button>
            <Button btnType="Success" clicked={props.continueOrder}>CONTINUE</Button>
        </div>
    );
};

export default Ordersummary;