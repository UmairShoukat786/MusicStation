import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, Alert, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import auth from '@react-native-firebase/auth';
import { StackActions } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import your desired icon library
import LinearGradient from 'react-native-linear-gradient';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const userLogin = async () => {
    if (email && password) {
      try {
        const user = await auth().signInWithEmailAndPassword(email, password);

        console.log(user.user);
        setEmail('');
        setPassword('');
        navigation.dispatch(StackActions.replace('HomeScreen'));
      } catch (error) {
        let errorMessage = 'An error occurred during login.';

        if (error.code === 'auth/invalid-email') {
          errorMessage = 'That email address is invalid.';
        } else if (error.code === 'auth/user-not-found') {
          errorMessage = 'User not found. Please register.';
        } else if (error.code === 'auth/wrong-password') {
          errorMessage = 'Invalid password.';
        }

        console.error('Error during login:', error);
        Alert.alert(errorMessage);
      }
    } else {
      Alert.alert('Both email and password are required.');
    }
  };

  const handleForgotPassword = async () => {
    if (email !== '') {
      try {
        await auth().sendPasswordResetEmail(email);
        Alert.alert('Password reset email sent. Please check your email.');
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
    source={require('../assets/images/login.jpeg')}
      style={styles.container}
    >
      <View style={styles.signupTextContainer}>
        <Text style={styles.signupText}>Login</Text>
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
            KeyboardAvoidingView= {true}
            keyboardType='email-address'
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon name="lock" size={20} color="gray" style={styles.icon} />
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
  
        <TouchableOpacity style={styles.signupButton}onPress={userLogin}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.signupButton}onPress={()=>navigation.navigate("Signup")}>
          <Text style={styles.buttonText}>Want new account</Text>
        </TouchableOpacity>
  
        <TouchableOpacity style={styles.signupButton}onPress={()=>navigation.navigate('ForgetPassword')}>
          <Text style={styles.buttonText}>ForgotPassword</Text>
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
    paddingHorizontal:145,
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
  

export default Login;









