import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseInit=()=>{
    return {
        type:actionTypes.PURCHASE_INIT
    }
}

const purchaseBurgerSuccess=(id,orderData)=>{
    return {
        type:actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId:id,
        orderData:orderData
    }
}

export const purchaseBurgerStart=()=>{
    return {
        type:actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseBurgerFail=(error)=>{
    return {
        type:actionTypes.PURCHASE_BURGER_FAIL,
        error:error
    }
}

export const purchaseBurger=(orders,token)=>{

    return dispatch=>{

        dispatch(purchaseBurgerStart());
        
        axios.post('/orders.json?auth=' + token,orders)
        .then(res=>{
            console.log(res);
            if(res===undefined){
                throw new Error();
            }
            console.log(res.data);
            
            dispatch(purchaseBurgerSuccess(res.data.name,orders));
        })
        .catch(error=>{
            console.log(error.message);
            dispatch(purchaseBurgerFail(error));
        });
    }
}

const fetchOrderSuccess=(orders)=>{
    return {
        type:actionTypes.FETCH_ORDER_SUCCESS,
        totOrders:orders
    }
}

export const fetchOrderStart=()=>{
    return {
        type:actionTypes.FETCH_ORDER_START
    }
}

export const fetchOrderFail=(error)=>{
    return {
        type:actionTypes.FETCH_ORDER_FAIL,
        error:error
    }
}

export const fetchOrder=(token,userId)=>{

    return dispatch=>{

        dispatch(fetchOrderStart());

        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        
        axios.get("/orders.json" + queryParams)
            .then((res)=>{
                console.log(res);
                if(res===undefined){
                    throw new Error();
                }

                let fetchOrders=[];

                console.log("order order",res.data);

                for(let key in res.data){
                    fetchOrders.push({
                        ...res.data[key],
                        id:key
                    });
                }

                console.log("order2 order2",res.data);

                dispatch(fetchOrderSuccess(fetchOrders));
            })
            .catch((error)=>{
                console.log("imp ",error);
                dispatch(fetchOrderFail(error));
            });
    }
}