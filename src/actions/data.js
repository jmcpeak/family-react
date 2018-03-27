import { API } from 'aws-amplify';
import { getUsers } from '../constants/awsWrappers';
import {
  DATA_CLEAR_ERROR,
  DATA_ERROR,
  DATA_ADD_USER,
  DATA_REMOVE_USER,
  DATA_USER,
  DATA_USERS,
  LAYOUT_ADD_USER_TOGGLE
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

export const add = () => async (dispatch, state) => {
  try {
    const values = state().form.add.values;

    values.todoId = state().data.users.length;

    await API.post('todosCRUD', '/todos', { body: values });

    dispatch({ type: DATA_ADD_USER, data: values });
    dispatch({ type: LAYOUT_ADD_USER_TOGGLE });
  } catch (err) {
    dispatch({ type: DATA_ERROR, err });
  }
};

export const remove = id => async dispatch => {
  try {
    console.log('before remove: ', id.todoId);
    // todo - fix me
    await API.delete('todosCRUD', '/todos/' + id.todoId);

    dispatch({ type: DATA_REMOVE_USER, data: id });
  } catch (err) {
    dispatch({ type: DATA_ERROR, err });
  }
};
