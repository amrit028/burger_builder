import * as actionTypes from '../actions/actionTypes';

const initialState = {
    ingredients:null,
    totalPrice:4,
    totalIngredients:0,
    error:false,
    building:false
}

const ING_PRICE={
    salad:1.42,
    cheese:3.36,
    bacon:2.25,
    meat:4.90
};

const reducer = (state = initialState , action)=>{
    console.log(action.type===actionTypes.SET_INGREDIENTS);
    switch(action.type){
        case actionTypes.ADD_INGREDIENTS :
            return{
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName]:state.ingredients[action.ingredientName]+1,
                },
                totalPrice:state.totalPrice + ING_PRICE[action.ingredientName],
                totalIngredients:state.totalIngredients + 1,
                building:true
            };
        case actionTypes.REMOVE_INGREDIENTS :
            
            let isTotalIngsZero = false;

            if(state.totalIngredients===1)
            isTotalIngsZero = true
            return {
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName]:state.ingredients[action.ingredientName]-1
                },
                totalPrice:state.totalPrice - ING_PRICE[action.ingredientName],
                totalIngredients:state.totalIngredients - 1,
                building: !isTotalIngsZero
            };
        case actionTypes.SET_INGREDIENTS :
            console.log("here",{
                ...state,
                ingredients:{
                    ...state.ingredients
                },
                totalPrice:state.totalPrice,
                totalIngredients:state.totalIngredients,
                building:state.building,
                error:false
            });
            return {
                ...state,
                ingredients:action.ingredients,
                totalPrice:action.totalPrice,
                totalIngredients:action.totalIngredients,
                building:action.building,
                error:false
            };
        case actionTypes.BUILDING_BURGER_END :
            return {
                ...state,
                building:false
            };
        case actionTypes.FETCH_INGREDIENTS_FAILED :
            return {
                ...state,
                error:true,
                building:false
            };
        default:
            return state;
    }
}

export default reducer;