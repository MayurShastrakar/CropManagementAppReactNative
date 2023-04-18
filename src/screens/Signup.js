import { StyleSheet, Text, View, Image, TextInput, ScrollView, TouchableOpacity } from 'react-native'
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

    // const Sendtobackend = () => {
    //     // console.log(fdata);
    //     if (fdata.name == '' ||
    //         fdata.email == '' ||
    //         fdata.password == '' ||
    //         fdata.cpassword == '' ||
    //         fdata.dob == '' ||
    //         fdata.address == '') {
    //         setErrormsg('All fields are required');
    //         return;
    //     }
    //     else {
    //         if (fdata.password != fdata.cpassword) {
    //             setErrormsg('Password and Confirm Password must be same');
    //             return;
    //         }
    //         else {
    //             fetch('http://localhost:3000/singup', {
    //                 method: 'POST',
    //                 headers: {
    //                     'Content-Type': 'application/json'
    //                 },
    //                 body: JSON.stringify(fdata)
    //             })
    //                 .then(res => res.json()).then(
    //                     data => {
    //                         // console.log(data);
    //                         if (data.error === 'Invalid Credentials') {
    //                             // alert('Invalid Credentials')
    //                             setErrormsg('Invalid Credentials')
    //                         }
    //                         else if (data.message === "Verification Code Sent to your Email") {
    //                             // console.log(data.udata);
    //                             alert(data.message);
    //                             navigation.navigate('verification', { userdata: data.udata })
    //                         }
    //                         else {
    //                             alert(data.message);
    //                             navigation.navigate('verification', { userdata: data.udata })
    //                         }
    //                     }
    //                 )
    //         }
    //     }
    // }



    // ********************************************************************

    // const submit = () => {
    //     try {
    //         fetch('http://localhost:3000/verify', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify(fdata)

    //         })
    //             .then(res => res.json())
    //             .then(data => {
    //                 console.log(data);
    //                 // handle the response data here
    //             })
    //             .catch(error => {
    //                 console.error(error);
    //                 // handle any errors here
    //             });
    //     } catch (error) {
    //         console.log('====================================');
    //         console.log(error);
    //         console.log('====================================');
    //     }
    // }
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
                fetch('https://loginserver-axse.onrender.com/signup', {
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
                            setErrormsg('Invalid Credentials')
                        }
                        else if (data.message === "Verification Code Sent to your Email") {
                            // console.log(data.udata);
                            alert(data.message);
                            navigation.navigate('Verification', { userdata: data })
                        }
                        else {
                            alert(data.message);
                           navigation.navigate('Verification', { userdata: data })
                            //  navigation.navigate('login')

                        }
                    })
                    .catch(error => {
                        setErrormsg('Email or name already exist');
                        console.error(error);
                        // handle any errors here
                    });
            }
            // else { setErrormsg('Password and Confirm Password must be same') }

        }
    }

    //     else { alert("Enter valid details"); }
    //     }

    // const [user, setUser] = useState({
    //     Fullname: "",
    //     email: "",
    //     pass: "",
    //     Repass: ""
    // })


    // const handleChange = e => {

    //     const { name, value } = e.target
    //     // console.log(name, value);
    //     setUser({
    //         ...user,
    //         [name]: value
    //     })
    // }
    // // 
    // const register = () => {
    //     const { Fullname, email, pass, Repass } = user
    //     if (Fullname && email && pass && Repass) {
    //         // alert("Data uploaded successfully")
    //         if (pass === Repass) {
    //             axios.post("http://localhost:8008/register", user)
    //                 .then(res =>
    //                     // console.log(res)
    //                     alert(res.data.message)
    //                 )
    //         }
    //         else { alert("Pasward not match") }

    //     }

    //     else { alert("Enter valid details"); }
    // }

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
                        onPress={() => {
                            register();
                        }}
                    >
                        <Text style={button1}

                        >Signup</Text>
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
        marginTop:80,
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
        color: 'green',fontWeight: 'bold'
    },
    input: {
    //  backgroundColor: "#FFB0CC",
     backgroundColor: "green",
        // borderRadius: 20,
        // padding: 10,
        borderWidth: 1,
    borderColor: 'green',
    height: 25,
    width:250,
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