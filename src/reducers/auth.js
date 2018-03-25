import {
  AUTH_BUSY,
  AUTH_CLEAR,
  AUTH_DISABLED,
  AUTH_DISCARD,
  AUTH_FAIL,
  AUTH_SUCCESS
} from '../constants';

export const initialState = {
  isAuthenticated: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTH_BUSY:
      return {
        ...state,
        busy: true
      };

    case AUTH_DISABLED:
      return {
        ...state,
        disabled: true
      };

    case AUTH_CLEAR:
      return {
        ...state,
        isAuthenticated: false,
        error: undefined
      };

    case AUTH_DISCARD:
      return {};

    case AUTH_SUCCESS:
      clearTimeout(action.timer);
      return {
        ...state,
        busy: false,
        disabled: false,
        isAuthenticated: true
      };

    case AUTH_FAIL:
      clearTimeout(action.timer);
      return {
        ...state,
        busy: false,
        disabled: false,
        isAuthenticated: false,
        error: action.error
      };

    default:
      return state;
  }
};
