import {
  set_Media_Play_list,
  set_User_Info,
  set_User_Playlists,
  set_User_Recently_Playlists,
} from '../constant';
const initialState = {
  userPlayLists: [],
  userProfileData: [],
  userRecentlyPlayed: [],
  userMediaData: [],
};
const setUserData = (state = initialState, action) => {
  // console.log(action.items, 'umes');
  switch (action.type) {
    case set_User_Playlists:
      return {
        ...state,
        userPlayLists: action.items,
      };
    case set_User_Info: {
      return {
        ...state,
        userProfileData: action.UserProfileInfo,
      };
    }
    case set_User_Recently_Playlists: {
      const value = action.data.items.map(item => {
        const trackName = item.track.name;
        const albumName = item.track.album.name;
        return {...item.track.album, name: trackName, albumName};
      });

      return {
        ...state,
        userRecentlyPlayed: value,
      };
    }
    // case set_Media_Play_list: {
    //   console.log(action.media, 13344);
    //   return {
    //     ...state,
    //     userMediaData: action.media,
    //   };
    // }
    default:
      return state;
  }
};

export default setUserData;
