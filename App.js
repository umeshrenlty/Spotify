import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {
  requestRefreshedAccessToken,
  setRefreshToken,
} from './Redux/actions/action';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createStackNavigator} from '@react-navigation/stack';
import {useSelector, useDispatch} from 'react-redux';
import Authorize from './screens/Authorize';
import TrackPlayer from './screens/TrackPlayer';
import HomeTabs from './Navigation/HomeTab';

const Stack = createStackNavigator();
const App = () => {
  const auth = useSelector(state => state.TokenReducer);
  console.log(auth, 'authDetails');
  const dispatch = useDispatch();
  const tryLogin = async () => {
    const authData = await AsyncStorage.getItem('authData');
    if (!authData) {
      return;
    }
    const {accessToken, refreshToken, accessTokenExpirationDate} =
      await JSON.parse(authData);
    console.log(accessTokenExpirationDate);
    console.log(new Date());
    if (
      new Date(accessTokenExpirationDate) <= new Date() ||
      !accessToken ||
      !refreshToken
    ) {
      // dispatch(requestRefreshedAccessToken(refreshToken));
      return;
    }
    dispatch(
      setRefreshToken({accessToken, refreshToken, accessTokenExpirationDate}),
    );
  };
  useEffect(() => {
    tryLogin();
  }, []);

  // if (auth?.isLoading) {
  //   return (
  //     <SafeAreaView style={styles.container}>
  //       <ActivityIndicator size="large" color="#bbb" />
  //     </SafeAreaView>
  //   );
  // }
  return (
    <>
      <StatusBar
        translucent={true}
        animated={true}
        backgroundColor={'transparent'}
        barStyle={'light-content'}
      />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={() => ({
            headerShown: false,
            tabBarShowLabel: false,
          })}>
          {auth?.accessToken ? (
            <Stack.Group>
              <Stack.Screen name="HomeTabs" component={HomeTabs} />
              <Stack.Screen name="TrackPlayer" component={TrackPlayer} />
            </Stack.Group>
          ) : (
            <Stack.Screen name="Authorize" component={Authorize} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#112',
  },
});
