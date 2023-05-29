const {set_Search_Result} = require('../constant');

const initialState = {
  isLoading: false,
  results: [
    {
      name: '',
      images: [{url: ''}],
      artists: [{name: ''}],
      id: '',
      album: {images: [{url: ''}], name: ''},
      preview_url: '',
      duration_ms: 0,
      type: '',
      followers: {total: 0},
    },
  ],
};
const SearchData = (state = initialState, action) => {
  const payload = action.data;

  switch (action.type) {
    case set_Search_Result:
      return {
        ...state,
        isLoading: false,

        results: [
          ...payload.artists.items,
          ...payload.albums.items,
          ...payload.tracks.items,
          ...payload.playlists.items,
        ],
      };
    default:
      return state;
  }
};
export default SearchData;

// state.isLoading = false
// state.results = payload
// state.results = [
//   ...payload.artists.items,
//   ...payload.albums.items,
//   ...payload.tracks.items,
//   ...payload.playlists.items,
// ]
