import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image } from 'react-native';
import TrackPlayer from 'react-native-track-player';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';

TrackPlayer.updateOptions({
  stopWithApp: false,
  capabilities: [
    TrackPlayer.CAPABILITY_PLAY,
    TrackPlayer.CAPABILITY_PAUSE,
    TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
    TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
  ],
  compactCapabilities: [TrackPlayer.CAPABILITY_PLAY, TrackPlayer.CAPABILITY_PAUSE],
});

const music = [
  {
    id: '1',
    url: require('../assets/music/science-documentary-169621.mp3'),
    title: 'science-documentary',
    description: 'Wood Cutting',
    image: require('../assets/images/music.jpeg'),
  },
  {
    id: '2',
    url: require('../assets/music/background-music-for-short-funny-video-vlog-advertising-podcast-170014.mp3'),
    title: 'vlog-advertising',
    description: 'Oxford Peter',
    image: require('../assets/images/music.webp'),
  },
  {
    id: '3',
    url: require('../assets/music/cheerful-music-for-short-video-vlog-stories-advertising-funny-promos-170013.mp3'),
    title: 'cheerful-music',
    description: 'Gaberial Thomson',
    image: require('../assets/images/musics.jpeg'),
  },
  {
    id: '4',
    url: require('../assets/music/cheerful-music-for-short-video-vlog-stories-advertising-funny-promos-170013.mp3'),
    title: 'cheerful-music',
    description: 'Adam Watson',
    image: require('../assets/images/cheerful.webp'),
  },
  {
    id: '5',
    url: require('../assets/music/science-documentary-169621.mp3'),
    title: 'science-documentary',
    description: 'Mickel Clark',
    image: require('../assets/images/musicss.jpeg'),
  },
];

const BollywoodMusic = () => {
  const [isPlaying, setIsPlaying] = useState({});
  const [currentTrackIndex, setCurrentTrackIndex] = useState(-1);
  const flatListRef = useRef(null);

  useEffect(() => {
    setTrackPlayer();
    return () => TrackPlayer.destroy();
  }, []);

  const setTrackPlayer = async () => {
    try {
      await TrackPlayer.setupPlayer();
      await TrackPlayer.add(music);
    } catch (error) {
      console.log(error);
    }
  };

  const playMusic = async (index) => {
    // Stop previously playing track
    if (currentTrackIndex !== -1) {
      await TrackPlayer.pause(currentTrackIndex);
      // Clear focus from the previously playing track
      setCurrentTrackIndex(-1);
    }

    // Toggle the play state of the selected track
    const newIsPlaying = { ...isPlaying };
    newIsPlaying[index] = !isPlaying[index];

    await TrackPlayer.skip(index);
    if (newIsPlaying[index]) {
      await TrackPlayer.play();
    }

    setIsPlaying(newIsPlaying);
    setCurrentTrackIndex(index);
  };

  return (
    <LinearGradient colors={['rgba(0, 0, 0, 0.8)', 'rgba(0, 0, 0, 0.7)']} style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={music}
        renderItem={({ item, index }) => (
          <View style={[styles.card, isPlaying[index] ? styles.highlighted : null]}>
            <Image source={item.image} style={styles.image} />
            <View style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <Text style={styles.title}>song:{item.title}</Text>
              <Text style={styles.title}>Artist:{item.description}</Text>
              <TouchableOpacity onPress={() => playMusic(index)}>
              <Text style={styles.playButton}>Play</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'rgba(76, 172, 205,0.4)',
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
    marginLeft: 10,
    width: 340,
    alignItems: 'center',
    height: 'auto'
  },
  highlighted: {
    backgroundColor: '',
  },
  image: {
    width: 130,
    height: 130,
    borderRadius: 10,

  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
  },
  playButton: {
    fontSize: 16,
    fontWeight: 'bold',
    padding: 5,
    backgroundColor: 'rgb(40, 40, 40)',
    color: '#EFE1CE',
    borderRadius: 5,
    marginLeft: 10,
    marginTop: 20,
    width: 50
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#EFE1CE',
    marginLeft: 10,
    marginBottom: 5
  }
});

export default BollywoodMusic;
