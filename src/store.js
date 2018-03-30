import { applyMiddleware, compose, createStore } from 'redux';
import { persistStore } from 'redux-persist';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import rootReducer from './reducers';

const enhancers = [],
  history = createHistory(),
  middleware = [thunk, routerMiddleware(history)];

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.devToolsExtension;

  if (typeof devToolsExtension === 'function')
    enhancers.push(devToolsExtension());
}

const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers),
  store = createStore(rootReducer, {}, composedEnhancers),
  persistor = persistStore(store);

export { history, persistor };
export default store;
