import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import { reducer as form } from 'redux-form';
import authorization from './authReducer';
import layout from './layoutReducer';
import theme from './themeReducer';

export default combineReducers({
  authorization,
  form,
  layout,
  theme,
  router
});
