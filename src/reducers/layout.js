import {
  LAYOUT_DRAWER_USERS_CLOSED,
  LAYOUT_DRAWER_USERS_OPEN,
  LAYOUT_DRAWER_MENU_CLOSED,
  LAYOUT_DRAWER_MENU_OPEN,
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
  usersOpen: true,
  menuOpen: false,
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
    case LAYOUT_DRAWER_USERS_CLOSED:
      return {
        ...state,
        usersOpen: false
      };

    case LAYOUT_DRAWER_USERS_OPEN:
      return {
        ...state,
        usersOpen: true
      };

    case LAYOUT_DRAWER_MENU_CLOSED:
      return {
        ...state,
        menuOpen: false
      };

    case LAYOUT_DRAWER_MENU_OPEN:
      return {
        ...state,
        menuOpen: true
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
