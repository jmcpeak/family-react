const KEY = 'McPeakFamilyState';

export const loadState = () => {
  try {
    const state = localStorage.getItem(KEY);
    return state === null ? undefined : JSON.parse(state);
  } catch (e) {
    return undefined;
  }
};

export const saveState = state => {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch (e) {}
};
