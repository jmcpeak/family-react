import { API } from 'aws-amplify';
import { push } from 'react-router-redux';
import {
  AUTH_BUSY,
  AUTH_CLEAR,
  AUTH_DISABLED,
  AUTH_DISCARD,
  AUTH_FAIL,
  AUTH_SUCCESS,
  BUSY_DELAY,
  HASH_CODE
} from '../constants';
import { PATH as HOME_PATH } from '../containers/home/index';
import { PATH as LOGIN_PATH } from '../components/Login';

const API_NAME = 'familyCRUD',
  PREFIX = '/family',
  TOKEN = '/token/';

export const clear = () => dispatch => dispatch({ type: AUTH_CLEAR });

export const login = () => async (dispatch, state) => {
  const values = state().form.login.values,
    question = values ? values.question.toLowerCase() : '',
    userInputAsHash = HASH_CODE(question);

  dispatch({ type: AUTH_DISABLED });
  const timer = setTimeout(() => dispatch({ type: AUTH_BUSY }), BUSY_DELAY);

  try {
    const data = await API.get(API_NAME, `${PREFIX}${TOKEN}${userInputAsHash}`);

    if (data && data.success === true) {
      dispatch({ type: AUTH_SUCCESS });
      dispatch(push(HOME_PATH));
    }
    clearTimeout(timer);
  } catch (error) {
    dispatch({ type: AUTH_FAIL, error });
    dispatch(push(LOGIN_PATH));
    clearTimeout(timer);
  }
};

export const logout = () => dispatch => {
  dispatch({ type: AUTH_DISCARD });
  dispatch(push(LOGIN_PATH));
};
