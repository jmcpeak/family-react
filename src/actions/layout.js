import {
  LAYOUT_DRAWER_CLOSED,
  LAYOUT_DRAWER_OPEN,
  LAYOUT_LIST_MENU_HIDDEN,
  LAYOUT_LIST_MENU_VISIBLE,
  LAYOUT_LIST_MENU_SET_ANCHOR_EL,
  LAYOUT_LIST_MENU_CLEAR_ANCHOR_EL,
  LAYOUT_MORE_MENU_CLEAR_ANCHOR_EL,
  LAYOUT_MORE_MENU_SET_ANCHOR_EL,
  LAYOUT_OPEN_CLOSE_THEME_DRAWER,
  LAYOUT_ABOUT_CLOSE,
  LAYOUT_ABOUT_OPEN,
  LAYOUT_CHANGE_TAB,
  LAYOUT_ADD_USER_TOGGLE
} from '../constants';

export const toggleDrawer = () => (dispatch, getState) => {
  if (getState().layout.drawerOpen) dispatch({ type: LAYOUT_DRAWER_CLOSED });
  else dispatch({ type: LAYOUT_DRAWER_OPEN });
};

export const hideUserMenu = position => dispatch =>
  dispatch({ type: LAYOUT_LIST_MENU_HIDDEN, payload: position });

export const showUserMenu = position => dispatch =>
  dispatch({ type: LAYOUT_LIST_MENU_VISIBLE, payload: position });

export const clearListMenuAnchorEl = () => dispatch =>
  dispatch({ type: LAYOUT_LIST_MENU_CLEAR_ANCHOR_EL });

export const setListMenuAnchorEl = element => dispatch =>
  dispatch({ type: LAYOUT_LIST_MENU_SET_ANCHOR_EL, payload: element });

export const clearMoreMenuAnchorEl = () => dispatch =>
  dispatch({ type: LAYOUT_MORE_MENU_CLEAR_ANCHOR_EL });

export const setMoreMenuAnchorEl = element => dispatch =>
  dispatch({ type: LAYOUT_MORE_MENU_SET_ANCHOR_EL, payload: element });

export const aboutClose = () => dispatch =>
  dispatch({ type: LAYOUT_ABOUT_CLOSE });

export const aboutOpen = () => dispatch =>
  dispatch({ type: LAYOUT_ABOUT_OPEN });

export const changeTab = tab => dispatch =>
  dispatch({ type: LAYOUT_CHANGE_TAB, payload: tab });

export const toggleAddUser = () => dispatch =>
  dispatch({ type: LAYOUT_ADD_USER_TOGGLE });

export const openCloseThemeDrawer = () => dispatch =>
  dispatch({ type: LAYOUT_OPEN_CLOSE_THEME_DRAWER });
