import {
  AUTH_CLEAR,
  AUTH_DISCARD,
  AUTH_FAIL,
  AUTH_SUCCESS
} from '../constants/constants';

export const initialState = {
  isAuthenticated: false,
  isError: false,
  errorMessage: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTH_CLEAR:
      return {
        ...state,
        isAuthenticated: false,
        isError: action.isError,
        errorMessage: action.errorMessage
      };

    case AUTH_DISCARD:
      return {};

    case AUTH_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        isError: action.isError,
        errorMessage: action.errorMessage
      };

    case AUTH_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        isError: action.isError,
        errorMessage: action.errorMessage
      };

    default:
      return state;
  }
};
