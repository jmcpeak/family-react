import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import { reducer as form } from 'redux-form';
import authorization from './authReducer';
import data from './dataReducer';
import layout from './layoutReducer';
import theme from './themeReducer';

export default combineReducers({
  authorization,
  data,
  form,
  layout,
  theme,
  router
});
