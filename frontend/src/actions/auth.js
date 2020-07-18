import axios from 'axios';
import {setAlert} from './alert';

import{
    SIGNUP_FAIL,
    SIGNUP_SUCCESS,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT,
    SET_ALERT
} from './Types';

export const login = ({email, password}) => async dispatch => {

    const config = {
        headers : {
            "content-type" : "application/json",
        }
    };

    const body = JSON.stringify({email, password});

    try{
        const res = await axios.post("http://localhost:8000/api/token/", body,config);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data,
        })

        dispatch(setAlert('Authenticated successfully!', 'Success'));

    } catch(err){
        dispatch({
            type: LOGIN_FAIL,
        })
        dispatch(setAlert("Authentication Error", "Error"));
    }

}