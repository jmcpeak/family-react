import {
  LAYOUT_DRAWER_CLOSED,
  LAYOUT_DRAWER_OPEN,
  LAYOUT_LIST_MENU_HIDDEN,
  LAYOUT_LIST_MENU_VISIBLE,
  LAYOUT_LIST_MENU_SET_ANCHOR_EL,
  LAYOUT_LIST_MENU_CLEAR_ANCHOR_EL,
  LAYOUT_MORE_MENU_CLEAR_ANCHOR_EL,
  LAYOUT_MORE_MENU_SET_ANCHOR_EL,
  LAYOUT_ABOUT_CLOSE,
  LAYOUT_ABOUT_OPEN
} from './constants';

export const toggleDrawer = () => (dispatch, getState) => {
  if (getState().layout.drawerOpen) dispatch({ type: LAYOUT_DRAWER_CLOSED });
  else dispatch({ type: LAYOUT_DRAWER_OPEN });
};

export const hideUserMenu = position => dispatch =>
  dispatch({ type: LAYOUT_LIST_MENU_HIDDEN, position: position });

export const showUserMenu = position => dispatch =>
  dispatch({ type: LAYOUT_LIST_MENU_VISIBLE, position: position });

export const clearListMenuAnchorEl = () => dispatch =>
  dispatch({ type: LAYOUT_LIST_MENU_CLEAR_ANCHOR_EL });

export const setListMenuAnchorEl = element => dispatch =>
  dispatch({ type: LAYOUT_LIST_MENU_SET_ANCHOR_EL, element: element });

export const clearMoreMenuAnchorEl = () => dispatch =>
  dispatch({ type: LAYOUT_MORE_MENU_CLEAR_ANCHOR_EL });

export const setMoreMenuAnchorEl = element => dispatch =>
  dispatch({ type: LAYOUT_MORE_MENU_SET_ANCHOR_EL, element: element });

export const aboutClose = () => dispatch =>
  dispatch({ type: LAYOUT_ABOUT_CLOSE });

export const aboutOpen = () => dispatch =>
  dispatch({ type: LAYOUT_ABOUT_OPEN });
