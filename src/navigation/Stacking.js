/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import EnglishMusic from '../screens/EnglishMusic';
import UrduMusic from '../screens/UrduMusic';
import PopMusic from '../screens/PopMusic';
import BollywoodMusic from '../screens/BollywoodMusic';
import DesiMusic from '../screens/DesiMusic';
import ForgetPassword from '../screens/ForgetPassword';
import SplashScreen from '../screens/SplashScreen';
import auth from '@react-native-firebase/auth';
import BottomNav from '../navigation/BottomNav';
import About from '../screens/About';

const Stack = createStackNavigator();

const Stacking = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {

    const unsubscribe = auth().onAuthStateChanged((userAuth) => {

      setUser(userAuth);
    });


    return () => unsubscribe();
  }, []);
  return (

    <Stack.Navigator
      screenOptions={{
        tabBarActiveTintColor: 'gray',
        tabBarLabelStyle: {
          fontSize: 14,
        },
        tabBarStyle: {
          backgroundColor: 'gray', 
        },
      }}>
      <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
      <Stack.Screen name="ForgetPassword" component={ForgetPassword} options={{ headerShown: false }} />
      <Stack.Screen name="HomeScreen" component={BottomNav} options={{ headerShown: false }} />
      <Stack.Screen name="Profile" component={BottomNav}  options={{ headerShown: false }}  />
      <Stack.Screen name="Bottomnav" component={BottomNav} />
      <Stack.Screen name="About" component={About} />
      <Stack.Screen name="EnglishMusic" component={EnglishMusic} />
      <Stack.Screen name="UrduMusic" component={UrduMusic} />
      <Stack.Screen name="PopMusic" component={PopMusic} />
      <Stack.Screen name="BollywoodMusic" component={BollywoodMusic} />
      <Stack.Screen name="DesiMusic" component={DesiMusic} />

    </Stack.Navigator>
  );
};
export default Stacking;
