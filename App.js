import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Capture from './src/screens/Capture';
// import Pre from './component/pre';
// import Signup from './src/SignUp';
import Login from './src/screens/Login';
import Signup from './src/screens/Signup';
import Verification from './src/screens/Verification';
import Welcome from './src/screens/Welcome';


export default function App() {

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="Welcome" component={Welcome}
          options={
            {
              headerShown: false
            }
          }
        />
        <Stack.Screen name="login" component={Login}
          options={
            {
              headerShown: false
            }
          }
        />
        <Stack.Screen name="signup" component={Signup}options={
            {
              headerShown: false
            }
          }
        />


        <Stack.Screen name="Verification" component={Verification}
          options={
            {
              headerShown: false
            }
          }

        />
           <Stack.Screen name="Capture" component={Capture} options={
            {
              headerShown: false
            }
          }/>
          </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
