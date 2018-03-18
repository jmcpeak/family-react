const AUTH_CLEAR = 'auth/CLEAR',
  AUTH_DISCARD = 'auth/DISCARD',
  AUTH_FAIL = 'auth/FAIL',
  AUTH_SUCCESS = 'auth/SUCCESS',
  AUTH_HASH = 463258776,
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
  HASH_CODE
};
