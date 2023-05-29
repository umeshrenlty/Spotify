import React from 'react';
import {View, Text, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {COLORS, FONTS, MEDIA} from '../constants';
const SearchItem = ({
  id,
  type,
  album,
  images,
  name,
  artists,
  previewUrl,
  searchTerm,
}) => {
  console.log(id, type, album, images, name, artists, previewUrl, searchTerm);

  let albumImageUrl;
  if (type === MEDIA.track) {
    albumImageUrl = album.images[0].url;
  } else {
    albumImageUrl = images.length > 0 ? images[0].url : '';
  }

  return (
    <TouchableOpacity activeOpacity={0.7} style={{marginBottom: 15}}>
      <View style={{flexDirection: 'row'}}>
        <Text style={{color: '#fff', fontSize: 22}}>{name}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default SearchItem;
