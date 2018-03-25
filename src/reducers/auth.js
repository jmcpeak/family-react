import {
  AUTH_CLEAR,
  AUTH_DISCARD,
  AUTH_FAIL,
  AUTH_SUCCESS
} from '../constants';

export const initialState = {
  isAuthenticated: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTH_CLEAR:
      return {
        ...state,
        isAuthenticated: false,
        error: undefined
      };

    case AUTH_DISCARD:
      return {};

    case AUTH_SUCCESS:
      return {
        ...state,
        isAuthenticated: true
      };

    case AUTH_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        error: action.error
      };

    default:
      return state;
  }
};
