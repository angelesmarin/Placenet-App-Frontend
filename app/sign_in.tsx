import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
<<<<<<< HEAD
import { useRouter } from 'expo-router'
import { StyleSheet, TextInput, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import api from '../API/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
 
export default function LoginPage() {
  const router = useRouter()
  const [username, onChangeUser] = React.useState('');
  const [password, onChangePassword] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');
 
  async function handleSubmit() {
    console.log('Submitting:', username, password); // Check credentials before sending
    try {
      const response = await api.post('/users/authenticate', { username, password });
    const userId = response.data.userId;
    await AsyncStorage.setItem('userId', userId.toString()); // Save userId in AsyncStorage
    setErrorMessage('');
    router.push('/main'); // Navigate to main page
  } catch (error) {
    setErrorMessage('Invalid Credentials! Try Again.');
  }
}
  
    //event.preventDefault()
    // if (username == "lala" && password == "lala") {    //scuffed "authentication"
    //   setErrorMessage(''); //clear previous
    //   router.push('/main')
    // } else {
    //   setErrorMessage('Invalid Credentials! Try Again.');
    // }
    /*const formData = new FormData(event.currentTarget)
    const email = formData.get('email')
    const password = formData.get('password')
 
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
 
    if (response.ok) {
      router.push('/main')
    } else {
      // Handle errors
    }*/

      //TODO: Actual auth implementation, commented code is for that exact purpose, pls dont touch <3
  
 
  return (
    <SafeAreaProvider>
          <SafeAreaView
            style={styles.container}>
            <TextInput
              style={styles.input}
              onChangeText={onChangeUser}
              value={username}
              placeholder='Username' //placeholder
            />
            <TextInput
              style={styles.input}
              onChangeText={onChangePassword}
              value={password}
              placeholder='Password' //placeholder
            />

            {errorMessage ? ( <Text style={styles.errorText}>{errorMessage}</Text> ) : null}

            <TouchableOpacity 
            style={styles.button} 
            onPress={handleSubmit}>
          <Text 
          style={styles.buttonText}
          >Log In</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </SafeAreaProvider>
      );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#25292e',
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  input: {
    backgroundColor: '#5a5a5a',
    borderColor: '#ffffff',
    borderRadius: 15,
    height: 40,
    width: '100%',
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  errorText: {
    color: 'red',
    textAlign: 'center'
  },
  button: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    height: 40,
    width: '30%',
    margin: 12,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  buttonText: {
    fontSize: 18,
    textAlign: 'center',
  },
});
=======
import { useRouter } from 'expo-router';
import { StyleSheet, TextInput, Text, TouchableOpacity, View, Image } from 'react-native';
import React from 'react';
import api from '../API/api';
import * as SecureStore from 'expo-secure-store';


/* sign in page */

export default function LoginPage() {
  const router = useRouter();
  const [username, onChangeUser] = React.useState('');
  const [password, onChangePassword] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');

  async function handleSubmit() {
    console.log('Submitting:', username, password);
    try {
      //send request to enpoint 
      const response = await api.post('/auth/login', { username, password });
      const token = response.data.token;
      const userId = response.data.userId;

      //save token & id 
      await SecureStore.setItemAsync('userToken', token);
      await SecureStore.setItemAsync('userId', String(userId));

      setErrorMessage('');//clear prev mgs
      router.push('/main'); //go to main
    } catch (error) {
      setErrorMessage('Invalid Credentials! Try Again.');
    }
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Image
          source={require('../assets/placenet.png')} 
          style={styles.logo}
        />
        <Text style={styles.titleText}>Welcome Back!</Text>
        <Text style={styles.subtitleText}>Sign in your account</Text>

        {/* Username Input */}
        <TextInput
          style={styles.input}
          onChangeText={onChangeUser}
          value={username}
          placeholder="Username"
          placeholderTextColor="#A9A9A9"
        />

        {/* Password Input */}
        <TextInput
          style={styles.input}
          onChangeText={onChangePassword}
          value={password}
          placeholder="Password"
          placeholderTextColor="#A9A9A9"
          //secureTextEntry
        />

        {/* Error Message */}
        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

        {/* Log In Button */}
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>

        {/* Sign Up Link */}
        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Don't have an account?</Text>
          <Text
            style={styles.signupLink}
            onPress={() => router.push('/sign_up')} 
          >
            Sign Up
          </Text>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}









const styles = StyleSheet.create({
  container: {
    backgroundColor:'#ffffff',
    flex: 1,
    justifyContent:'center',
    alignItems:'center',
    padding: 15,
  },
  logo: {
    width: 200,
    height: 110,
    marginBottom: 20,
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
  },
  subtitleText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  input: {
    backgroundColor: '#F0F0F0',
    borderColor: '#C0C0C0',
    borderRadius: 5,
    height: 50,
    width: '80%',
    margin: 12,
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#000',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#404040ff',
    borderRadius: 5,
    height: 50,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    textAlign: 'center',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  signupText: {
    color: '#A9A9A9',
    fontSize: 14,
  },
  signupLink: {
    color: '#0000FF',
    fontSize: 14,
    marginLeft: 5,
    textDecorationLine: 'underline',
  },
});
>>>>>>> ad498fc6717d5068c1cb5ca6a9327a6d9e4d6145
