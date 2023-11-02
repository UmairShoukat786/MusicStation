import React, { useEffect, useState } from 'react';
import { Alert, Image, View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import auth from '@react-native-firebase/auth';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProfileStyle from '../css/ProfileStyle';

const Profile = ({ navigation, route }) => {
  const styles = ProfileStyle;
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((userAuth) => {
      setUser(userAuth);
    });

    return () => unsubscribe();
  }, []);

  const showDeleteConfirmation = () => {
    Alert.alert(
      'Confirmation',
      'Are you sure you want to delete your account?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Account deletion canceled'),
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: deleteAccount,
          style: 'destructive',
        },
      ],
      { cancelable: false }
    );
  };

  const deleteAccount = async () => {
    try {
      await auth().currentUser.delete();
      console.log('User account deleted successfully');
    } catch (error) {
      console.error('Error deleting user account:', error);
    }
  };

  const logouthandler = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
    navigation.navigate('Login');
  };

  const GradientCard = ({ title, onPress }) => {
    const titleToIcon = {
      'About us': 'information-circle',
      'Account': 'trash',
      'Logout': 'log-out',
      'Favorites': 'heart',
    };

    const iconName = titleToIcon[title] || 'help';

    return (
      <TouchableOpacity onPress={onPress} style={styles.gradientCard}>
        <LinearGradient
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
          colors={['gray','black']}
          style={styles.gradientBackground}
        >
          <Ionicons name={iconName} color={'gray'} size={30} />
          <Text style={styles.gradientCardText}>{title}</Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  const profileContainerStyle = {

    
    width: 300,
    alignItems: 'center',
    height: 'auto',
    marginTop: 10,
  };

  return (
   <ImageBackground
   source={require('../assets/images/profile.webp')}
   style={styles.container}>

    <View style={styles.header}>
        <LinearGradient
          colors={['rgba(62,62,62,0.3)','rgba(62,62,62,0.3)']}
          style={{ height: 46 }}
        >
          <Text style={styles.Text}>--------------------Profile-------------------</Text>
        </LinearGradient>
      </View>
      <View style={profileContainerStyle}>
        <LinearGradient
          colors={['rgba(62,62,62,0.3)','rgba(62,62,62,0.3)']}
          style={styles.card}
        >
          <Text style={styles.sectionTitle}>General Information</Text>
          <View style={styles.imageContainer}>
            {user && user.photoURL ? (
              <Image source={{ uri: user.photoURL }} style={styles.image} />
            ) : (
              <Image
                source={{
                  uri: 'https://images.pexels.com/photos/2990603/pexels-photo-2990603.jpeg?auto=compress&cs=tinysrgb&w=800',
                }}
                style={styles.image}
              />
            )}
          </View>

          <View style={styles.userInfoContainer}>
            <Text style={styles.userName}>{user ? user.displayName : 'Guest'}</Text>
            <Text style={styles.userEmail}>{user ? user.email : 'guest@example.com'}</Text>
            <Text style={styles.userEmail}>{user ? user.uid : 'ddff5677gggy7'}</Text>
          </View>

          <View style={styles.generalInfoContainer}>
            

            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <GradientCard
                title="Favorites"
                onPress={()=>Alert.alert('Comming Soon')}
              />
              <GradientCard
                title="Account"
                onPress={showDeleteConfirmation}
              />
            </View>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <GradientCard
                title="Logout"
                onPress={logouthandler}
              />
               <GradientCard
              title="About us"
              onPress={() => navigation.navigate('About')}
            />
            </View>
          </View>
        </LinearGradient>

      </View>
    </ImageBackground>
  );
};

export default Profile;
