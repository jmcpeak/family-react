import { routerReducer as router } from 'react-router-redux';
import { combineReducers } from 'redux';
import { createTransform, persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import createFilter from 'redux-persist-transform-filter';
import storage from 'redux-persist/lib/storage';
import storageSession from 'redux-persist/lib/storage/session';
import { reducer as formReducer } from 'redux-form';
import { DATA_ADD_USER } from '../constants';
import auth from './auth';
import data from './data';
import layout from './layout';
import theme from './theme';

const authFilter = createFilter('auth', ['isAuthenticated']),
  layoutFilter = createFilter('layout', ['usersOpen']),
  dataTransform = createTransform(
    (inboundState, key) =>
      key === 'cachedUsers' || key === 'user' || key === 'users'
        ? inboundState
        : undefined
  ),
  rootPersistConfig = {
    key: 'root',
    blacklist: ['data', 'form', 'router'],
    stateReconciler: autoMergeLevel2,
    storage: storage,
    transforms: [authFilter, layoutFilter]
  },
  dataPersistConfig = {
    key: 'data',
    storage: storageSession,
    transforms: [dataTransform]
  },
  rootReducer = combineReducers({
    auth,
    layout,
    theme,
    router,
    data: persistReducer(dataPersistConfig, data),
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

export default persistReducer(rootPersistConfig, rootReducer);
