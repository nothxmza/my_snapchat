import React, { useState, useEffect, useRef } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Button, SafeAreaView, Image, ScrollView} from 'react-native';
import { Camera, CameraType} from 'expo-camera';
import { ShareAsync } from 'expo-sharing'
import * as MediaLibrary from 'expo-media-library'
import Ionicons from 'react-native-vector-icons/Ionicons'
import ImageResizer from 'react-native-image-resizer';
import * as ImageManipulator from 'expo-image-manipulator';


export default function Snap({data}) {
	const [hasPermission, setHasPermission] = useState(null);
	const [hasMediaPermission, setMediaHasPermission] = useState(null);
	const [image, setImage] = useState(null);
	const [imageBas, setImageBase] = useState(null);
	const [type, setType] = useState(Camera.Constants.Type.back);
	const [flash, setFlash] = useState('off');
	const [photo, setPhoto] = useState();
	const [fColor, setFcolor] = useState('white');
	const [users, setUsers] = useState([]);
	const [showUser, setShowUser] = useState(false);
	const [id, setId] = useState(0);
	let [zoom, setZoom] = useState(0);
	const cameraRef = useRef(null)
	

	useEffect(() => {
		(async () => {
			MediaLibrary.requestPermissionsAsync();
			const { status } = await Camera.requestCameraPermissionsAsync();
			setHasPermission(status === 'granted');
			setMediaHasPermission(status === 'granted');
		})();
	}, []);

	const resetImage = () =>{
		setImage(null);
		setImageBase(null);
	}

	const takePicture = async () => {
		if (cameraRef.current) {
		  try {
			const data = await cameraRef.current.takePictureAsync({
				base64: true
			});
			const resizedImage = await ImageManipulator.manipulateAsync(data.uri, [{ resize: { width: 400, height: 400 } }], { format: 'jpeg', compress: 1 });
	  
			const response = await fetch(resizedImage.uri);
			const blob = await response.blob();
			const resizedImageBase64 = await new Promise((resolve, reject) => {
			  const reader = new FileReader();
			  reader.onloadend = () => resolve(reader.result);
			  reader.onerror = reject;
			  reader.readAsDataURL(blob);
			});
	  
			setImage(data.uri);
			setImageBase(resizedImageBase64);
		  } catch (error) {
			console.log(error);
		  }
		}
	  };

	const saveImage = async () => {
		if(image){
			try{
				await MediaLibrary.createAssetAsync(image);
				alert('picture save');
				setImage(null);
				setImageBase(null);
			}catch(e){
				console.log(e)
			}
		}
	}
	
	const sendPick = (idUser) => {
		console.log("image base: "+imageBas );
		const url = 'https://mysnapchat.epidoc.eu/snap';
		fetch(url, {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Authorization': `Bearer ${data.data.data.token}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				to: idUser,
				image: imageBas,
				duration: 5,
			}),
		})
		.then(response => {
			if (response.status !== 200) {
				console.log(response);
			}
			return response.json();
		})
		.then(data => {
			console.log("reponse data: "+data);
			alert('Image envoyé')
			setShowUser(false)
		})
		.catch(error => {
			console.error('An error occurred:', error);
		});
	}
	const sendImage = () =>{
		const url = 'https://mysnapchat.epidoc.eu/user';
		fetch(url, {
			method: 'GET',
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
		.then(datas => {
			setUsers(datas);
			setShowUser(true);
			//a envoyer vers la page de la personne qui vient de se connecter
		})
		.catch(error => {
			console.error('An error occurred:', error);
		});
	};
		//soit faire un autre component soit le faire ici
		//afficher la liste des personnes et envoyer 
	if (hasPermission === null) {
		return <View />;
	}
	else if (hasPermission === false) {
		return <Text>No access to camera</Text>;
	}
	function cameraType(){
		setType(type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back)
	}
	function cameraFlash(){
		setFlash(flash === 'off' ? 'on' : 'off')
		if(flash === 'off')
			setFcolor('yellow')
		else
			setFcolor('white')
	}
	
	/*function addZoom(){
		zoom += 0.10
		setZoom(zoom)
	}
	
	function removeZoom(){
		zoom -= 0.10;
		setZoom(zoom);
	}*/
	return (
	<View style={styles.container}>
		{!image &&
		<Camera style={{ flex: 1 }}type={type} flashMode={flash} ref={cameraRef}  zoom={zoom}>
			<View
				style={{
					flex: 1,
					backgroundColor: 'transparent',
					flexDirection: 'row', 
					justifyContent: 'center',
				}}>
				<TouchableOpacity
					style={{
					flex: 0.1,
					position: 'absolute',
					right: '5%',
				}}
				onPress={cameraType}>
					<Ionicons name="camera-reverse-outline" style={{fontSize: 25,marginVertical: 50, color: 'white'}} />
				</TouchableOpacity>
				<TouchableOpacity
					style={{
					position: 'absolute',
					right: '5%',
					top: '10%',
					flex: 0.1,
					alignSelf: 'flex-start',
					alignItems: 'center',
				}}
				onPress={cameraFlash}>
				<Ionicons name="flash-outline" style={{fontSize: 25,marginVertical: 10}} color={fColor}/>
				</TouchableOpacity>
				<TouchableOpacity style={styles.captureButton} onPress={takePicture}>
          		</TouchableOpacity>
			</View>
		</Camera>
		}
		{image && (
			<View style={styles.imagePreview}>
				<Image source={{ uri: image }} style={{ flex: 1 }} />
				<View style={styles.buttonContainer}>
					<Button title={'Retake'} onPress={resetImage} />
					<Button title={'Save'} onPress={saveImage} />
					<Button title={'Envoyer'} onPress={sendImage} />
				</View>
			</View>
      	)}
		{showUser && (
		<ScrollView>
			{users.data.map((user) => (
			<TouchableOpacity onPress={() => sendPick(user._id)} key={user._id}>
				<View style={styles.card}>
				{user.profilePicture !== '' ? (
					<Image style={styles.profilePicture} source={{ uri: user.profilePicture }} />
				) : (
					<Image style={styles.profilePicture} source={require('../assets/ken.png')} />
				)}
				<Text style={styles.username}>{user.username}</Text>
				</View>
			</TouchableOpacity>
			))}
		</ScrollView>
		)}
	</View>
)};

const styles = StyleSheet.create({
	container: {
	  flex: 1,
	  backgroundColor: 'black',
	},
	captureButton: {
		position: 'absolute',
		bottom: 16,
		height: 100,
		width: 100,
		alignSelf: 'center',
		borderWidth: 8, 
		borderColor: 'white', 
		backgroundColor: 'transparent', 
		borderRadius: 50,
		paddingVertical: 8,
	},
	captureButtonText: {
	  fontSize: 16,
	  color: 'black',
	},
	imagePreview: {
	  flex: 1,
	  margin: 8,
	},
	buttonContainer: {
	  flexDirection: 'row',
	  justifyContent: 'space-between',
	  marginVertical: 16,
	},
	card: {
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
		color: '#ffbb2d',
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
  });
  