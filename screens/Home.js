import {StyleSheet, View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {SIZES} from '../constants';

import Header from '../components/Header';
import {useDispatch, useSelector} from 'react-redux';
import {
  getUserPlaylists,
  getUserProfile,
  getUserRecentlyPlaylists,
} from '../Redux/actions/action';
import HorizontalCardContainer from '../components/HorizontalCardContainer';
import getCategory from '../Redux/actions/BrowseActions';
const Home = ({navigation}) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.setUserData);
  console.log(user, 1100);

  useEffect(() => {
    dispatch(getUserPlaylists());
    dispatch(getUserProfile());
    dispatch(getUserRecentlyPlaylists());
    dispatch(getCategory());
  }, []);

  return (
    <View style={styles.container}>
      <Header />
      <HorizontalCardContainer
        label="MY PLAYLISTS"
        cardItemImageStyle={{opacity: 0.6}}
        cardItemTextStyle={styles.playlistTextStyle}
        data={user.userPlayLists}
      />
      <HorizontalCardContainer
        label="RECENTLY PLAYED"
        data={user.userRecentlyPlayed}
      />
    </View>
  );
};

export default Home;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: SIZES.paddingTop,
    backgroundColor: '#464d47',
    width: '100%',
  },
});
