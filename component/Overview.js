import { StyleSheet, View, Text, Image, TouchableOpacity, Button, Alert, ScrollView } from 'react-native'
import React from 'react'



// import {ImageOrVideo} from 'react-native-image-crop-picker';
import { Camera } from 'expo-camera';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';



const Overview = ({ navigation }) => {

    const createButtonAlert = () =>
        Alert.alert('Alert Title', 'My Alert Msg', [
            {
                text: 'Ask me later',
                onPress: () => console.log('Ask me later pressed'),
            },
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            { text: 'OK', onPress: () => console.log('OK Pressed') },
        ]);

    const buttonClickedHandler = () => {
        console.log('You have been clicked a button!');
        Alert.alert("You Clicked The TouchableOpacity Button")
        // do something
    };
    const text = "------------>"
    const Note = "(Click on the Capture Button 👉 )"

    const onSelectIamge=()=>{

    }
    const submit = () => {
                // console.log(username);
                navigation.navigate('MainPage');
       
    }

    return (
        <ScrollView style={styles.container}>

        
      
            <Text  >This is Home Page</Text>
            <Image style={styles.ImageK} source={require('../assets/HiKisan.png')}></Image>
            <Text style={styles.heading}>One-step solution for every farmer needs</Text>

            <Text style={styles.desc}>Capture the picture of your crop and upload it, we give a feasible solution for it.</Text>
            <Text style={styles.Note}> {Note}</Text>
            <View style={styles.screen}>
                <TouchableOpacity
                    onPress={submit }
                    style={styles.roundButton1}>
                    <View style={styles.shadowProp}>

                        <Text style={styles.Capture} > Capture </Text>
                    </View>
                    {/* <Text style={styles.Plus}>+ </Text> */}
                </TouchableOpacity>
            </View>
            <View style={styles.screen2}>
                <Text style={styles.working}>Our Working..</Text>
                <Image style={styles.ImageAl} source={require('../assets/DiseasePre.png')}></Image>
                <Text>{text}</Text>
            </View>
            <View>
                
            <Button  style={styles.button} title={'2-Button Alert'} onPress={createButtonAlert} />
            </View>
            </ScrollView>

        // onPress={()=>{Alert.alert("You Clicked The TouchableOpacity Button")}}  DiseasePre.png
    )
}
const styles = StyleSheet.create({
    container: {
        margin: 5,
        backgroundColor: "white",
    },
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
        margin: 20,
        

    },
    working: {
        color: 'white',
        fontSize: 15,
        fontWeight: 500,
    },
    shadowProp: {
     
    },
    screen2: {
        // flex: 1,
        padding: 10,
        marginTop: 50,
        marginBottom: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#009e13',
        color: 'white',
        borderRadius: 120,
    },
    Capture: {
        color: 'white',
        fontSize: 12,
        fontWeight: '900',

    },
    Plus: {
        color: 'white',
        fontSize: 20,
        fontWeight: '900',
    },
    roundButton1: {
        width: 70,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 100,
        backgroundColor: 'orange',
        shadowOffset: { width: -2, height: 4 },
        shadowColor: '#171717',
        shadowOpacity: 0.2,
        shadowRadius: 3,

    },
    ImageK: {
        width: 100,
        height: 100,
        // backgroundColor:'blue',
    },
    heading: {
        padding: 10,
        fontSize: 50,
        fontWeight: 500,
        color: '#009e13',
    },
    button: {
        backgroundColor: "green",
        // width:50,
        borderRadius: 10,
        textAlign: 'center',
        color: 'white',
        padding: 10,
        // marginLeft:80,

    },
    desc: {
        padding: 11,
        margin: 5,
        marginBottom: 0,
        color: 'black',
        fontSize: 18,
        fontWeight: 500,
    },
    Note: {
        // padding:10,
        marginLeft: 10,
        marginTop: 10,
        // color:'black',
    },
    ImageAl: {
        width: 350,
        height: 200,
    }

});

export default Overview;