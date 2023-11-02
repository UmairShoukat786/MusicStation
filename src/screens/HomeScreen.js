import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet, Image, FlatList, Button } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import auth from '@react-native-firebase/auth';

const HomeScreen = ({ navigation }) => {
  const navigateToMusic = (screenName) => {
    navigation.navigate(screenName);
  };

  const musicCategories = [
    {
      id: '1',
      title: 'English songs',
      image: require('../assets/images/english.jpeg'),
      discription: 'Music is the art form that combines rhythm and sound to form a functional melodic line. Music itself transcends time, space, and cultures. Music can carry a mood without speaking any specific words. It can also be captured and recorded in a written universal language unique unto any other art form.',
      screenName: 'EnglishMusic',
    },
    {
      id: '2',
      title: 'Pakistan songs',
      image: require('../assets/images/pakistan.webp'),
      screenName: 'UrduMusic',
      discription: 'Music of Pakistan includes diverse elements, ranging from various parts of South Asia as well as Central Asian, Middle Eastern, and modern-day Western popular music influences. With these multiple influences, a distinctive Pakistani sound has emerged',
    },
    {
      id: '3',
      title: 'Pop songs',
      image: require('../assets/images/popiii.jpeg'),
      screenName: 'PopMusic',
      discription: 'One of the biggest musical benefits of pop music is the rhythmic element – especially syncopation. These kind of rhythms are found throughout pop music, and are something students and teachers sometimes shy away from, thinking they are too complicated for those just starting out.',
    },
    {
      id: '4',
      title: 'Desi songs',
      discription: 'gdjshjsjdshjhhghggjhfjh',
      image: require('../assets/images/desiii.jpeg'),
      discription: 'Classical Indian music is a genre of South Asian music, the other being film, various varieties of pop, regional folk, religious and devotional music. In Indian classical music, the raga and the tala are two foundational elements. The raga forms the fabric of a melodic structure, and the tala keeps the time cycle.',
      screenName: 'DesiMusic',
    },
    {
      id: '5',
      title: 'Bollywood songs',
      discription: 'music is an intrinsic part of gatherings, festivals, and belief systems. Sound and rhythm patterns give a particular perspective into an individuals opinions of the culture, subcultures and social issues of the times.',
      image: require('../assets/images/bol.jpeg'),
      screenName: 'BollywoodMusic',
    },
  ]

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigateToMusic(item.screenName)}
      style={styles.card}
    >
      <Image source={item.image} style={styles.image} />
      <View style={{ display: 'flex', flexDirection: 'column', height: '100%', alignItems: 'center' }}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.heading}>{item.discription}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <LinearGradient colors={['rgba(0, 0, 0, 0.7)', 'rgba(0, 0, 0, 0.7)']} style={styles.background}>
        <Text style={styles.heading}>HomeScreen</Text>
        <FlatList
          horizontal={true}
          data={musicCategories}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  heading: {
    fontSize: 24,
    color: 'white',
    marginBottom: 20,
  },
  card: {
    height: 'auto',
    backgroundColor: 'black',
    borderRadius: 10,
    padding: 10,
    margin: 10,
    width: 340,
    alignItems: 'center',
  },
  image: {
    width: "90%",
    height: 400,
    marginBottom: 10,
  },
  title: { fontSize: 16, fontWeight: 'bold', color: '#EFE1CE', margin: 5 },
  heading: { fontSize: 17, fontWeight: 'bold', color: '#EFE1CE' }
});

export default HomeScreen;
