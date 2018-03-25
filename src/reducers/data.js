import {
  DATA_CLEAR_ERROR,
  DATA_ERROR,
  DATA_USER,
  DATA_USERS
} from '../constants/constants';

const initialState = {
  error: {},
  user: {},
  users: [
    // { primary: 'Jason & Sheila McPeak', secondary: 'Gaithersburg, MD' },
    // { primary: 'Shannon & Tara McPeak', secondary: 'Fremont, WI' },
    // { primary: 'Marta & Matt Behrens', secondary: 'Verona, WI' }
  ]
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DATA_USER:
      return {
        ...state,
        user: action.data
      };

    case DATA_USERS:
      return {
        ...state,
        users: action.data
      };

    case DATA_ERROR:
      return {
        ...state,
        error: action.err
      };

    case DATA_CLEAR_ERROR:
      return {
        ...state,
        error: {}
      };

    default:
      return state;
  }
};
