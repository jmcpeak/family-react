import { getUser, getUsers } from './awsWrappers';
import {
  DATA_CLEAR_ERROR,
  DATA_ERROR,
  DATA_USER,
  DATA_USERS
} from './constants';

export const clearError = () => dispatch =>
  dispatch({ type: DATA_CLEAR_ERROR });

export const user = id => async dispatch => {
  try {
    const data = await getUser(id);
    dispatch({ type: DATA_USER, data });
  } catch (err) {
    dispatch({ type: DATA_ERROR, err });
  }
};

export const users = () => async dispatch => {
  try {
    const data = await getUsers();
    dispatch({ type: DATA_USERS, data });
  } catch (err) {
    dispatch({ type: DATA_ERROR, err });
  }
};
