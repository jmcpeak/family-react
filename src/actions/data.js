import { API } from 'aws-amplify';
import { getUsers } from '../constants/awsWrappers';
import {
  ADD_USER_FORM_NAME,
  DATA_CLEAR_ERROR,
  DATA_ERROR,
  DATA_ADD_USER,
  DATA_REMOVE_USER,
  DATA_USER,
  DATA_USERS
} from '../constants';

export const clearError = () => dispatch =>
  dispatch({ type: DATA_CLEAR_ERROR });

export const user = data => async dispatch => {
  try {
    // const data = await getUser(id);
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
    const data = await API.get('todosCRUD', `/todos`);

    if (!Array.isArray(data) && data.error) {
      dispatch({ type: DATA_ERROR, err: { message: data.error } });
    } else {
      dispatch({ type: DATA_USERS, data });
    }
  } catch (err) {
    dispatch({ type: DATA_ERROR, err });
  }
};

export const add = successCallback => async (dispatch, state) => {
  try {
    const values = state().form[ADD_USER_FORM_NAME].values;

    values.todoId = state().data.users.length;

    await API.post('todosCRUD', '/todos', { body: values });

    dispatch({ type: DATA_ADD_USER, data: values });
    successCallback();
  } catch (err) {
    dispatch({ type: DATA_ERROR, err });
  }
};

export const remove = user => async dispatch => {
  try {
    await API.del('todosCRUD', `/todos/object/${user.team}/${user.todoId}`);

    dispatch({ type: DATA_REMOVE_USER, user });
  } catch (err) {
    dispatch({ type: DATA_ERROR, err });
  }
};
