import {
  StyleSheet,
  View,
  Image,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getAlbumPlaylist, getMediaPlaylist} from '../Redux/actions/mediaAction';
import {COLORS, icons} from '../constants';
import MediaHeader from '../components/MediaHeader';
import MediaItem from '../components/MediaItem';

const Media = ({route, navigation}) => {
  const dispatch = useDispatch();
  const mediaData = useSelector(state => state.mediaData);
  const {mediaId, mediaType} = route.params;
  console.log(mediaId, mediaType);
  useEffect(() => {
    if (mediaType === 'playlist') {
      dispatch(getMediaPlaylist(mediaId));
    } else if (mediaType === 'album') {
      dispatch(getAlbumPlaylist(mediaId));
    } else if (mediaType === 'artist') {
    }
  }, [mediaId, mediaType, dispatch]);
  const {tracks} = mediaData;
  // console.log(tracks, 1122);

  console.log(mediaData, 8888888);
  const renderTracks = ({item, index}) => {
    // console.log(item, 'itemDat render Item called');
    return (
      <MediaItem
        type={mediaData.type}
        id={item.id}
        previewUrl={item.preview_url}
        explicit={item.explicit}
        trackNumber={item.track_number}
        name={item.name}
        artists={item.artists}
        durationMs={item.duration_ms}
        albumImages={item.album.images[0]}
      />
    );
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.black,
      }}>
      <StatusBar
        animated={true}
        backgroundColor="#61dafb"
        barStyle={'dark-content'}
      />
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={icons.back} style={styles.backIcon} />
        </TouchableOpacity>
        <Image />
      </View>
      {mediaData.isLoading ? (
        <ActivityIndicator size="small" color="#0000ff" />
      ) : (
        <View>
          <FlatList
            ListHeaderComponent={
              <MediaHeader
                type={mediaData.type}
                imageUrl={mediaData.images[0].url}
                title={mediaData.name}
                totalTracks={tracks.length}
                mediaDescription={mediaData.description}
                followers={mediaData.followers.total}
                releaseDate={mediaData.release_date}
              />
            }
            // ListFooterComponent={<View style={{marginBottom: 250}} />}
            data={tracks}
            renderItem={renderTracks}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default Media;

const styles = StyleSheet.create({
  backIcon: {
    width: 25,
    height: 25,
    tintColor: COLORS.white,
    marginRight: 20,
    marginLeft: 20,
    marginTop: 40,
  },
  container: {
    height: 60,
    width: '100%',
    backgroundColor: COLORS.lightGray3,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
