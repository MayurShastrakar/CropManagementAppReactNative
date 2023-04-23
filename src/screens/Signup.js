import { StyleSheet, Text, View, Image, TextInput, ScrollView, TouchableOpacity,ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import pattern from '../../assets/pattern.png'
import logo from '../../assets/mainlogo.png'
import { button1 } from '../common/button'
import axios from 'axios'
import { errormessage, formgroup, head1, head2, input, input1, label, link, link2 } from '../common/formcss'

const Signup = ({
    navigation
}) => {

    const [fdata, setFdata] = useState({
        name: '',
        email: '',
        password: '',
        cpassword: '',
        dob: '',
        address: '',
    })

    const [errormsg, setErrormsg] = useState(null);
    const [loading,setloading]=useState(false);


    // *******************************************************************************

    const register = () => {
        const { name, email, password, cpassword, dob, address } = fdata
        if (name == '' || email == '' || password == '' || cpassword == '' || dob == '' || address == '') {
            // alert("Data uploaded successfully")
            setErrormsg('All fields are required');
            return;
        }
        else {

            if (password != cpassword) {
                setErrormsg('Password and Confirm Password must be same');
                return;
            }
            else {
                setloading(true);
                fetch('https://loginserver-axse.onrender.com/verify', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(fdata)

                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        // handle the response data here
                        if (data.error === 'Invalid Credentials') {
                            // alert('Invalid Credentials')
                            setloading(false);
                            setErrormsg('Invalid Credentials')
                        }
                        else if (data.message === "Verification Code Sent to your Email") {
                            // console.log(data.udata);
                            alert(data.message);
                            setloading(false);
                            navigation.navigate('Verification', { userdata: data.udata })
                        }
                        else {
                            alert(data.message);
                            setloading(false);
                            navigation.navigate('Verification', { userdata: data.udata })
                            //  navigation.navigate('login')

                        }
                    })
                    .catch(error => {
                        setloading(false);
                        setErrormsg('Email or name already exist');
                        console.error(error);
                        // handle any errors here
                    });
            }


        }
    }


    return (
        <View style={styles.container}>
            <Image style={styles.patternbg} source={pattern} />

            <View style={styles.container1}>
                <View style={styles.s1}>

                </View>
                <ScrollView style={styles.s2}>
                    <Text style={head1}>Create a New Account</Text>
                    <Text style={link2}>Already Registered?&nbsp;
                        <Text style={link}
                            onPress={() => navigation.navigate('login')}
                        >
                            Login here
                        </Text>
                    </Text>
                    {
                        errormsg ? <Text style={errormessage}>{errormsg}</Text> : null
                    }
                    <View style={formgroup}>
                        <Text style={label}>Name</Text>
                        <TextInput style={input} placeholder="Enter your Name"
                            onPressIn={() => setErrormsg(null)}
                            onChangeText={(text) => setFdata({ ...fdata, name: text })}
                        />
                    </View>
                    <View style={formgroup}>
                        <Text style={label}>Email</Text>
                        <TextInput style={input} placeholder="Enter your Email"
                            onPressIn={() => setErrormsg(null)}
                            onChangeText={(text) => setFdata({ ...fdata, email: text })}
                        />
                    </View>
                    <View style={formgroup}>
                        <Text style={label}>Phone No:</Text>
                        <TextInput style={input} placeholder="Enter your phone no."
                            onPressIn={() => setErrormsg(null)}
                            onChangeText={(text) => setFdata({ ...fdata, dob: text })}
                        />
                    </View>
                    <View style={formgroup}>
                        <Text style={label}>Password</Text>
                        <TextInput style={input} placeholder="Enter your Password"
                            onPressIn={() => setErrormsg(null)}
                            secureTextEntry={true}
                            onChangeText={(text) => setFdata({ ...fdata, password: text })}
                        />
                    </View>

                    <View style={formgroup}>
                        <Text style={label}>Confirm Password</Text>
                        <TextInput style={input} placeholder="Confirm your Password"
                            onPressIn={() => setErrormsg(null)}
                            secureTextEntry={true}
                            onChangeText={(text) => setFdata({ ...fdata, cpassword: text })}
                        />
                    </View>
                    <View style={formgroup}>
                        <Text style={label}>Address</Text>
                        <TextInput style={input} placeholder="Enter your Address"
                            onPressIn={() => setErrormsg(null)}
                            onChangeText={(text) => setFdata({ ...fdata, address: text })}
                        />
                    </View>


                    <TouchableOpacity
                        style={button1}
                        activeOpacity={0.8}
                        onPress={() => {
                            register();

                        }}
                    >
                        {!loading ? (<Text style={{ color: "white", fontSize: 22, fontWeight: 'bold',textAlign:"center"  }}> Signup </Text>) : (
                            <ActivityIndicator size="large" color="white" />
                        )}
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </View>
    )
}

export default Signup

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        display: 'flex',

    },
    patternbg: {
        position: 'absolute',
        top: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
    },
    container1: {
        marginTop: 80,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
    },
    s1: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '10%',
    },
    small1: {
        color: '#fff',
        fontSize: 17,
    }
    ,
    h1: {
        fontSize: 30,
        color: '#fff',
    },
    s2: {
        display: 'flex',
        backgroundColor: '#fff',
        width: '100%',
        height: '90%',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 20,

    },
    formgroup: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        marginVertical: 10,
        // flexDirection: 'row',
        // justifyContent: 'space-between',
        // marginBottom: 5,
    },
    label: {
        // fontSize: 17,
        // color: '#000',
        // marginLeft: 10,
        // marginBottom: 5,
        color: 'green', fontWeight: 'bold'
    },
    input: {
        //  backgroundColor: "#FFB0CC",
        backgroundColor: "green",
        // borderRadius: 20,
        // padding: 10,
        borderWidth: 1,
        borderColor: 'green',
        height: 25,
        width: 250,
        borderRadius: 5,
        fontSize: 10,
        paddingLeft: 10,
        marginBottom: 5,
    },
    fp: {
        display: 'flex',
        alignItems: 'flex-end',
        marginHorizontal: 10,
        marginVertical: 5,
    }
})