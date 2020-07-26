import {
    SIGNUP_FAIL,
     SIGNUP_SUCCESS,
     LOGIN_FAIL,
     LOGIN_SUCCESS,
     LOGOUT,
     USER_LOADED_FAIL,
     USER_LOADED_SUCCESS,
     AUTHENTICATED_FAIL,
     AUTHENTICATED_SUCCESS
} from './Types';

import axios from 'axios';

export const checkAuthenticated = () => async dispatch => {
    if(localStorage.getItem('access')){
        const config = {
            headers : {
                 'Content-type' : 'application/json',
                 'Accept' : 'application/json'
            }
        }

        const body = JSON.stringify({token : localStorage.getItem('access')});

        try{
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/verify/`,body,config);

            if(res.data.code !== 'token_not_valid'){
                dispatch({
                    type : AUTHENTICATED_SUCCESS,
                });
            } else {
                dispatch({
                    type : AUTHENTICATED_FAIL
                });
            }
        } catch(err) {
            dispatch({
                type : AUTHENTICATED_FAIL,
            });
        }

    } else{
        dispatch({
            type: AUTHENTICATED_FAIL,
        })
    }
}

export const loadUser = () => async dispatch => {
   if(localStorage.getItem('access')) {
       const config = {
           headers : {
                'Content-type' : 'application/json',
                'Authorization' : `JWT ${localStorage.getItem('access')}`,
                'Accept' : 'application/json'
           }
       }

       try{
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/users/me/`, config);
        dispatch({
            type: USER_LOADED_SUCCESS,
            payload: res.data
        });
        
    } catch(err){
        dispatch({
            type : USER_LOADED_FAIL,
        });

    }

   } else {
       dispatch({
           type: USER_LOADED_FAIL,
       });
   }
};

export const login = (email, password) => async dispatch => {
    const config = {
        headers: {
            "content-type" : "application/json",
        }
    }

    const body = JSON.stringify({email, password});
    try{
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/create/`,body, config); // CREATE JWT Token
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });

        dispatch(loadUser());

    } catch(err){
        dispatch({
            type: LOGIN_FAIL,
        });
    }
};


export const signup = (email, firstName, lastName, password, re_password, is_student, is_teacher) => async dispatch => {
    const config = {
        headers: {
            "content-type" : "application/json",
        }
    };

    const body = JSON.stringify({email, firstName, lastName, password, re_password, is_student, is_teacher});

    try{
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/`, body,config);
        console.log(res.data);
        dispatch({
            type: SIGNUP_SUCCESS,
            payload : res.data
        });

        dispatch(login(email, password));

    } catch(err){
        dispatch({
            type: SIGNUP_FAIL
        });

    }
};

export const logout = () => dispatch => {
    dispatch({type: LOGOUT});
}