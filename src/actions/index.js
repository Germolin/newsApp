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

export function loadNews() {
    return (dispatch) => {
        return fetch('https://newsapi.org/v2/top-headlines?country=co&category=business&apiKey=f168520dd2014a82ac4cd695a9016e1f')
             .then(response => response.json())
             .then(data => {
                  dispatch({type: 'news_loaded', payload: data.articles})
                  return data.articles; 
                }
            );

            }
        }