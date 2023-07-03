import React from 'react';
import { View, Image, StyleSheet, Button } from 'react-native';
import { Card } from 'react-native-paper';

const WelcomeForm = () => {
  return (
    <View style={styles.container}>
        <Card style={styles.card}>
          <Card.Cover style={styles.cardCover} source={require('../assets/img/AIDEA35.png')} />
        </Card>
        <Card style={styles.card2}>
          <Card.Cover style={styles.cardCover2} source={require('../assets/img/AIDEADAVINCI.png')} />
        </Card>
        <Card style={styles.card3}>
          <Card.Cover style={styles.cardCover3} source={require('../assets/img/AIDEATXT2IMG.png')} />
        </Card>
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
  card: {
    borderRadius: 0,
    width: 230,
    height: 300,
    bottom: -182.5,
    right: 55,
  },
  card2: {
    width: 130,
    height: 300,
    bottom: 125,
    right: -130,
  },
  card3: {
    width: 350,
    height: 80,
    bottom: 125,
    right: 7,
  },
  cardCover: {
    width: 231,
    height: 307,
  },
  cardCover2: {
    width: 132,
    height: 307,
  },
  cardCover3: {
    width: 371,
    height: 82,
  },
});

export default WelcomeForm;