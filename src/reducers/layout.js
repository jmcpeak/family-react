import {
  LAYOUT_DRAWER_CLOSED,
  LAYOUT_DRAWER_OPEN,
  LAYOUT_LIST_MENU_HIDDEN,
  LAYOUT_LIST_MENU_VISIBLE,
  LAYOUT_LIST_MENU_SET_ANCHOR_EL,
  LAYOUT_LIST_MENU_CLEAR_ANCHOR_EL,
  LAYOUT_MORE_MENU_CLEAR_ANCHOR_EL,
  LAYOUT_MORE_MENU_SET_ANCHOR_EL,
  LAYOUT_HIDDEN,
  LAYOUT_VISIBLE,
  LAYOUT_CHANGE_TAB
} from '../constants';

export const initialState = {
  activeTab: 0,
  drawerOpen: true,
  listMenuAnchorEl: null,
  moreMenuAnchorEl: null,
  themeDrawerOpen: false,
  userMenus: []
};

export default (state = initialState, action) => {
  const userMenus = value => {
    let menuArray = new Array(action.payload);
    menuArray.splice(action.payload, 0, value);
    return menuArray;
  };

  switch (action.type) {
    case LAYOUT_DRAWER_CLOSED:
      return {
        ...state,
        drawerOpen: false
      };

    case LAYOUT_DRAWER_OPEN:
      return {
        ...state,
        drawerOpen: true
      };

    case LAYOUT_LIST_MENU_HIDDEN:
      return {
        ...state,
        userMenus: userMenus(LAYOUT_HIDDEN)
      };

    case LAYOUT_LIST_MENU_VISIBLE:
      return {
        ...state,
        userMenus: userMenus(LAYOUT_VISIBLE)
      };

    case LAYOUT_LIST_MENU_CLEAR_ANCHOR_EL:
      return {
        ...state,
        listMenuAnchorEl: null
      };

    case LAYOUT_LIST_MENU_SET_ANCHOR_EL:
      return {
        ...state,
        listMenuAnchorEl: action.element,
        user: action.user
      };

    case LAYOUT_MORE_MENU_CLEAR_ANCHOR_EL:
      return {
        ...state,
        moreMenuAnchorEl: null
      };

    case LAYOUT_MORE_MENU_SET_ANCHOR_EL:
      return {
        ...state,
        moreMenuAnchorEl: action.payload
      };

    case LAYOUT_CHANGE_TAB:
      return {
        ...state,
        activeTab: action.payload
      };

    default:
      return state;
  }
};
