const AUTH_CLEAR = 'auth/CLEAR',
  AUTH_DISCARD = 'auth/DISCARD',
  AUTH_FAIL = 'auth/FAIL',
  AUTH_SUCCESS = 'auth/SUCCESS',
  AUTH_HASH = 463258776,
  LAYOUT_DRAWER_CLOSED = 'layout/DRAWER_CLOSED',
  LAYOUT_DRAWER_OPEN = 'layout/DRAWER_OPEN',
  LAYOUT_USER_MENU_VISIBLE = 'layout/USER_MENU_VISIBLE',
  LAYOUT_USER_MENU_HIDDEN = 'layout/USER_MENU_HIDDEN',
  LAYOUT_USER_MENU_SET_ANCHOR_EL = 'layout/USER_MENU_SET_ANCHOR_EL',
  LAYOUT_USER_MENU_CLEAR_ANCHOR_EL = 'layout/USER_MENU_CLEAR_ANCHOR_EL',
  LAYOUT_HIDDEN = 'hidden',
  LAYOUT_VISIBLE = 'visible',
  HASH_CODE = str => {
    let hash = 0,
      len = str.length,
      chr;

    if (len > 0)
      for (let i = 0; i < len; i++) {
        chr = str.charCodeAt(i);
        hash = (hash << 5) - hash + chr;
        hash |= 0; // Convert to 32bit integer
      }

    return hash;
  };

export {
  AUTH_CLEAR,
  AUTH_DISCARD,
  AUTH_FAIL,
  AUTH_SUCCESS,
  AUTH_HASH,
  LAYOUT_DRAWER_CLOSED,
  LAYOUT_DRAWER_OPEN,
  LAYOUT_USER_MENU_VISIBLE,
  LAYOUT_USER_MENU_HIDDEN,
  LAYOUT_USER_MENU_SET_ANCHOR_EL,
  LAYOUT_USER_MENU_CLEAR_ANCHOR_EL,
  LAYOUT_HIDDEN,
  LAYOUT_VISIBLE,
  HASH_CODE
};
