import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

const MainPage = () => {

// image url using cloudnary

const [E_Pic, setpic] = useState("");

// const OnChangeHandler = (e) => {
//   setEvent({ ...Event, [e.target.name]: e.target.value })
// }

const PostDetail = (pics) => {
  setpicloading(true);
  if (pics === undefined) {
    alert("please select a single image")
    setpicloading(false);
    return 
    
  }

  if (pics.type === "image/jpeg" || pics.type === "image/png") {
    const data = new FormData();
    data.append("file", pics)
    data.append("upload_preset", "chat-app");
    data.append("cloud_name", "dnixu4d4g");
    fetch("https://api.cloudinary.com/v1_1/dnixu4d4g/image/upload", {
      method: "post",
      body:data
    })
      .then((res) => res.json())
      .then((data) => {
        setpic(data.url.toString())
        console.log(data.url.toString())
        
        alert("pic uploaded successfully")
      }).catch((err) => {
       
        console("unable to upload pic")
    })
  } else {
    
    alert("Select the proper image extension eg:png/jpeg")
  }
  
}


// Rider

  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [photoUri, setPhotoUri] = useState(null);
  const cameraRef = useRef(null);
  const navigation = useNavigation();

  useFocusEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  });

  const takePicture = async () => {
    if (cameraRef.current) {
      const { uri } = await cameraRef.current.takePictureAsync();
      setPhotoUri(uri);
      // console.log("==============================");
      // console.log(uri);
      // console.log("==============================");
      savePhotoToCameraRoll(uri);
      navigation.navigate('ImagePage', { photoUri: uri });
    }
  };

  const savePhotoToCameraRoll = async (photoUri) => {
    try {
      const asset = await MediaLibrary.createAssetAsync(photoUri);
    await MediaLibrary.createAlbumAsync('Expo', asset, false);
    } catch (error) {
      // console.log(error);
    }
  };

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      {hasPermission && (
        <Camera style={{ flex: 1 }} type={type} ref={cameraRef}>
          <View
            style={{
              flex: 1,
              backgroundColor: 'transparent',
            }}>
            <TouchableOpacity
              style={{
                flex: 0.1,
                alignSelf: 'flex-end',
                alignItems: 'center',
                top: 600,
              }}
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}>
              <Text style={{ fontSize: 18, margin: 10, color: 'white' }}> Flip </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
               
                position: 'absolute',
                bottom: 20,
                alignSelf: 'center',
                backgroundColor: 'white',
                padding: 10,
                borderRadius: 5,
              }}
              onPress={takePicture}>
              <Text  style={{ fontSize: 16 }}  > Snap </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 0.1,
                alignSelf: 'flex-start',
                alignItems: 'center',
                top: 550,
              }}
              onPress={() => {
                if (photoUri) {
                  navigation.navigate('ImagePage', { photoUri: photoUri });
                } else {
                  console.log('No photo to display');
                }
              }}>
              <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> View Photo</Text>
            </TouchableOpacity>
          </View>
        </Camera>
      )}
    </View>
  );
};

export default MainPage;

const styles = StyleSheet.create({
  container: {
    height: 700,
    margin: 1,
  },
});
