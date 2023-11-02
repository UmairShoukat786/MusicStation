/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet, Image, Alert, ImageBackground } from 'react-native';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-crop-picker';
import database from '@react-native-firebase/database';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';

const Signup = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profileImage, setProfileImage] = useState(null);

  const pickImage = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: false,
      });
      setProfileImage(image);
    } catch (error) {
      console.error('ImagePicker Error:', error);
    }
  };

  const handleSignup = async () => {
    if (!name || !email || !password || !profileImage) {
      Alert.alert('All fields are required');
      return;
    }

    try {
      // Create a new user with email and password
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;

      // Upload the profile image to Firebase Storage
      const imageUri = profileImage.path;
      const fileName = `${user.uid}_profile.jpg`;
      const reference = storage().ref(`profileImages/${fileName}`);
      await reference.putFile(imageUri);

      // Get the download URL of the uploaded image
      const imageUrl = await reference.getDownloadURL();

      // Update the user's profile with the name and photo URL
      await user.updateProfile({
        displayName: name,
        photoURL: imageUrl,
      });

      // Store the user's name and email in the Firebase Realtime Database
      await database().ref(`users/${user.uid}`).set({
        name: name,
        email: email,
        imageUrl: imageUrl,
      });

      // Navigate to the login screen
      navigation.navigate('Login');

    } catch (error) {
      console.error('Signup Error:', error);
      Alert.alert('Signup Error', 'An error occurred during signup.');
    }
  };


  return (
    <ImageBackground
   source={require('../assets/images/signup.webp')}
      style={styles.container}
    >
      <View style={styles.signupTextContainer}>
        <Text style={styles.signupText}>Sign Up</Text>
      </View>
      <View style={styles.signupForm}>
        <View style={styles.inputContainer}>
          <Icon name="user" size={20}  style={styles.icon} />
          <TextInput
            placeholder="Name"
            value={name}
            onChangeText={(text) => setName(text)}
            style={styles.input}
            KeyboardAvoidingView= {true}
            placeholderTextColor="gray" 
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon name="envelope" size={20}  style={styles.icon} />
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={styles.input}
            placeholderTextColor="gray" 
            KeyboardAvoidingView= {true}
            keyboardType='email-address'
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon name="lock" size={20}  style={styles.icon} />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
            style={styles.input}
            placeholderTextColor="gray" 
            KeyboardAvoidingView= {true}
          />
        </View>

        {profileImage && (
          <Image source={{ uri: profileImage.path }} style={styles.profileImage} />
        )}
        <TouchableOpacity style={styles.signupButton} onPress={pickImage}>
          <Text style={styles.buttonText}>PickImage</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signupButton} onPress={()=>navigation.navigate('Login')}>
          <Text style={styles.buttonText}>Go to Login</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  signupTextContainer: {
    flex: 4
  },
  signupForm: {
    flex: 6,
    padding: 10,
  },
  signupText: {
    fontSize: 30,
    color: 'gray',
    fontWeight: 'bold',
    paddingHorizontal:135,
    marginTop:170,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
    paddingLeft:10,
    backgroundColor:'rgba(62,62,62,0.8)',
    borderRadius:20

  },
  icon: {
    marginRight: 10,
    color:"gray"
  },
  input: {
    flex: 1,
    color: 'gray',
    fontSize: 18,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 100,
    marginTop: 5,
    marginLeft: 140,

  },
  signupButton: {
    marginTop: 10,
    marginLeft:90,
    backgroundColor: 'rgba(62,62,62,1)',
    padding: 5,
    borderRadius: 5,
    borderRadius:20,
    width:160,
    borderWidth: 1,
    borderColor: 'black',
    },
  buttonText: {
    color: 'gray',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Signup;
