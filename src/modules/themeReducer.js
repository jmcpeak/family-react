import blue from 'material-ui/colors/blue';
import brown from 'material-ui/colors/brown';
import {
  THEME_DARK,
  THEME_LIGHT,
  THEME_ADD_AVAILABLE,
  THEME_DARK_MODE,
  THEME_OPEN_CLOSE_DRAWER,
  THEME_PALETTE_SELECTED,
  THEME_SET_PRIMARY,
  THEME_SET_SECONDARY
} from './constants';

const initialState = {
  available: [],
  type: THEME_LIGHT,
  open: false,
  paletteSelected: true,
  primary: blue,
  secondary: brown
};

export default (state = initialState, action) => {
  switch (action.type) {
    case THEME_ADD_AVAILABLE:
      return {
        ...state,
        available: [...state.available, action.payload.default]
      };

    case THEME_DARK_MODE:
      return {
        ...state,
        type: state.type === THEME_LIGHT ? THEME_DARK : THEME_LIGHT
      };

    case THEME_OPEN_CLOSE_DRAWER:
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

    case THEME_PALETTE_SELECTED:
      return {
        ...state,
        paletteSelected: !state.paletteSelected
      };

    default:
      return state;
  }
};
