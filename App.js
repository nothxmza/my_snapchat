import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './pages/Login';
import Inscription from './pages/Inscription';
import Route from './pages/Route';
import React from 'react';
import * as SplashScreen from 'expo-splash-screen';

const Stack = createStackNavigator();

export default function App() {
  React.useEffect(() => {
    SplashScreen.preventAutoHideAsync().catch(() => {
     
    });

    setTimeout(() => {
      SplashScreen.hideAsync().catch(() => {
      });
    }, 5000); 
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Route />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
