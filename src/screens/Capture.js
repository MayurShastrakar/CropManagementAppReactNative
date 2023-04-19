import React, { useState } from 'react';
import { StyleSheet, Image, ScrollView, Text, View, Modal, Alert, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { TextInput, Button } from 'react-native-paper'
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import pattern from '../../assets/pattern.png'
import axios from 'axios';
import { Linking } from 'react-native';

const Capture = ({ navigation, route }) => {
  const getDetails = (type) => {
    if (route.params) {
      switch (type) {
        case "picture":
          return route.params.picture

      }
    }
    return ""
  }

  const [picture, setPicture] = useState(getDetails("picture"))
  const [modal, setModal] = useState(false)
  const [enableshift, setenableShift] = useState(false)


  const pickFromGallery = async () => {
    const { granted } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
    if (granted) {
      let data = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5
      })
      if (!data.cancelled) {
        let newfile = {
          uri: data.uri,
          type: `test/${data.uri.split(".")[1]}`,
          name: `test.${data.uri.split(".")[1]}`

        }
        handleUpload(newfile)
      }
    } else {
      Alert.alert("you need to give up permission to work")
    }
  }
  const pickFromCamera = async () => {
    const { granted } = await Permissions.askAsync(Permissions.CAMERA)
    if (granted) {
      let data = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5
      })
      if (!data.cancelled) {
        let newfile = {
          uri: data.uri,
          type: `test/${data.uri.split(".")[1]}`,
          name: `test.${data.uri.split(".")[1]}`

        }
        handleUpload(newfile)
      }
    } else {
      Alert.alert("you need to give up permission to work")
    }
  }

  const handleUpload = (image) => {
    const data = new FormData()
    data.append('file', image)
    data.append('upload_preset', 'CropApp')
    data.append("cloud_name", "djnzsplu3")

    fetch("https://api.cloudinary.com/v1_1/djnzsplu3/image/upload", {
      method: "post",
      body: data
    }).then(res => res.json()).
      then(data => {
        // setPicture(data.url)
        console.log(data.secure_url);
        handleDatabase(data.secure_url);
        setModal(false)
      }).catch(err => {
        Alert.alert("error while uploading")
      })
  }

  
   function handleDatabase(url) {
    console.log(url,"============URL================");
  
       axios.post('https://cropdatabase.onrender.com/image', {photoUri: url}).then(res=>{
        Alert.alert("Image is get added into the database. Thak You..!!")
        console.log("Image added successfully..!");
       }).catch(err=>{console.log(err)})  
 
  }


  //  For Riderect on the URL page
  const submit = () => {
    const url="https://8936-103-76-10-250.ngrok-free.app/"
    try {
      Linking.openURL(url);
    } catch (error) {
      console.log(error);
    }

  }


  const text = "------------>"
  const Note = "(Click on the Capture Button 👉 )"

  return (
    <ScrollView style={styles.container}>
            <Image style={styles.patternbg} source={pattern} />
      <KeyboardAvoidingView behavior="position" style={styles.root} enabled={enableshift}>
      
        <View >
          <Image style={styles.ImageK} source={require('../../assets/green.png')}></Image>
          <Text style={styles.heading}>One-step solution for every farmer needs</Text>

          <Text style={styles.desc}>Capture the picture of your crop and upload it, we give a feasible solution for it.</Text>
          <Text style={styles.Note}> {Note}</Text>
          <View style={{marginTop:10}}>
            <TouchableOpacity
              //  style={styles.inputStyle}
              icon={picture == "" ? "camera" : "check"}
              mode="contained"
              theme={theme}
              // onPress={() => setModal(true)}
              onPress={() => submit()}
              
              style={styles.roundButton}>
              <View style={styles.shadowProp}>

                <Text style={styles.Capture} > Capture </Text>
              </View>
            </TouchableOpacity>
            <View style={styles.screen2}>
              <Text style={styles.working}>Our Working..</Text>
              <Image style={styles.ImageAl} source={require('../../assets/DiseasePre.png')}></Image>
              <Text style={styles.working}>{text}</Text>
            </View>
            {/* <Text style={styles.Plus}>+ </Text> */}

          </View>

          {/* ****************************************** */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={modal}
            onRequestClose={() => {
              setModal(false)
            }}
          >
            <View style={styles.modalView}>
              <View style={styles.modalButtonView}>
                <Button icon="camera"
                  theme={theme}
                  mode="contained"
                  onPress={() => pickFromCamera()}>
                  camera
                </Button>
                <Button
                  icon="image-area"
                  mode="contained"
                  theme={theme}
                  onPress={() => pickFromGallery()}>
                  gallery
                </Button>
              </View>
              <Button
                theme={theme}
                onPress={() => setModal(false)}>
                cancel
              </Button>
            </View>
          </Modal>
          {/* ****************************************** */}

        </View>
      </KeyboardAvoidingView>

    </ScrollView>
  )
}

const theme = {
  colors: {
    primary: "green"
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '120%',
    display: 'flex',
  },
  patternbg: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '100%',
    zIndex: -2,
},
  root: {
    flex: 1,
  },
  inputStyle: {
    margin: 5
  },
  modalView: {
    position: "absolute",
    bottom: 2,
    width: "100%",
    backgroundColor: "white"

  },
  modalButtonView: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  },
  heading: {
    padding: 5,
    fontSize: 35,
    fontWeight: 500,
    color: '#009e13',
    textAlign:'center'
  },
  button: {
    backgroundColor: "green",
    borderRadius: 10,
    textAlign: 'center',
    color: 'white',
    padding: 10,

  },
  Capture:{
    textAlign:'center',
    // marginBottom:11,
    fontWeight:500,
    fontSize:20,
    color:'black'
  },
  roundButton: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    backgroundColor: 'orange',
    shadowOffset: { width: -2, height: 4 },
    shadowColor: '#171717',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    left:250,
    },
  desc: {
    padding: 11,
    margin: 5,
    marginBottom: 0,
    color: 'white',
    fontSize: 18,
    fontWeight: 500,
  },
  Note: {
    // padding:10,
    marginLeft: 10,
    marginTop: 30,
    color:'white',
  },
  ImageAl: {
    width: 350,
    height: 200,
  },
  ImageK: {
    width: 200,
    height: 200
  },
  screen2: {
    backgroundColor: "green",
    borderRadius: 150,
    marginTop: 25,
    padding:5
  },
  working:{
   color:'white',
   textAlign:'center',
   fontSize:15,
   fontWeight:500,
  }

})

export default Capture