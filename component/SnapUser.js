import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

const SnapUser = ({ snapData, userData, handleImageClick }) => {
  const [showImage, setShowImage] = useState(false);

  const handlePress = () => {
	console.log("snapData", snapData);
    setShowImage(!showImage);
    handleImageClick(snapData);
  };

  if (!snapData || !userData) {
    return <Text>Loading...</Text>;
  }

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.container}>
        {userData.data.profilePicture !== '' ? (
          <Image style={styles.profilePicture} source={{ uri: userData.data.profilePicture }} />
        ) : (
          <Image style={styles.profilePicture} source={require('../assets/ken.png')} />
        )}
        <Text style={styles.username}>{userData.data.username}</Text>
        <View style={styles.time}></View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#222222',
    padding: 10,
    borderRadius: 20,
    borderWidth: 1,
  },
  username: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  profilePicture: {
    width: 60,
    height: 60,
    borderWidth: 2,
    borderColor: '#111111',
    borderRadius: 50,

  },
  time: {
    width: 30,
    height: 30,
    backgroundColor: 'orange',
    position: 'absolute',
    right: 11,
    borderRadius: 50,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  snap: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'red',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
});

export default SnapUser;
