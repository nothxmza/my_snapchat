import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView, Image} from 'react-native';
import User from '../component/User';
import SnapUser from '../component/SnapUser';

export default function Discussion({ data }) {
  const [allSnaps, setAllSnaps] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);


  useEffect(() => {
      fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://mysnapchat.epidoc.eu/snap', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${data.data.data.token}`,
        },
      });

      if (response.status !== 200) {
        throw new Error('Network response was not ok');
      }

      const snapData = await response.json();
      const snaps = [];
      const users = [];

      for (const snap of snapData.data) {
        const snapUrl = `https://mysnapchat.epidoc.eu/snap/${snap._id}`;
        const snapResponse = await fetch(snapUrl, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${data.data.data.token}`,
          },
        });

        if (snapResponse.status !== 200) {
          throw new Error('Network response was not ok');
        }

        const snapDetails = await snapResponse.json();
        snaps.push(snapDetails);

        const userUrl = `https://mysnapchat.epidoc.eu/user/${snap.from}`;
        const userResponse = await fetch(userUrl, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${data.data.data.token}`,
          },
        });

        if (userResponse.status !== 200) {
          throw new Error('Network response was not ok');
        }

        const userData = await userResponse.json();
        users.push(userData);
      }

      setAllSnaps(snaps);
      setAllUsers(users);
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl.data.image);

    setTimeout(() => {
      setSelectedImage(null);
    }, imageUrl.data.duration * 1000);
  };
  const reset = () => {
    setSelectedImage(null);
  };
  return (
   
      <View style={styles.container}>
        {selectedImage ? (
          <TouchableOpacity style={styles.fullScreenImage}onPress={reset}>
          <Image style={styles.fullScreenImage} source={{ uri: selectedImage }} />
        </TouchableOpacity>
        ) : (
          <>
            <ScrollView>
              {allSnaps.map((snap, index) => (
                <SnapUser key={index} snapData={snap} userData={allUsers[index]} handleImageClick={handleImageClick} />
              ))}
            </ScrollView>
          </>
        )}
        <TouchableOpacity style={{}}onPress={fetchData}>
          <Text style={{color: 'red'}}>Refresh</Text>
        </TouchableOpacity>
      </View>
    );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
  },
  fullScreenImage: {
    flex: 1,
    resizeMode: 'contain',
  },
});
