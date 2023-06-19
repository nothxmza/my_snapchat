import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View, TextInput, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BottomNav from './BottomNav';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Gif } from 'react-native-gif';
import MonLogo from '../assets/pump.png';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleInscriptionPress = () => {
    navigation.navigate('Inscription');
  };

  const handleSubmit = () => {
    const url = 'https://mysnapchat.epidoc.eu/user';
    fetch(url, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then(response => {
        console.log(response.status);
        if (response.status !== 200) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        //ici
        navigation.reset({
          index: 0,
          routes: [{ name: 'BottomNav', params: { screen: 'Profil' }, params: { data: data } }],
        });
        //navigation.navigate('BottomNav');
        //a envoyer vers la page de la personne qui vient de se connecter
      })
      .catch(error => {
        console.error('An error occurred:', error);
      });
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
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholderTextColor="gray"
          placeholder="Email"
        />
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholderTextColor="gray"
          placeholder="Mot de passe"
          secureTextEntry={true}
        />
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Connexion</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={handleInscriptionPress}>
        <Text style={styles.signupText}>Inscription !</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
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
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: '#fff',
    borderWidth: 1,
    marginVertical: 10,
    borderRadius: 5,
    padding: 10,
    color: 'white'
  },
  button: {
    backgroundColor: '#ff9900',
    width: '100%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  signupText: {
    color: '#ff9900',
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
