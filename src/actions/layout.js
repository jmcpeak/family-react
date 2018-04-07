import {
  LAYOUT_DRAWER_CLOSED,
  LAYOUT_DRAWER_OPEN,
  LAYOUT_LIST_MENU_HIDDEN,
  LAYOUT_LIST_MENU_VISIBLE,
  LAYOUT_LIST_MENU_SET_ANCHOR_EL,
  LAYOUT_LIST_MENU_CLEAR_ANCHOR_EL,
  LAYOUT_MORE_MENU_CLEAR_ANCHOR_EL,
  LAYOUT_MORE_MENU_SET_ANCHOR_EL,
  LAYOUT_CHANGE_TAB
} from '../constants';

export const toggleDrawer = () => (dispatch, getState) => {
  if (getState().layout.open) dispatch({ type: LAYOUT_DRAWER_CLOSED });
  else dispatch({ type: LAYOUT_DRAWER_OPEN });
};

export const hideUserMenu = position => dispatch =>
  dispatch({ type: LAYOUT_LIST_MENU_HIDDEN, payload: position });

export const showUserMenu = position => dispatch =>
  dispatch({ type: LAYOUT_LIST_MENU_VISIBLE, payload: position });

export const clearListMenuAnchorEl = () => dispatch =>
  dispatch({ type: LAYOUT_LIST_MENU_CLEAR_ANCHOR_EL });

export const setListMenuAnchorEl = (element, user) => dispatch =>
  dispatch({ type: LAYOUT_LIST_MENU_SET_ANCHOR_EL, element, user });

export const clearMoreMenuAnchorEl = () => dispatch =>
  dispatch({ type: LAYOUT_MORE_MENU_CLEAR_ANCHOR_EL });

export const setMoreMenuAnchorEl = event => dispatch =>
  dispatch({
    type: LAYOUT_MORE_MENU_SET_ANCHOR_EL,
    payload: event.currentTarget
  });

export const changeTab = tab => dispatch =>
  dispatch({ type: LAYOUT_CHANGE_TAB, payload: tab });
