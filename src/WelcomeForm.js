import React from 'react';
import { View, Image, StyleSheet, Button } from 'react-native';

const WelcomeForm = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/favicon.png')} style={styles.image} />
      <Button title="Login"/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
});

export default WelcomeForm;