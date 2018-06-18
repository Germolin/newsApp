import { combineReducers } from 'redux';
import categoriesReducer from './categoriesReducer';
import newsReducer from './newsReducer';
import authReducer from './authReducer';

export default combineReducers({
   categories: categoriesReducer,
   news: newsReducer,
   auth: authReducer
})