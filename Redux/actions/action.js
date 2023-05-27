import {
  get_User_Playlists,
  request_Refreshed_AccessToken,
  set_Refresh_Token,
  get_Featured_Playlists,
  get_User_Recently_Playlists,
  get_User_Top_Artists,
  set_User_Playlists,
  set_User_Info,
  get_User_Profile,
  get_User_Follows,
  set_User_Recently_Playlists,
} from '../constant';
import {authenticate_User, set_Token} from '../constant';

export const requestRefreshedAccessToken = () => {
  return {
    type: request_Refreshed_AccessToken,
  };
};
export const authenticateUser = () => {
  return {
    type: authenticate_User,
  };
};
export const setToken = auth => {
  return {
    type: set_Token,
    auth,
  };
};
export const setRefreshToken = data => {
  console.log(4);
  return {
    type: set_Refresh_Token,
    data,
  };
};

export const setUserPlaylists = playlist => {
  console.log(15555);
  return {
    type: set_User_Playlists,
    playlist,
  };
};
export const setUserInfo = UserProfileInfo => {
  console.log(UserProfileInfo, 66666);
  return {
    type: set_User_Info,
    UserProfileInfo,
  };
};
export const getUserPlaylists = () => {
  return {
    type: get_User_Playlists,
  };
};
export const getUserProfile = () => {
  return {
    type: get_User_Profile,
  };
};
export const getUserRecentlyPlaylists = () => {
  return {
    type: get_User_Recently_Playlists,
  };
};
export const setUserRecentlyPlaylists = recentlyPlayed => {
  return {
    type: set_User_Recently_Playlists,
    recentlyPlayed,
  };
};
export const getUserTopArtists = () => {
  return {
    type: get_User_Top_Artists,
  };
};
export const getUserFollows = () => {
  return {
    type: get_User_Follows,
  };
};
// export const getCategoryPlaylists = () => {
//   return {
//     type: get_Category_Playlists,
//   };
// };
