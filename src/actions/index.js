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
        .then(user => {
            loginSuccess(dispatch, user)
            //Actions.main();
            console.log(1)
            dispatch(loadCategories());
        })
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
}

export function loadNews(categories) {
    return (dispatch) => {
        var string = `https://newsapi.org/v2/top-headlines?country=co${categories}&apiKey=f168520dd2014a82ac4cd695a9016e1f`
        return fetch(string)
             .then(response => response.json())
             .then(data => {
                 console.log(string)
                  dispatch({type: 'news_loaded', payload: data.articles})
                  Actions.main();
                  return data.articles; 
              }
        );
    }
}

export function saveCategories(categories) {
    const { currentUser } = firebase.auth();
    return () => {
      firebase.database().ref(`users/${currentUser.uid}/categories`)
        .set(categories)
        .then(() => Actions.pop())
    }

}

export function loadCategories(dispatch) {
    const { currentUser } = firebase.auth();

    return (dispatch) => {
        firebase.database().ref(`users/${currentUser.uid}/categories`)
          .once("value")
          .then((snapshot) => {
              console.log(2)
              dispatch({ type: "load_categories", payload: snapshotToArray(snapshot) });
              dispatch(loadNews(snapshotToArray(snapshot)))
            })
    }
}

function snapshotToArray(snapshot) {
    var str = '&category='
    var returnArr = [];
    var cats = snapshot.val();
    var keys = Object.keys(cats);

    for(let i = 0 ; i < keys.length; i++) {
        var k = keys[i];
        returnArr.push(cats[k].name);
    };

    return str + returnArr.join();
};