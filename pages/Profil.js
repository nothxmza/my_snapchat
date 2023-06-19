import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';

export default function Profil({ data }) {
  const urit = 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fcdn.futura-sciences.com%2Fsources%2Fimages%2Fdossier%2F773%2F01-intro-773.jpg&tbnid=FI6xNsG61C-xLM&vet=12ahUKEwivlc-_vr3_AhXFh_0HHe50A4kQMygCegUIARC_AQ..i&imgrefurl=https%3A%2F%2Fwww.futura-sciences.com%2Ftech%2Fdossiers%2Ftechnologie-photo-numerique-capteur-image-773%2F&docid=RpPxxPFVAGtHaM&w=1820&h=948&q=image&client=safari&ved=2ahUKEwivlc-_vr3_AhXFh_0HHe50A4kQMygCegUIARC_AQ'

  const navigation = useNavigation();

  const handleLogout = () => {
    // Effectuer ici les actions nécessaires pour déconnecter l'utilisateur
    // Par exemple, vider le state ou supprimer le token d'authentification

    // Rediriger vers la page de connexion
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }] // Assurez-vous que 'Login' correspond à la route de votre page de connexion
    });
  };


  const handleDeleteAccount = () => {
    console.log(data.data.data.token)
    const url = 'https://mysnapchat.epidoc.eu/user';
		fetch(url, {
			method: 'DELETE',
			headers: {
				Accept: 'application/json',
				Authorization: `Bearer ${data.data.data.token}`,
			},
		})
		.then(response => {
			if (response.status !== 200) {
				throw new Error('Network response was not ok');
			}
			return response.json();
		})
		.then(data => {
			alert('COMPTE DELETE');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }]
      });
		})
		.catch(error => {
			console.error('An error occurred:', error);
		});
    
  };

  return (
    <View style={styles.container}>
      <Text style={styles.username}>{data.data.data.username}</Text>
      {data.data.data.profilePicture !== "" ? <Image style={styles.profilePicture} source={{ uri: data.data.data.profilePicture }} />
      :  <Image style={styles.profilePicture} source={require('../assets/ken.png')} />
      }
      <Text style={styles.email}>{data.data.data.email}</Text>
      <Animatable.View
        style={styles.background}
        animation="pulse"
        iterationCount="infinite"
        duration={3000}
      >
        <View style={styles.starsContainer}>
          <Animatable.View
            style={[styles.star, { top: '15%', left: '20%' }]}
            animation="fadeIn"
            duration={2000}
            iterationCount="infinite"
            delay={1000}
          />
          <Animatable.View
            style={[styles.star, { top: '50%', right: '25%' }]}
            animation="fadeIn"
            duration={2000}
            iterationCount="infinite"
            delay={1500}
          />
          {/* Ajoutez d'autres étoiles ici */}
        </View>
        <Animatable.View
          style={[styles.rectangle, { top: '35%', right: '15%' }]}
          animation="fadeIn"
          duration={2000}
          iterationCount="infinite"
          delay={1000}
        />
        <Animatable.View
          style={[styles.rectangle, { top: '70%', left: '10%' }]}
          animation="fadeIn"
          duration={2000}
          iterationCount="infinite"
          delay={1500}
        />
        {/* Ajoutez d'autres formes animées ici */}
        <Animatable.View
          style={styles.circle}
          animation="rotate"
          easing="linear"
          iterationCount="infinite"
          duration={5000}
        >
          <Animatable.Image
            style={styles.circleImage}
            source={{ uri: urit }}
            animation="fadeIn"
            duration={2000}
            iterationCount="infinite"
          />
        </Animatable.View>
        <Animatable.View
          style={[styles.bar, { top: '30%', left: '10%' }]}
          animation="fadeIn"
          duration={2000}
          iterationCount="infinite"
          delay={1000}
        />
        <Animatable.View
          style={[styles.bar, { top: '60%', right: '10%' }]}
          animation="fadeIn"
          duration={2000}
          iterationCount="infinite"
          delay={1500}
        />
      </Animatable.View>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>Déconnexion</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteAccount}>
          <Image style={styles.deleteButtonImage} source={require('../assets/horreurdelete.jpg')} />
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
	
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  username: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 150,
    color: 'white',
  },
  email: {
    marginBottom: 40,
    fontSize: 10,
    color: 'white',
  },
  profilePicture: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
  },
  background: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    perspective: 340,
  },
  stars: {
    position: 'absolute',
    top: '500%',
    left: '50%',
    width: 20,
    height: 2,
    transformStyle: 'preserve-3d',
  },
  starsLayer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    boxShadow: 'randomBoxShadow',
  },
  rectangle: {
    position: 'absolute',
    width: 20,
    height: 10,
    backgroundColor: 'white',
  },
  circle: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 220,
    borderWidth: 1,
    borderColor: 'white',
  },
  circleImage: {
    width: 120,
    height: 120,
    borderRadius: 600,
  },
  bar: {
    position: 'absolute',
    width: 100,
    height: 10,
    backgroundColor: 'white',
  },
  star: {
    position: 'absolute',
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: '#ffbb2d',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  deleteButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 10,
  },
  deleteButtonImage: {
    width: 24,
    height: 24,
  },
  
});
