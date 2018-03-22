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
  LAYOUT_HIDDEN,
  LAYOUT_VISIBLE,
  LAYOUT_ABOUT_CLOSE,
  LAYOUT_ABOUT_OPEN,
  LAYOUT_CHANGE_TAB,
  LAYOUT_ADD_USER_TOGGLE
} from './constants';

const initialState = {
  aboutOpen: false,
  activeTab: 0,
  addUserOpen: false,
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
        listMenuAnchorEl: action.payload
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

    case LAYOUT_ABOUT_CLOSE:
      return {
        ...state,
        aboutOpen: false
      };

    case LAYOUT_ABOUT_OPEN:
      return {
        ...state,
        aboutOpen: true
      };

    case LAYOUT_CHANGE_TAB:
      return {
        ...state,
        activeTab: action.payload
      };

    case LAYOUT_ADD_USER_TOGGLE:
      return {
        ...state,
        addUserOpen: !state.addUserOpen
      };

    case LAYOUT_OPEN_CLOSE_THEME_DRAWER:
      return {
        ...state,
        themeDrawerOpen: !state.themeDrawerOpen
      };

    default:
      return state;
  }
};
