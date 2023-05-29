import React from 'react';
import {View, Text, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {COLORS, FONTS, MEDIA} from '../constants';
import BulletDot from './BulletDot';
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
  // console.log(id, type, album, images, name, artists, previewUrl, searchTerm);

  let albumImageUrl;
  if (type === MEDIA.track) {
    albumImageUrl = album.images[0].url;
  } else {
    albumImageUrl = images.length > 0 ? images[0].url : '';
  }

  return (
    <TouchableOpacity activeOpacity={0.7} style={{margin: 15}}>
      <View style={{flexDirection: 'row'}}>
        <View style={{height: 40, width: 40, marginRight: 15}}>
          <Image
            style={{
              width: '100%',
              height: '100%',
              borderRadius: type === MEDIA.artist ? 20 : 0,
            }}
            source={
              albumImageUrl
                ? {uri: albumImageUrl}
                : require('../assets/images/image-placeholder.png')
            }
          />
        </View>
        <View>
          <Text style={{color: '#fff'}}>{name}</Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{color: COLORS.lightGray, ...FONTS.body}}>
              {type === MEDIA.track ? 'song' : type}
            </Text>
            {type !== MEDIA.artist && type !== MEDIA.playlist && (
              <>
                <BulletDot />
                <Text style={{color: COLORS.lightGray, ...FONTS.body}}>
                  {artists.map(artist => artist.name).join(', ')}
                </Text>
              </>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SearchItem;
