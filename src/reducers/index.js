import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import { reducer as form } from 'redux-form';
import auth from './auth';
import data from './data';
import layout from './layout';
import theme from './theme';

export default combineReducers({
  auth,
  data,
  form,
  layout,
  theme,
  router
});
