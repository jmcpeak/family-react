import fetchJsonp from 'fetch-jsonp';

export const SEARCH = 'SEARCH';

const initialState = {
    photos: [],
    query: ''
  },
  flickrUrl =
    'http://api.flickr.com/services/feeds/photos_public.gne?format=json&tags=',
  flickrOptions = { jsonpCallback: 'jsoncallback' };

export const search = query => {
  return dispatch => {
    return fetchJsonp(`${flickrUrl}${query}`, flickrOptions)
      .then(r => r.json())
      .then(json => {
        dispatch({
          type: SEARCH,
          photos: json.items
        });
      })
      .catch(ex => console.log('parsing failed', ex));
  };
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SEARCH:
      return {
        ...state,
        photos: action.photos
      };

    default:
      return state;
  }
};
