import React, { useState } from 'react';
import { Text, View, TextInput, Alert, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import your desired icon library

const ForgetPassword = ({ navigation }) => {
  const [email, setEmail] = useState('');


  const handleForgotPassword = async () => {
    if (email !== '') {
      try {
        await auth().sendPasswordResetEmail(email);
        Alert.alert('Password reset email sent. Please check your email.');
        setEmail('');
        navigation.navigate("Login");

      } catch (error) {
        console.error(error);
        Alert.alert('Error sending password reset email.');
      }
    } else {
      Alert.alert('Please enter your email first in Email section to reset the password.');
    }
  };

  return (
    <ImageBackground
    source={require('../assets/images/forget.jpeg')}
      style={styles.container}
    >
      <View style={styles.signupTextContainer}>
        <Text style={styles.signupText}>Forget Password</Text>
      </View>
      <View style={styles.signupForm}>
       
        <View style={styles.inputContainer}>
          <Icon name="envelope" size={20} color="gray" style={styles.icon} />
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={styles.input}
            placeholderTextColor="gray" 
          />
        </View>
     

        <TouchableOpacity style={styles.signupButton}onPress={handleForgotPassword}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.signupButton}onPress={()=>navigation.navigate("Login")}>
          <Text style={styles.buttonText}>Back To Login</Text>
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
    paddingHorizontal:85,
    marginTop:180,
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
  

export default ForgetPassword;









