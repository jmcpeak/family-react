import {
  THEME_ADD_AVAILABLE,
  THEME_DARK_MODE,
  THEME_PALETTE_SELECTED,
  THEME_SET_PRIMARY,
  THEME_SET_SECONDARY
} from './constants';

export const addAvailable = theme => dispatch =>
  dispatch({ type: THEME_ADD_AVAILABLE, payload: theme });

export const setPrimaryTheme = color => dispatch =>
  dispatch({ type: THEME_SET_PRIMARY, payload: color });

export const setSecondaryTheme = color => dispatch =>
  dispatch({ type: THEME_SET_SECONDARY, payload: color });

export const toggleDarkMode = () => dispatch =>
  dispatch({ type: THEME_DARK_MODE });

export const togglePaletteSelected = () => dispatch =>
  dispatch({ type: THEME_PALETTE_SELECTED });
