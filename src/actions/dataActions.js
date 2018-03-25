import { API } from 'aws-amplify';
import { getUser, getUsers } from '../constants/awsWrappers';
import {
  DATA_CLEAR_ERROR,
  DATA_ERROR,
  DATA_USER,
  DATA_USERS
} from '../constants/constants';

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

export const usersOrg = () => async dispatch => {
  try {
    const data = await getUsers();
    dispatch({ type: DATA_USERS, data });
  } catch (err) {
    dispatch({ type: DATA_ERROR, err });
  }
};

export const users = () => async dispatch => {
  try {
    const data = await API.get('todosCRUD', `/todos/uh`);

    if (!Array.isArray(data) && data.error) {
      dispatch({ type: DATA_ERROR, err: { message: data.error } });
    } else {
      dispatch({ type: DATA_USERS, data });
    }
  } catch (err) {
    dispatch({ type: DATA_ERROR, err });
  }
};

// await API.post('todosCRUD', '/todos', { body: newTodo });
