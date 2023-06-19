import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Discussion from './Discussion';
import Snap from './Snap';
import Profil from './Profil';
import { useRoute } from '@react-navigation/native';
import MonIcone from '../assets/pum.png';



const Tab = createBottomTabNavigator();

export default function BottomNav({ route }){
    const data = route.params;
    return (
        <Tab.Navigator style={styles.tinyLogo} screenOptions={{
            //tabBarShowLabel: false,
            size:40,
            tabBarLabelPosition:'below-icon',
            tabBarStyle: {backgroundColor:'#000000',
            height: 80,
            alignContent: 'center',
            alignItems : 'center',
            justifyContent: 'center',
            paddingTop: 1,
            borderTopWidth: 1,
            borderTopColor: '#ffbb2d',
            },
            indicatorStyle: {
                borderWidth: 10,
                borderColor: '#ffbb2d',
            },
            style: {
                borderTopColor:'#ffbb2d',
            },
            tabBarActiveTintColor: '#ffbb2d',
            tabBarInactiveTinColor: '#9999FF',
        }}>
        <Tab.Screen
            name="D I S C U S S I O N"
            options={{
                headerStyle: {
                    borderWidth: 1,
                    borderBottomColor: '#ffbb2d',
                    backgroundColor: '#000000',
                  },
                  headerTintColor: '#ffbb2d',
                  headerTitleStyle: {
                    fontWeight: 'bold',
                  },
                //headerShown: false, pour effacer le profil en haut
                tabBarIcon: ({ color, size }) => (
                <Ionicons name="chatbubble-outline" color={color} size={size} />
                ),
            }}>
            {() => <Discussion data={data} />}
        </Tab.Screen>
        <Tab.Screen
            name="S N A P"
            options={{
                headerShown: false,
                tabBarIcon: ({ color, size }) => (
                <Ionicons name="camera-outline" color={color} size={size} />
                ),
            }}>
            {() => <Snap data={data} />}
        </Tab.Screen>
            <Tab.Screen
            name="P R O F I L"
            options={{
                headerStyle: {
                    borderWidth: 1,
                    borderBottomColor: '#ffbb2d',
                    backgroundColor: '#000000',
                  },
                  headerTintColor: '#ffbb2d',
                  headerTitleStyle: {
                    fontWeight: 'bold',
                  },
                //headerShown: false, pour effacer le profil en haut
                tabBarIcon: ({ color, size }) => (
                <Image source={MonIcone} style={{ width: size, height: size, tintColor: color }} />
                ),
            }}>
            {() => <Profil data={data} />}
            </Tab.Screen>
        </Tab.Navigator>
    );
}
 


const styles = StyleSheet.create({
	tinyLogo: {
	 height:50,
	 
	},
	container: {
	  paddingTop: 50,
	},
	
  });