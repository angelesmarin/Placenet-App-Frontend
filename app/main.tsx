<<<<<<< HEAD
import { View, Button, StyleSheet, TouchableOpacity, Text } from 'react-native'; // need to import on every page -> import things from react native lib
import { useRouter } from 'expo-router'; // need to import on every page -> for app routing 
import React from 'react';

/* 
  'MAIN MENU' PAGE  
*/

export default function MainMenu() { //make resuable component 
  const router = useRouter(); // use router for navigation

  return (
    <View style={styles.container}>
      {/* Custom Button */}
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => router.push('/property')}
      >
        <Text style={styles.buttonText}>Add a new Property</Text>
      </TouchableOpacity>
      

      <TouchableOpacity 
        style={styles.button} 
        onPress={() => router.push('/project')}
      >
        <Text style={styles.buttonText}>Add a New Project</Text>
      </TouchableOpacity>
      

      <TouchableOpacity 
        style={styles.button} 
        onPress={() => router.push('/document')}
      >
        <Text style={styles.buttonText}>Add an Invoice/ Receipt</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.button} 
        onPress={() => router.push('/document')}
      >
        <Text style={styles.buttonText}>Profile Summary</Text>
      </TouchableOpacity>
    </View>
  );
}
   

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#25292e',
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#5a5a5a', //
    paddingVertical: 12,        // adjust h
    paddingHorizontal: 20,      // adjust w
    borderRadius: 15,            
    marginVertical: 8,          
    width: '80%',               //adjust  
    alignItems: 'center',
    borderWidth: 3,

  },
  buttonText: {          
    fontSize: 17,
    color: '#fff',
=======
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import React from 'react';

/* Main Menu Page */
export default function MainMenu() {
  const router = useRouter();

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        Logo
        <Image source={require('../assets/placenet.png')} style={styles.logo} />

        {/* Title */}
        <Text style={styles.titleText}>Main Menu</Text>

        {/* Custom Buttons */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/property')}
        >
          <Text style={styles.buttonText}>Add a New Property</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/project')}
        >
          <Text style={styles.buttonText}>Add a New Project</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/document')}
        >
          <Text style={styles.buttonText}>Add an Invoice/Receipt</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonOutline}
          onPress={() => router.push('/property_summary')}
        >
          <Text style={styles.buttonOutlineText}>Property Summary</Text>
        </TouchableOpacity>
        

        <TouchableOpacity
          style={styles.buttonOutline}
          onPress={() => router.push('/social_sums')}
        >
          <Text style={styles.buttonOutlineText}>Community Property Summaries</Text>
        </TouchableOpacity>



      </SafeAreaView>
    </SafeAreaProvider>
  );
}




//move this
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 30,
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
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
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
