import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {COLORS, FONTS, SIZES, icons} from '../constants';
import {useSelector} from 'react-redux';

const Header = () => {
  const user = useSelector(state => state.setUserData.userProfileData);

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Image style={styles.img} source={icons.spotifyLogoWhite} />
        <Text style={styles.text}>Good Morning {user.display_name}</Text>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    paddingTop: SIZES.paddingTop,
    paddingBottom: 30,
    paddingHorizontal: SIZES.padding,
  },
  box: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  img: {
    height: 25,
    width: 25,
    marginRight: SIZES.padding,
  },

  text: {
    color: COLORS.white,
    ...FONTS.greeting,
  },
});
