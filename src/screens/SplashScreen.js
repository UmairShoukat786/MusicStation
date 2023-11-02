import { Text, View, StyleSheet,ImageBackground } from 'react-native';
import React, { useEffect,useState } from 'react';
import auth from '@react-native-firebase/auth';
import { StackActions } from '@react-navigation/native';

const SplashScreen = ({ navigation }) => {
  const [textColor, setTextColor] = useState('#8D9440');
  const colors = [ '#8D9440', '#8D9440'];
  let colorIndex = 0;

  useEffect(() => {
    const colorChangeInterval = setInterval(() => {
      const nextColor = colors[colorIndex];
      setTextColor(nextColor);

      // Increment the color index and loop back to 0 when it reaches the end of the colors array
      colorIndex = (colorIndex + 1) % colors.length;
    }, 1000);

    return () => clearInterval(colorChangeInterval);
  }, []);

  useEffect(() => {

    setTimeout(() => {
      auth().onAuthStateChanged((user) => {
        const routetime = user !== null ? 'HomeScreen' : 'Login';
        navigation.dispatch(
          StackActions.replace(routetime)
        );
      }
      );
    }, 3000);

  }, []);



  return (
    <ImageBackground
    source={require('../assets/images/splashscreen.webp')}
      style={styles.backgroundImage}
    >
      <View style={{ height: 'auto', width: 250, marginTop: 380, marginHorizontal: 47 }}>
  <Text style={{ fontSize: 17, fontWeight: 'bold', color: textColor }}>MusicStation</Text>
        </View>
    </ImageBackground>
  );
  
};

export default SplashScreen;
const styles = StyleSheet.create({

  backgroundImage: {
    flex: 1,
    
  },
})