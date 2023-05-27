import React from 'react';
import {View, StyleSheet} from 'react-native';
import TextButton from '../components/TextButton';

import {COLORS} from '../constants';
import {useDispatch} from 'react-redux';
import {authenticateUser} from '../Redux/actions/action';
const Authorize = () => {
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <TextButton
        onPress={() => dispatch(authenticateUser())}
        label="LOG IN TO SPOTIFY"
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.black,
  },
});

export default Authorize;
