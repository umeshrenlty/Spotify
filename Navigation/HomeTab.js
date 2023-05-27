import React from 'react';
import {View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Search from '../screens/Search';

import Home from '../screens/Home';
import Media from '../screens/Media';
import Library from '../screens/Library';
import Authorize from '../screens/Authorize';
import Profile from '../screens/Profile';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import TrackPlay from '../screens/TrackPlayer';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator screenOptions={() => ({headerShown: false})}>
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Media" component={Media} />
    </Stack.Navigator>
  );
};

const LibraryStack = () => {
  return (
    <Stack.Navigator screenOptions={() => ({headerShown: false})}>
      <Stack.Screen name="Library" component={Library} />
      <Stack.Screen name="Media" component={Media} />
    </Stack.Navigator>
  );
};
const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={() => ({headerShown: false})}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Media" component={Media} />
      {/* <Stack.Screen name="TrackPlay" component={TrackPlay} /> */}
    </Stack.Navigator>
  );
};
const SearchStack = () => {
  return (
    <Stack.Navigator screenOptions={() => ({headerShown: false})}>
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="Media" component={Media} />
    </Stack.Navigator>
  );
};

const HomeTabs = ({navigation}) => {
  console.log(navigation, 'home');
  return (
    <View style={{flex: 1, width: '100%', backgroundColor: '#fff'}}>
      <Tab.Navigator
        screenOptions={({route}) => ({
          headerShown: false,
          tabBarShowLabel: false,

          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {
            position: 'absolute',
            marginBottom: 10,
            paddingBottom: 0,
            backgroundColor: 'black',
            marginHorizontal: 12,
            borderRadius: 100,
            height: 80,
            borderTopColor: 'black',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 3,
            },
            shadowOpacity: 0.29,
            shadowRadius: 4.65,
            elevation: 9,
          },
        })}>
        <Tab.Screen
          name="HomeStack"
          component={HomeStack}
          options={{
            tabBarIcon: tabBarInfo => {
              return (
                <Entypo
                  name="home"
                  size={35}
                  color={tabBarInfo.focused ? '#006600' : '#8e8e93'}
                />
              );
            },
          }}
        />
        <Tab.Screen
          name="SearchStack"
          component={SearchStack}
          options={{
            tabBarIcon: tabBarInfo => {
              return (
                <AntDesign
                  name="search1"
                  size={35}
                  color={tabBarInfo.focused ? '#006600' : '#8e8e93'}
                />
              );
            },
          }}
        />
        <Tab.Screen
          name="LibraryStack"
          component={LibraryStack}
          options={{
            tabBarIcon: tabBarInfo => {
              return (
                <Ionicons
                  name="library"
                  size={35}
                  color={tabBarInfo.focused ? '#006600' : '#8e8e93'}
                />
              );
            },
          }}
        />
        <Tab.Screen
          name="ProfileStack"
          component={ProfileStack}
          options={{
            tabBarIcon: tabBarInfo => {
              return (
                <FontAwesome5
                  name="spotify"
                  size={35}
                  color={tabBarInfo.focused ? '#006600' : '#8e8e93'}
                />
              );
            },
          }}
        />
      </Tab.Navigator>
    </View>
  );
};

export default HomeTabs;
