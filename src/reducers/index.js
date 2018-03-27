import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import { DATA_ADD_USER } from '../constants';
import auth from './auth';
import data from './data';
import layout from './layout';
import theme from './theme';

export default combineReducers({
  auth,
  data,
  layout,
  theme,
  router,
  form: formReducer.plugin({
    add: (state, action) => {
      switch (action.type) {
        case DATA_ADD_USER:
          // clear the add form after submit
          return undefined;

        default:
          return state;
      }
    }
  })
});
