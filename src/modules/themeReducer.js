import blue from 'material-ui/colors/blue';
import brown from 'material-ui/colors/brown';
import {
  THEME_CHANGE_PALETTE_TYPE,
  THEME_TOGGLE,
  THEME_SET_PRIMARY,
  THEME_SET_SECONDARY,
  THEME_DARK,
  THEME_LIGHT
} from './constants';

const initialState = {
  open: false,
  primary: blue,
  secondary: brown,
  type: THEME_LIGHT
};

export default (state = initialState, action) => {
  switch (action.type) {
    case THEME_CHANGE_PALETTE_TYPE:
      return {
        ...state,
        type: state.type === THEME_LIGHT ? THEME_DARK : THEME_LIGHT
      };

    case THEME_TOGGLE:
      return {
        ...state,
        open: !state.open
      };

    case THEME_SET_PRIMARY:
      return {
        ...state,
        primary: action.payload
      };

    case THEME_SET_SECONDARY:
      return {
        ...state,
        secondary: action.payload
      };

    default:
      return state;
  }
};
