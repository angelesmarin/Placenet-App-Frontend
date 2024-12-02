<<<<<<< HEAD
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';

/* 
  WELCOME SCREEN 
*/

export default function Index() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Image
      source={require('../assets/file.png')}
      style={styles.logo}
      />
      <Text style={styles.text}>Welcome to Placenet</Text>

      <TouchableOpacity
      style={styles.button}
      onPress={() => router.push('/sign_in')} //when clicked, go to 'main menu' 
      >
        <Text style={styles.buttonText}>Click to Enter</Text>
</TouchableOpacity> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width:100,
    height:100,
    marginBottom:20,
  },
  text: {
    color: '#fff',
    fontSize: 27,
    marginBottom:20,
  },

  button: {
    backgroundColor: '#5a5a5a',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
    alignItems: 'center',
    borderWidth: 3, 
    
=======
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import React from 'react';

export default function IndexPage() {
  const router = useRouter();

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        {/* Logo */}
        <Image
          source={require('../assets/placenet.png')}
          style={styles.logo}
        />

        {/* App Title */}
        <Text style={styles.titleText}>Welcome to Placenet!</Text>
        <Text style={styles.subtitleText}>For property and community care</Text>

        {/* Sign In Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/sign_in')}
        >
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>

        {/* Sign Up Button */}
        <TouchableOpacity
          style={styles.buttonOutline}
          onPress={() => router.push('/sign_up')}
        >
          <Text style={styles.buttonOutlineText}>Sign Up</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}







//need to move this///

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  logo: {
    width: 200,
    height: 110,
    marginBottom: 20,
  },
  titleText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
    textAlign: 'center',
  },
  subtitleText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 40,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#404040ff',
    borderRadius: 5,
    height: 50,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
>>>>>>> ad498fc6717d5068c1cb5ca6a9327a6d9e4d6145
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
<<<<<<< HEAD
=======
    textAlign: 'center',
  },
  buttonOutline: {
    borderColor: '#404040ff',
    borderWidth: 1,
    borderRadius: 5,
    height: 50,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonOutlineText: {
    color: '#404040ff',
    fontSize: 18,
    textAlign: 'center',
>>>>>>> ad498fc6717d5068c1cb5ca6a9327a6d9e4d6145
  },
});
