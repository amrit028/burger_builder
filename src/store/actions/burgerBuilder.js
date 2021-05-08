import * as actionTypes from'./actionTypes';
import axios from '../../axios-orders';

export const addIngredient=(name)=>{
    return{
        type:actionTypes.ADD_INGREDIENTS,
        ingredientName:name
    }
}

export const removeIngredient=(name)=>{
    return{
        type:actionTypes.REMOVE_INGREDIENTS,
        ingredientName:name
    }
}

const setIngredient=(ingredients,totalPrice,totalIngredients)=>{
    console.log("reached");
    console.log(ingredients);
    return{
        type:actionTypes.SET_INGREDIENTS,
        ingredients:ingredients,
        totalPrice:totalPrice,
        totalIngredients:totalIngredients,
        building:totalIngredients!==0
    }
}

export const buildingBurderEnd=()=>{
    return{
        type:actionTypes.BUILDING_BURGER_END
    }
}

const fetchIngredientsFailed=()=>{
    return{
        type:actionTypes.FETCH_INGREDIENTS_FAILED
    }
}

export const initIngredient=()=>{
    return dispatch=>{
        axios.get('https://burger-3fd53-default-rtdb.firebaseio.com/ingredients/-MZKCMgr-f91ZdsCYoG7.json')
        
            .then(res => {
                console.log(res);
                    if(res===undefined){
                        throw new Error();
                    }
                
                var tot=0;

                // Object.keys(res.data.ingredients).forEach((key) => {
                //     tot+=res.data.ingredients[key];
                // });

                for(let key in res.data.ingredients){
                    tot+=res.data.ingredients[key];
                }

                console.log("yes");

                dispatch(setIngredient(res.data.ingredients,res.data.price,tot));
            })
            .catch(err=>{
                dispatch(fetchIngredientsFailed());
            });        
    }
}