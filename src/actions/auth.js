import { API } from 'aws-amplify';
import { push } from 'react-router-redux';
import {
  AUTH_CLEAR,
  AUTH_DISCARD,
  AUTH_FAIL,
  AUTH_SUCCESS,
  HASH_CODE
} from '../constants';
import { HOME_PATH } from '../containers/home/index';
import { LOGIN_PATH } from '../containers/login/index';

const API_NAME = 'familyCRUD',
  PREFIX = '/family',
  TOKEN = '/token/';

export const clear = () => dispatch => dispatch({ type: AUTH_CLEAR });

export const login = () => async (dispatch, state) => {
  const values = state().form.loginForm.values,
    question = values ? values.question.toLowerCase() : '',
    userInputAsHash = HASH_CODE(question);

  try {
    const data = await API.get(API_NAME, `${PREFIX}${TOKEN}${userInputAsHash}`);

    if (data && data.success === true) {
      dispatch({ type: AUTH_SUCCESS });
      dispatch(push(HOME_PATH));
    }
  } catch (error) {
    dispatch({ type: AUTH_FAIL, error });
    dispatch(push(LOGIN_PATH));
  }
};

export const logout = () => dispatch => {
  dispatch({ type: AUTH_DISCARD });
  dispatch(push(LOGIN_PATH));
};
