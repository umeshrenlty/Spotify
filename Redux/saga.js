import {takeEvery, put, takeLatest, all} from 'redux-saga/effects';
import {spotifyAuthConfig} from '../utils/spotifyAuthConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {authorize, refresh} from 'react-native-app-auth';
import {getUserRecentlyPlaylists, setUserPlaylists} from './actions/action';
import {
  authenticate_User,
  get_Album_media,
  get_Category_Playlists,
  get_User_Playlists,
  get_User_Profile,
  get_User_Recently_Playlists,
  get_playList_media,
  set_Album_Play_list,
  set_Category_Playlists,
  set_Media_Play_list,
  set_User_Info,
  set_User_Playlists,
  set_User_Recently_Playlists,
} from './constant';
import {request_Refreshed_AccessToken} from './constant';
import {set_Token} from './constant';

import axios from 'axios';
import getCategory from './actions/BrowseActions';

const saveTokensToAsyncStorage = (
  accessToken,
  refreshToken,
  accessTokenExpirationDate,
) => {
  AsyncStorage.setItem(
    'authData',
    JSON.stringify({
      accessToken,
      refreshToken,
      accessTokenExpirationDate,
    }),
  );
};
function* getToken() {
  const auth = yield authorize(spotifyAuthConfig);
  const {accessToken, refreshToken, accessTokenExpirationDate} = auth;

  saveTokensToAsyncStorage(
    accessToken,
    refreshToken,
    accessTokenExpirationDate,
  );
}

function* requestRefreshedAccessToken(refreshTokenFromStorage) {
  try {
    const auth = yield refresh(spotifyAuthConfig, {
      refreshToken: refreshTokenFromStorage,
    });
    const {accessToken, refreshToken, accessTokenExpirationDate} = auth;
    console.log(accessToken, 'refreshOe');
    saveTokensToAsyncStorage(
      accessToken,
      refreshToken,
      accessTokenExpirationDate,
    );
  } catch (error) {
    console.log(error);
  }
}
function* getUserPlay() {
  console.log('hello');
  const authData = yield AsyncStorage.getItem('authData');
  const {accessToken} = yield JSON.parse(authData);
  const data = yield axios('https://api.spotify.com/v1/me/playlists?limit=20', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + accessToken,
    },
  })
    .then(playlist => {
      // console.log(playlist, 'checi');
      return playlist;
    })
    .catch(error => {
      return error;
    });
  const {items} = data?.data;

  // console.log(items, 'check');
  yield put({type: set_User_Playlists, items});
}
// function* getUserInfo()
// {

// }
function* getUserData() {
  const authData = yield AsyncStorage.getItem('authData');
  const {accessToken} = yield JSON.parse(authData);
  const UserProfile = yield axios('https://api.spotify.com/v1/me', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + accessToken,
    },
  })
    .then(userData => {
      // console.log(userData, 'userData');
      return userData;
    })
    .catch(error => {
      return error;
    });
  const {data} = UserProfile;
  const UserProfileInfo = data;

  // console.log(data, 'userProfile');
  yield put({type: set_User_Info, UserProfileInfo});
}
function* RecentlyPlaylists() {
  const authData = yield AsyncStorage.getItem('authData');
  const {accessToken} = yield JSON.parse(authData);
  const RecentlyPlayed = yield axios(
    'https://api.spotify.com/v1/me/player/recently-played?limit=10',
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + accessToken,
      },
    },
  )
    .then(recentlyData => {
      // console.log(recentlyData, 'recentlyData');
      return recentlyData;
    })
    .catch(error => {
      return error;
    });
  const {data} = RecentlyPlayed;

  // console.log(data, 'userProfile');
  yield put({type: set_User_Recently_Playlists, data});
}
function* getMediaData({mediaId}) {
  console.log(mediaId);
  const abc = mediaId;
  const authData = yield AsyncStorage.getItem('authData');
  const {accessToken} = yield JSON.parse(authData);
  const mediaData = yield axios(`https://api.spotify.com/v1/playlists/${abc}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + accessToken,
    },
  })
    .then(recentlyData => {
      return recentlyData;
    })
    .catch(error => {
      return error;
    });
  const media = mediaData.data;
  console.log(media, 'playlist');

  yield put({type: set_Media_Play_list, media});
}
function* getAlbumTracks({mediaId}) {
  console.log('fggg');
  const abc = mediaId;
  const authData = yield AsyncStorage.getItem('authData');
  const {accessToken} = yield JSON.parse(authData);
  const mediaData = yield axios(`https://api.spotify.com/v1/albums/${abc}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + accessToken,
    },
  })
    .then(recentlyData => {
      return recentlyData;
    })
    .catch(error => {
      return error;
    });
  console.log(mediaData, 'album');
  const media = mediaData.data;

  yield put({type: set_Album_Play_list, media});
}
function* getCategoryData() {
  console.log('hiic');
  const authData = yield AsyncStorage.getItem('authData');
  const {accessToken} = yield JSON.parse(authData);
  const category = yield axios('https://api.spotify.com/v1/browse/categories', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + accessToken,
    },
  })
    .then(response => {
      return response;
    })
    .catch(error => {
      return error;
    });

  const data = category.data;
  console.log(data, 'hellllllllll');
  yield put({type: set_Category_Playlists, data});
}
function* getTokenSaga() {
  console.log(1111, 3455);
  try {
    yield takeLatest(authenticate_User, getToken);
    yield takeEvery(request_Refreshed_AccessToken, requestRefreshedAccessToken);
    yield takeEvery(get_User_Playlists, getUserPlay);
    yield takeEvery(get_Category_Playlists, getCategoryData);
    yield takeEvery(get_User_Profile, getUserData);
    yield takeEvery(get_User_Recently_Playlists, RecentlyPlaylists);
    yield takeEvery(get_playList_media, getMediaData);
    yield takeEvery(get_Album_media, getAlbumTracks);
  } catch (error) {
    console.error(error);
  }
}

export default getTokenSaga;
