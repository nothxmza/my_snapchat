import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, TextInput, Image } from 'react-native';
import { Camera } from 'expo-camera';
import { ShareAsync } from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';
import MonLogo from '../assets/pump.png';
import { Gif } from 'react-native-gif';



export default function Inscription() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const [hasMediaPermission, setMediaHasPermission] = useState(null);
  const [uriPhoto, setUri] = useState('');

  useEffect(() => {
    (async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission not granted');
      } else {
        setMediaHasPermission('granted');
      }
    })();
  }, []);

  const handleInscriptionPress = () => {
    navigation.navigate('Login');
  };

  const handleSubmit = () => {
	let uri = 'null'
	if(uriPhoto !== '')
		uri = 'data:image/jpg;base64,' + uriPhoto;
	else
		uri = '';
    const url = 'https://mysnapchat.epidoc.eu/user';
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        username: username,
        profilePicture: uri,
        password: password,
      }),
    })
      .then(response => {
        if (response.status !== 200) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        alert(`INSCRIPTION OK \n Server response: ${JSON.stringify(data)}`);
        navigation.navigate('Login')
      })
      .catch(error => {
        console.error('An error occurred:', error);
      });
  };

  const takePicture = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission denied');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      base64: true
    });
    if (!result.canceled) {
      const selectedAsset = result.assets[0];
      setUri(selectedAsset.base64);
    }
  };

  return (
    <View style={styles.container}>
            <View style={styles.gifWrapper}>
        <Image
          source={{ uri: 'https://media.giphy.com/media/aRZ4vTsHnyW6A/giphy.gif' }}
          style={{ width: 450, height: 1000 }}
        />
      </View>
      <View>
        <Image source={MonLogo} style={styles.logo} />
      </View>
      <Text style={styles.title}>P U M C H A T</Text>
      <View style={styles.formContainer}>
        <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Email"  placeholderTextColor="gray"/>
        <TextInput style={styles.input} value={username} onChangeText={setUsername} placeholder="Username"  placeholderTextColor="gray" />
        <TextInput style={styles.input} placeholder="Profile Picture" value={uriPhoto} onChangeText={setUri}  placeholderTextColor="gray" />
        <TextInput style={styles.input} value={password} onChangeText={setPassword} placeholder="Password"  placeholderTextColor="gray" secureTextEntry={true} />
        <TouchableOpacity style={styles.button} onPress={takePicture}>
          <Text style={styles.buttonText}>Galerie</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.orangeButton} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleInscriptionPress}>
          <Text style={styles.signupText}>Login !</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
	container: {
	  justifyContent: 'center',
	  flex: 1,
	  alignItems: 'center',
	  backgroundColor: '#000', 
	},
	input: {
	  height: 40,
	  width: '100%',
	  borderColor: '#fff', 
	  borderWidth: 1,
	  marginVertical: 10,
	  borderRadius: 5,
	  padding: 10,
	  color: '#fff', 
	},
	orangePlaceholder: {
	  placeholderTextColor: '#FF8C00', 
	},
	logo: {
		marginVertical: 10,
		width: 70,
		height: 70,
	  },
	title: {
	  fontSize: 24,
	  fontWeight: 'bold',
	  marginBottom: 20,
	  color: '#FF8C00', 
	},
	formContainer: {
	  width: '80%',
	  alignItems: 'center',
	},
	button: {
	  backgroundColor: '#FF8C00', 
	  width: '100%',
	  height: 40,
	  alignItems: 'center',
	  justifyContent: 'center',
	  borderRadius: 5,
	  marginVertical: 10,
	},
	orangeButton: {
	  backgroundColor: 'orange', 
	  width: '100%',
	  height: 40,
	  alignItems: 'center',
	  justifyContent: 'center',
	  borderRadius: 5,
	  marginVertical: 10,	},
	buttonText: {
	  color: 'white', 
	  fontWeight: 'bold',
	  fontSize: 16,
	},
	orangeButtonText: {
	  color: '#000', 
	},
	signupText: {
	  color: '#FF8C00', 
	  fontSize: 16,
	  fontWeight: 'bold',
	},
  gifWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: -1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  });