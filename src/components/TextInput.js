import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Import the icon library

const InputWithIcon = ({ iconName, placeholder, value, onChangeText }) => {
  return (
    <View style={styles.inputContainer}>
                  <Ionicons name="home" color='black' size={14} style={styles.icon} />
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        style={styles.input}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    
  },
  icon: {
    marginRight: 10,
  },
  input: {

    width: 250,
    marginTop: 10,
    height: 40,
    borderWidth: 2,
    borderRadius: 20,
    paddingLeft: 10,
  },
});

export default InputWithIcon;
