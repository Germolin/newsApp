import firebase from 'firebase';
import { Actions } from "react-native-router-flux";


export const emailChanged = (text) => {
    return {
        type: 'email_changed',
        payload: text
    }
}

export const passwordChanged = (text) => {
    return {
        type: 'password_changed',
        payload: text
    }
}

export const loginUser = ({ email, password }) => {
    return (dispatch) => {
        dispatch({ type: 'load' })

        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(user => loginSuccess(dispatch, user))
        .catch((error) => {
            console.log(error);
            loginFail(dispatch);
        });
    }
}

const loginFail = (dispatch) => {
    dispatch({ type: "login_failed" });
}

const loginSuccess = (dispatch, user) => {
    dispatch({
        type: "login_success",
        payload: user
    });

    Actions.main();
}