import { push } from 'react-router-redux';
import {
  AUTH_CLEAR,
  AUTH_DISCARD,
  AUTH_FAIL,
  AUTH_SUCCESS,
  AUTH_HASH,
  HASH_CODE
} from './constants';
import { HOME_PATH } from '../containers/home';
import { LOGIN_PATH } from '../containers/login';

export const login = () => (dispatch, state) => {
  let values = state().form.loginForm.values,
    question = values ? values.question : '',
    input = HASH_CODE(question.toLowerCase()),
    isError = true,
    errorMessage = question.length
      ? 'That is not the right city'
      : 'You must enter a city name',
    path = LOGIN_PATH,
    type = AUTH_FAIL;

  if (AUTH_HASH === input) {
    type = AUTH_SUCCESS;
    path = HOME_PATH;
    isError = false;
    errorMessage = '';
  }

  dispatch({ type, isError, errorMessage });
  dispatch(push(path));
};

export const logout = () => dispatch => {
  dispatch({ type: AUTH_DISCARD });
  dispatch(push(LOGIN_PATH));
};

export const clear = () => dispatch => {
  dispatch({ type: AUTH_CLEAR, isError: false, errorMessage: '' });
};
