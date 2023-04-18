import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

const Pre=()=> {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{
          uri: 'https://media.istockphoto.com/id/1127929107/vector/welcome-lettering-sign-isolated-vector.jpg?s=612x612&w=0&k=20&c=kH2mqRoV8-1vutUYwGhdpzx-Wt24Gbq7Oz0sKxZcBWU=',
        }}
      />
      <Text style={styles.title}>Welcome to my App</Text>
      <Text style={styles.subtitle}>
        Here you can find all the information you need
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: 250,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
  },
});

export default Pre;