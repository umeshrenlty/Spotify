import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  Image,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import Slider from '@react-native-community/slider';
import {COLORS, FONTS, icons} from '../constants';
import LinearGradient from 'react-native-linear-gradient';
import TrackPlayer, {
  State,
  usePlaybackState,
  useProgress,
} from 'react-native-track-player';
import {addTracks, setupPlayer} from '../utils/service';
import {secondsToHHMMSS} from '../utils/helpers';
const Trackplay = ({route: {params}}) => {
  const PlaybackState = usePlaybackState();
  const progress = useProgress();
  const MAX_PROGRESS = 30;
  const navigation = useNavigation();

  const [isPlaying, setPlaying] = useState(true);
  const [isPlayerReady, setIsPlayerReady] = useState(false);

  useEffect(() => {
    async function setup() {
      let isSetup = await setupPlayer();
      const queue = await TrackPlayer.getQueue();
      if (isSetup && queue.length <= 0) {
        await addTracks(params);
      }
      setIsPlayerReady(isSetup);
      await TrackPlayer.play();
    }
    setup();
  }, []);

  const onSliderChange = async value => {
    await TrackPlayer.seekTo(value);
  };

  const playMusic = async PlaybackState => {
    console.log(PlaybackState);
    console.log('start');
    await TrackPlayer.reset();
    await TrackPlayer.add(params);
    if (
      PlaybackState === State.Paused ||
      PlaybackState === State.Ready ||
      PlaybackState === State.Connecting
    ) {
      await TrackPlayer.play();
      setPlaying(true);
    } else {
      await TrackPlayer.pause();
      setPlaying(false);
    }
  };

  if (!isPlayerReady) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="yellow" />
      </SafeAreaView>
    );
  }
  const goBack = async () => {
    await TrackPlayer.pause();
    navigation.goBack();
  };
  return (
    <SafeAreaView style={{backgroundColor: COLORS.black, flex: 1}}>
      <ImageBackground
        style={{height: 480, width: '100%'}}
        source={{uri: params.artwork}}>
        <View style={{flexDirection: 'row', marginTop: 20}}>
          <LinearGradient
            style={styles.upperLinearGradient}
            start={{x: 0, y: 1}}
            end={{x: 0, y: 0}}
            colors={[
              'rgba(7, 7, 7, 0.00)',
              'rgba(7, 7, 7, 0.55)',
              COLORS.black,
            ]}
          />
          <TouchableOpacity style={styles.downArrowContainer} onPress={goBack}>
            <Image
              style={{height: 22, width: 22, tintColor: COLORS.white}}
              source={icons.down_arrow}
            />
          </TouchableOpacity>
          <View style={styles.headerInfoContainer}>
            <Text style={{color: COLORS.white, marginTop: 10}}>
              PLAYING FROM {params.type.toUpperCase()}
            </Text>
            <Text style={{color: COLORS.white}}>
              in Songs` : {params.title.toUpperCase()}
            </Text>
          </View>
        </View>
        <LinearGradient
          style={styles.lowerLinearGradient}
          colors={[
            'rgba(7, 7, 7, 0.00)',
            'rgba(7, 7, 7, 0.34)',
            'rgba(7, 7, 7, 0.55)',
            COLORS.black,
          ]}
        />
      </ImageBackground>
      {/* details */}
      <View style={{paddingHorizontal: 30}}>
        <View style={styles.trackInfoContainer}>
          <Text
            style={{
              color: COLORS.white,
              textAlign: 'center',
              fontFamily: 'Poppins-Bold',
              fontSize: 18,
              letterSpacing: 2,
            }}>
            {params.title}
          </Text>
          <Text
            style={{
              color: COLORS.lightGray,
              textAlign: 'center',
              fontFamily: 'Poppins-Regular',
              fontSize: 13,
            }}>
            {params.artist}
          </Text>
        </View>
      </View>
      <View style={styles.progressBarContainer}>
        <Slider
          thumbImage={icons.circle}
          style={{width: '100%', height: 20, marginHorizontal: 10}}
          minimumValue={0}
          maximumValue={MAX_PROGRESS}
          tapToSeek={30}
          onValueChange={onSliderChange}
          value={progress.position}
          minimumTrackTintColor={'yellow'}
          maximumTrackTintColor={COLORS.lightGray2}
        />
      </View>
      <View style={styles.progressBarTimeContainer}>
        <Text style={{color: COLORS.lightGray, ...FONTS.body}}>
          {secondsToHHMMSS(progress.position)}
        </Text>
        <Text style={{color: COLORS.lightGray, ...FONTS.body}}>
          {secondsToHHMMSS(30) - progress.position}
        </Text>
      </View>

      <View style={styles.controlsContainer}>
        <TouchableOpacity activeOpacity={0.7}>
          <Image
            source={icons.shuffle}
            style={{
              height: 28,
              width: 28,
              tintColor: COLORS.white,
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7}>
          <Image
            source={icons.previous}
            style={{height: 25, width: 25, tintColor: COLORS.white}}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.playPauseContainer}
          activeOpacity={0.7}
          onPress={() => playMusic(PlaybackState)}>
          <Image
            source={isPlaying ? icons.pause : icons.play}
            style={{height: 25, width: 25, tintColor: COLORS.black}}
          />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7}>
          <Image
            source={icons.next}
            style={{height: 25, width: 25, tintColor: COLORS.white}}
          />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7}>
          <Image
            source={icons.repeat}
            style={{
              height: 25,
              width: 25,
              tintColor: COLORS.white,
            }}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Trackplay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#112',
  },
  upperLinearGradient: {
    height: 80,
    width: '100%',
    position: 'absolute',
  },
  downArrowContainer: {
    flex: 1,
    paddingLeft: 30,
    justifyContent: 'center',
  },
  headerInfoContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 30,
    marginTop: 10,
  },
  lowerLinearGradient: {
    height: 150,
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
  trackInfoContainer: {
    alignItems: 'center',
    marginBottom: 30,
    height: 90,
  },
  progressBarContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressBarTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  playPauseContainer: {
    height: 60,
    width: 60,
    backgroundColor: 'yellow',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
