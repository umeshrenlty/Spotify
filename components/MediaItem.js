import React, {useEffect} from 'react';
import {View, Image, Text, StyleSheet, Alert} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {COLORS, SIZES, FONTS, icons, MEDIA} from '../constants';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import TrackPlayer from 'react-native-track-player';
import {secondsToHHMMSS} from '../utils/helpers';

export const trimText = (text, maxLength) => {
  return text.length > maxLength
    ? text.substring(0, maxLength) + '...'
    : text.trim();
};

const MediaItem = ({
  index,
  id,
  previewUrl,
  name,
  albumImages,
  albumName,
  artists,
  durationMs,
  explicit,
  trackNumber,
  type,
  onPress,
}) => {
  const artistsNames = artists.map(artist => artist.name).join(', ');

  const navigation = useNavigation();
  const media = useSelector(state => state.mediaData);
  // const dispatch = useDispatch();
  const secondsFromsMs = durationMs / 1000;

  const selectedTrack = {
    id,
    url: previewUrl,
    title: name,
    artist: artistsNames,
    artwork: albumImages.url ? albumImages.url : media.images[0].url,
    type,
  };

  const onMediaItemHandler = async () => {
    navigation.navigate('TrackPlayer', selectedTrack);
    // TrackPlayer.play();
    // Alert.alert('hello ji');
  };
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onMediaItemHandler}>
      <View style={styles.container}>
        <Image source={{uri: albumImages.url}} style={styles.albumImage} />
        <View>
          <Text style={styles.songName}>{name && trimText(name, 30)}</Text>
          {artists && (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              {explicit ? (
                <View style={{marginRight: 5}}>
                  <Image style={styles.artistImage} source={icons.explicit} />
                </View>
              ) : null}
              <Text
                style={{
                  color: COLORS.lightGray,
                  fontFamily: 'Poppins-Regular',
                  fontSize: 12,
                }}>
                {trimText(artistsNames, 30)}
              </Text>
            </View>
          )}
        </View>
        <View style={{flex: 2, alignItems: 'flex-end'}}>
          {durationMs > 0 && (
            <Text style={{color: COLORS.lightGray, ...FONTS.body}}>
              {secondsToHHMMSS(secondsFromsMs).slice(1)}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  albumImage: {
    width: 40,
    height: 40,
    borderRadius: 50,
    marginRight: 20,
  },
  songName: {
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
  },
  artistImage: {
    height: 13,
    width: 13,
    tintColor: COLORS.lightGray,
  },
});

export default MediaItem;
