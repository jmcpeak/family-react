import {
  THEME_CHANGE_PALETTE_TYPE,
  THEME_TOGGLE,
  THEME_SET_PRIMARY,
  THEME_SET_SECONDARY
} from './constants';

export const togglePaletteType = () => dispatch =>
  dispatch({ type: THEME_CHANGE_PALETTE_TYPE });

export const toggleTheme = () => dispatch => dispatch({ type: THEME_TOGGLE });

export const setPrimaryTheme = color => dispatch =>
  dispatch({ type: THEME_SET_PRIMARY, payload: color });

export const setSecondaryTheme = color => dispatch =>
  dispatch({ type: THEME_SET_SECONDARY, payload: color });
