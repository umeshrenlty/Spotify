import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
const Profile = () => {
  const clearAsyncStorage = async () => {
    AsyncStorage.clear();
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => clearAsyncStorage()}
        style={styles.button}>
        <Text style={styles.textStyle}>Log Out</Text>
      </TouchableOpacity>
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
  textStyle: {
    color: 'black',
    justifyContent: 'center',
    alignSelf: 'center',
    fontSize: 20,
    padding: 15,
    fontWeight: 'bold',
  },
  button: {
    width: '100%',

    height: 60,
    backgroundColor: 'yellow',
    borderRadius: 40,
  },
});
