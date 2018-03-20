import { THEME_CHANGE_PALETTE_TYPE } from './constants';

export const togglePaletteType = () => dispatch =>
  dispatch({ type: THEME_CHANGE_PALETTE_TYPE });
