const {set_Media_Play_list, set_Album_Play_list} = require('../constant');

const initialState = {
  isLoading: true,
  description: '',
  type: '',
  release_date: '12',
  images: [{url: ''}],
  followers: {total: 0},
  tracks: {
    items: [
      {
        id: '',
        artists: [{name: ''}],
        preview_url: '',
        name: '',
        explicit: false,
        album: {name: '', images: [{url: ''}]},
        duration_ms: 0,
      },
    ],
  },
};
const mediaData = (state = initialState, action) => {
  const media = action.media;
  // console.log(action.media);
  const playlistTracks = () => {};
  switch (action.type) {
    case set_Media_Play_list: {
      return {
        ...state,
        isLoading: false,
        description: media.description,
        name: media.name,
        type: media.type,
        images: media.images,
        followers: media.followers,
        tracks: media.tracks.items.map(track => {
          return {...track, ...track.track};
        }),
      };
    }
    case set_Album_Play_list: {
      // console.log(action.media, 2344);
      const media = action.media;
      const filteredTracks = media.tracks.items.filter(
        track => track.preview_url !== null,
      );
      return {
        ...state,
        isLoading: false,
        description: media.description,
        name: media.name,
        type: media.type,
        images: media.images,
      };
    }
    default:
      return state;
  }
};
export default mediaData;
