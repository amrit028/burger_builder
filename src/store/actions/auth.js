import * as actionTypes from'./actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type:actionTypes.AUTH_START
    }
}

export const authSuccess = (token,userId) => {
    return {
        type:actionTypes.AUTH_SUCCESS,
        token:token,
        userId:userId
    }
}

export const authFail = (error) => {
    return {
        type:actionTypes.AUTH_FAIL,
        error:error
    }
}

export const logout = () => {

    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');

    return {
        type:actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = (expiryTime) => {
    return dispatch => {
        setTimeout(()=>{
            dispatch(logout());
        },expiryTime * 1000);
    }
}

export const auth = (email,password,isSignUp) => {
    return dispatch => {
        dispatch(authStart());

        const authData={
            email:email,
            password:password,
            returnSecureToken:true
        };

        console.log(authData);

        let url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA69OcncoTmBbjZS-smJ4J9f_DCd4IJ-6g';

        if(!isSignUp)
        url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA69OcncoTmBbjZS-smJ4J9f_DCd4IJ-6g';

        axios.post(url, authData)
            .then(res=>{
                console.log(res);

                localStorage.setItem('token',res.data.idToken);
                localStorage.setItem('expirationDate',new Date(new Date().getTime()+res.data.expiresIn * 1000));
                localStorage.setItem('userId',res.data.localId);

                dispatch(authSuccess(res.data.idToken,res.data.localId));
                dispatch(checkAuthTimeout(res.data.expiresIn));
            })
            .catch(err=>{
                dispatch(authFail(err.response.data.error));
            });
    }
}

export const checkAuthState = () => {
    return dispatch =>{

        const token = localStorage.getItem('token');

        if(!token)
        dispatch(logout());
        else{

            const expirationDate = new Date(localStorage.getItem('expirationDate'));

            if(expirationDate<new Date())
            dispatch(logout())            
            else{
                const userId = localStorage.getItem('userId');

                dispatch(authSuccess(token,userId));
                dispatch(checkAuthTimeout((expirationDate.getTime()-new Date().getTime())/1000));
            }
        }
    }
};