import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './Login';
import Inscription from './Inscription';
import Profil from './Profil';
import BottomNav from './BottomNav';
import Snap from './Snap';

const Stack = createStackNavigator();

export default function Route() {
  return (
    <NavigationContainer>
        <View style={styles.container}>
          <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
            <Stack.Screen name="Inscription" component={Inscription} options={{ headerShown: false }}/>
			      <Stack.Screen name="BottomNav" component={BottomNav} options={{ headerShown: false }} />
          </Stack.Navigator>
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});