import {
  DATA_CLEAR_ERROR,
  DATA_ERROR,
  DATA_ADD_USER,
  DATA_REMOVE_USER,
  DATA_USER,
  DATA_USERS
} from '../constants';

export const initialState = {
  error: {},
  user: {},
  users: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DATA_USER:
      return {
        ...state,
        user: action.data
      };

    case DATA_ADD_USER:
      return {
        ...state,
        users: [...state.users, action.data]
      };

    case DATA_REMOVE_USER:
      return {
        ...state,
        users: state.users.filter(item => item !== action.user)
      };

    case DATA_USERS:
      return {
        ...state,
        users: action.data
      };

    case DATA_ERROR:
      return {
        ...state,
        error: action.err
      };

    case DATA_CLEAR_ERROR:
      return {
        ...state,
        error: {}
      };

    default:
      return state;
  }
};
