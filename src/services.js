// service.js
import TrackPlayer from 'react-native-track-player';


// Define your audio player service
module.exports = async function() {
  TrackPlayer.addEventListener('remote-play', () => 
    play());

  TrackPlayer.addEventListener('remote-pause', () =>
    pause());
};
