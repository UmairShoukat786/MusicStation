// index.js
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

// Import your audio player service
import TrackPlayer from 'react-native-track-player';

// Register the audio player service
TrackPlayer.registerPlaybackService( () => require('./src/services'));

AppRegistry.registerComponent(appName, () => App);
