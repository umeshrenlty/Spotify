/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import React from 'react';
import {name as appName} from './app.json';
import {playbackService} from './utils/service';
import {Provider} from 'react-redux';
import store from './store';
import TrackPlayer from 'react-native-track-player';
const ReduxProvider = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => ReduxProvider);
// AppRegistry.registerComponent(...);
TrackPlayer.registerPlaybackService(() => playbackService);
