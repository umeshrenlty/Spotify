const {
  get_playList_media,
  set_Media_Play_list,
  get_Track_Player,
  get_Album_media,
  set_Album_Play_list,
} = require('../constant');

export const getMediaPlaylist = mediaId => {
  return {
    type: get_playList_media,
    mediaId,
  };
};
export const setMediaPlaylist = mediaData => {
  return {
    type: set_Media_Play_list,
    mediaData,
  };
};
export const getAlbumPlaylist = mediaId => {
  return {
    type: get_Album_media,
    mediaId,
  };
};
export const setAlbumPlaylist = mediaData => {
  return {
    type: set_Album_Play_list,
    mediaData,
  };
};
export const getTrackPlayer = () => {
  return {
    type: get_Track_Player,
  };
};
