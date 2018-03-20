import {
  THEME_CHANGE_PALETTE_TYPE,
  THEME_DARK,
  THEME_LIGHT
} from './constants';

const initialState = {
  paletteType: THEME_LIGHT
};

export default (state = initialState, action) => {
  switch (action.type) {
    case THEME_CHANGE_PALETTE_TYPE:
      return {
        ...state,
        paletteType:
          state.paletteType === THEME_LIGHT ? THEME_DARK : THEME_LIGHT
      };

    default:
      return state;
  }
};
