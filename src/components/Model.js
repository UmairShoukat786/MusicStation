import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const CustomModal = ({ isVisible, toggleModal, onhandleUploadAudio }) => {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [artwork, setArtwork] = useState('');
  const [audioUri, setAudioUri] = useState('');

  const handleUploadAudio = () => {
    onhandleUploadAudio(title, artist, artwork, audioUri); // Pass audio details to the parent function
    toggleModal();
  };

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={toggleModal}
    >
      <View style={styles.modalContainer}>
        <Text>This is your custom audio upload modal</Text>
        <TextInput
          placeholder="Enter title"
          value={title}
          onChangeText={(text) => setTitle(text)}
          style={styles.input}
          multiline
          numberOfLines={3}
        />
        <TextInput
          placeholder="Enter Artist Name"
          value={artist}
          onChangeText={(text) => setArtist(text)}
          style={styles.input}
          multiline
          numberOfLines={3}
        />
        <TextInput
          placeholder="Enter Artwork URL"
          value={artwork}
          onChangeText={(text) => setArtwork(text)}
          style={styles.input}
          multiline
          numberOfLines={3}
        />
        <TextInput
          placeholder="Enter Audio File URL"
          value={audioUri}
          onChangeText={(text) => setAudioUri(text)}
          style={styles.input}
          multiline
          numberOfLines={3}
        />

        <TouchableOpacity onPress={handleUploadAudio}>
          <Text>Upload Audio</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleModal}>
          <Text>Close Modal</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    marginVertical: 120,
    marginHorizontal: 5,
    justifyContent: 'center',
    height: 550,
    width: 350,
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 2,
    borderRadius: 20,
    borderColor: 'black',
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

export default CustomModal;
