import {
  LAYOUT_DRAWER_CLOSED,
  LAYOUT_DRAWER_OPEN,
  LAYOUT_USER_MENU_HIDDEN,
  LAYOUT_USER_MENU_VISIBLE,
  LAYOUT_USER_MENU_SET_ANCHOR_EL,
  LAYOUT_USER_MENU_CLEAR_ANCHOR_EL
} from './constants';

export const toggleDrawer = () => (dispatch, getState) => {
  if (getState().layout.drawerOpen) dispatch({ type: LAYOUT_DRAWER_CLOSED });
  else dispatch({ type: LAYOUT_DRAWER_OPEN });
};

export const hideUserMenu = position => dispatch =>
  dispatch({ type: LAYOUT_USER_MENU_HIDDEN, position: position });

export const showUserMenu = position => dispatch =>
  dispatch({ type: LAYOUT_USER_MENU_VISIBLE, position: position });

export const clearMenuAnchorEl = () => dispatch =>
  dispatch({ type: LAYOUT_USER_MENU_CLEAR_ANCHOR_EL });

export const setMenuAnchorEl = element => dispatch =>
  dispatch({ type: LAYOUT_USER_MENU_SET_ANCHOR_EL, element: element });
