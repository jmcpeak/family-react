import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import counterReducer from './counterReducer';

export default combineReducers({
  router: routerReducer,
  form: formReducer,
  authorization: authReducer,
  counter: counterReducer
});
