import blue from 'material-ui/colors/blue';
import brown from 'material-ui/colors/brown';
import {
  THEME_DARK,
  THEME_LIGHT,
  THEME_SET_AVAILABLE,
  THEME_DARK_MODE,
  THEME_PALETTE_SELECTED,
  THEME_SET_PRIMARY,
  THEME_SET_SECONDARY
} from '../constants/constants';

export const initialState = {
  available: [],
  type: THEME_LIGHT,
  paletteSelected: true,
  primary: blue,
  secondary: brown
};

export default (state = initialState, action) => {
  switch (action.type) {
    case THEME_SET_AVAILABLE:
      // The method populating the payload is asynchronous - order is not
      // guaranteed - sort themes by the order provided
      return {
        ...state,
        available: action.payload.order.map(
          name =>
            action.payload.themes.filter(theme => theme.name === name)[0].theme
              .default
        )
      };

    case THEME_DARK_MODE:
      return {
        ...state,
        type: state.type === THEME_LIGHT ? THEME_DARK : THEME_LIGHT
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
