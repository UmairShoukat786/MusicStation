import React from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const About = () => {

    return (
        <ImageBackground
            source={require('../assets/images/aboutii.jpeg')}
            style={styles.backgroundImage}
        >
            <View style={styles.main}>
                <View style={styles.aboutii}>
                    <Text style={{ fontSize: 30, fontWeight: 'bold',color:'gray' }}>About us</Text>
                </View>
                <LinearGradient
                    colors={['rgba(62,62,62,0.7)', 'rgba(62,62,62,0.7)']}
                    style={styles.about}
                >
                    <Text style={styles.Text}>
                    "Step into the world of rhythm and harmony with our music app, your ultimate destination for all things music. Dive into a vast library of tunes, from chart-topping hits to hidden gems waiting to be uncovered. Our intuitive interface makes it easy to search, explore, and curate your personal playlists, tailored to your unique taste. Want to stay updated with the latest releases and music trends? Our app keeps you in the loop. With features like offline listening and high-definition audio, you can enjoy your favorite tracks without interruption. Sing along with lyrics that sync seamlessly, or let our recommendations introduce you to new sounds. 
                    Our app provides the perfect soundtrack to your life, 24/7. Join the millions of music lovers who've made us their go-to source for melodies that inspire, soothe, and energize."
                   </Text>
                </LinearGradient>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
    },

    about: {
        marginTop: 20,
        width: 330,
        alignSelf: 'center',
        height: 350,
        borderRadius: 20,
        padding: 10,
    },

    main: {
        flex: 1,
    },

    Text: {
        fontSize: 16,
        fontWeight: 'bold',
        fontStyle: 'italic',
        color: 'gray',
    },
    aboutii: {
        width: 200, alignItems: 'center', marginTop: 120, alignSelf: 'center', height: 'auto', backgroundColor: 'rgba(62,62,62,0.7)'
    }
});

export default About;
