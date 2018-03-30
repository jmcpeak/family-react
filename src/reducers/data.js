import {
  DATA_CLEAR_ERROR,
  DATA_CLEAR_UNDO,
  DATA_ERROR,
  DATA_ADD_USER,
  DATA_REMOVE_USER,
  DATA_UNDO_REMOVE_USER,
  DATA_USER,
  DATA_USERS,
  DATA_USERS_BUSY
} from '../constants';

export const initialState = {
  error: {},
  undo: {},
  user: {},
  users: [],
  cachedUsers: [],
  usersBusy: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DATA_USER:
      return {
        ...state,
        user: action.data,
        cachedUsers: [...state.cachedUsers, action.data]
      };

    case DATA_ADD_USER:
      return {
        ...state,
        users: [...state.users, action.data]
      };

    case DATA_REMOVE_USER:
      return {
        ...state,
        users: state.users.filter((item, index) => {
          if (item === action.user) action.user.position = index;
          return item !== action.user;
        }),
        user: initialState.user,
        undo: action.user
      };

    case DATA_UNDO_REMOVE_USER:
      let start = action.user.position,
        newUsers = state.users.concat();

      delete action.user.position;
      newUsers.splice(start, 0, action.user);

      return {
        ...state,
        users: newUsers,
        user: action.user,
        undo: initialState.undo
      };

    case DATA_CLEAR_UNDO:
      return {
        ...state,
        undo: initialState.undo
      };

    case DATA_USERS:
      return {
        ...state,
        users: action.data,
        usersBusy: false
      };

    case DATA_USERS_BUSY:
      return {
        ...state,
        usersBusy: true
      };

    case DATA_ERROR:
      return {
        ...state,
        error: action.err,
        usersBusy: false
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
