import { StyleSheet, Text, View, Image, TextInput,TouchableOpacity,ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import pattern from '../../assets/pattern.png'
import green from '../../assets/green.png'
import { button1 } from '../common/button'
import { bwmessage, errormessage, formgroup, head1, head2, input, label, link, link2 } from '../common/formcss'

const Verification = ({ navigation, route }) => {
    const { userdata } = route.params;
    console.log('====================================');
    console.log(userdata);
    console.log('====================================');

    const [errormsg, setErrormsg] = useState(null);
    const [userCode, setUserCode] = useState('XXXX');
    const [actualCode, setActualCode] = useState(null);
    const [loading,setloading]=useState(false);

    useEffect(() => {
        setActualCode(userdata[0]?.VerificationCode);
    }, [])

    const Sendtobackend = () => {
        console.log(userCode);
        // console.log(actualCode);
        
        if (userCode == 'XXXX' || userCode == '') {
            setErrormsg('Please enter the code');
            return;
        }
        
        else if (userCode == actualCode) {
            setloading(true);
            // console.log('correct code');
            const fdata = {
                email: userdata[0]?.email,
                password: userdata[0]?.password,
                name: userdata[0]?.name,
                address: userdata[0]?.address,
                dob: userdata[0]?.dob,
            }

            fetch('https://loginserver-axse.onrender.com/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(fdata)
            })
                .then(res => res.json())
                .then(data => {
                    // console.log(data);
                    if (data.message === 'User Registered Successfully') {
                        alert(data.message);
                        setloading(false)
                        navigation.navigate('login')
                    }
                    else {
                        alert("Something went wrong !! Try Signing Up Again");
                        setloading(false)
                    }
                })
        }
        else if (userCode != actualCode) {
            setErrormsg('Incorrect code');
            return;
        }


    }
    return (
        <View style={styles.container}>
            <Image style={styles.patternbg} source={pattern} />

            <View style={styles.container1} >
                <View style={styles.s1}>
                    <Image style={styles.logo} source={green} />
                    <Text style={styles.h1} onPress={() => navigation.navigate('Welcome')}></Text>
                    <Text style={styles.small1}></Text>
                </View>
                <View style={styles.s2}>

                    <Text style={head1}>Verification</Text>
                    <Text style={bwmessage}>A Code has been sent to you on your email</Text>
                    {
                        errormsg ? <Text style={errormessage}>{errormsg}</Text> : null
                    }

                    <View style={formgroup}>
                        <Text style={label}>Code</Text>
                        <TextInput style={input}
                            placeholder="Enter 6 digit Verification Code"

                            secureTextEntry={true}

                            onChangeText={(text) => setUserCode(text)}
                            onPressIn={() => setErrormsg(null)}

                        />
                    </View>
                    <View style={styles.fp}>
                        <Text style={link}>Forgot Password?</Text>
                    </View>
                    {/* <Text style={button1}
                        onPress={() => Sendtobackend()}
                    >Verify</Text> */}
                    <TouchableOpacity
                        style={button1}
                        activeOpacity={0.8}
                        onPress={() => {
                            Sendtobackend();

                        }}
                    >
                        {!loading ? (<Text style={{ color: "white", fontSize: 22, fontWeight: 'bold',textAlign:"center"  }}>Verify</Text>) : (
                            <ActivityIndicator size="large" color="white" />
                        )}
                    </TouchableOpacity>
                    <Text style={link2}>Don't have an account?&nbsp;
                        <Text style={link}
                            onPress={() => navigation.navigate('signup')}
                        >
                            Create a new account
                        </Text>
                    </Text>
                </View>
            </View>
        </View>
    )
}

export default Verification

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
        marginTop:30,
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
        height: '40%',
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
        height: '60%',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 20,
    },
    formgroup: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        marginVertical: 10,
    },
    label: {
        fontSize: 17,
        color: '#000',
        marginLeft: 10,
        marginBottom: 5,
    },
    input: {
        backgroundColor: "#FFB0CC",
        borderRadius: 20,
        padding: 10,
    },
    fp: {
        display: 'flex',
        alignItems: 'flex-end',
        marginHorizontal: 10,
        marginVertical: 5,
    },
    logo: {
        marginTop:60,
        height: 400,
        resizeMode: 'contain',
    }
})