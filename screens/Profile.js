import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Profile = () => {
  const clearAsyncStorage = async () => {
    AsyncStorage.clear();
  };
  return (
    <View style={styles.container}>
      <Text
        onPress={() => clearAsyncStorage()}
        style={{fontSize: 25, color: '#fff'}}>
        Profile
      </Text>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#112',
  },
});
