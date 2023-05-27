import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import {COLORS, FONTS, SIZES} from '../constants';

import BulletDot from './BulletDot';

const MediaHeader = ({
  imageUrl,
  title,
  totalTracks,
  followers,

  releaseDate = '',
  mediaDescription = '',
  type,
}) => {
  return (
    <View style={styles.containerView}>
      <Image
        resizeMode="cover"
        source={{uri: imageUrl}}
        style={[styles.image]}
      />
      <LinearGradient
        style={styles.linearGradient}
        colors={[
          'rgba(7, 7, 7, 0.00)',
          'rgba(7, 7, 7, 0.34)',
          'rgba(7, 7, 7, 0.55)',
          COLORS.black,
          COLORS.black,
          COLORS.black,
        ]}
      />

      <Text style={styles.textTitle}>{title}</Text>
      <View style={styles.infoContainer}>
        <Text style={{color: COLORS.lightGray, ...FONTS.body}}>
          {type.toUpperCase()}
        </Text>
        {releaseDate.length > 0 && (
          <>
            <BulletDot />
            <Text style={{color: COLORS.lightGray, ...FONTS.body}}>
              {releaseDate.substring(0, 4)}
            </Text>
          </>
        )}
        <BulletDot />
        <Text style={{color: COLORS.lightGray, ...FONTS.body}}>
          {totalTracks} songs
        </Text>
        {followers > 0 && (
          <>
            <BulletDot />
            <Text style={{color: COLORS.lightGray, ...FONTS.body}}>
              {Number(followers.toFixed(2)).toLocaleString('en-US')} followers
            </Text>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerView: {
    alignItems: 'center',
    height: 520,
  },
  image: {
    height: '100%',
    width: '100%',
  },
  linearGradient: {
    position: 'absolute',
    height: 280,
    width: '100%',
    bottom: 0,
  },
  textTitle: {
    textAlign: 'center',
    position: 'relative',
    bottom: 120,
    color: COLORS.white,
    paddingBottom: 15,
    paddingHorizontal: 15,
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    letterSpacing: 2,
  },
  infoContainer: {
    position: 'relative',
    bottom: 130,
    marginRight: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MediaHeader;
