import React from 'react';
import { View, Image, StyleSheet, Button, Text } from 'react-native';
import { Card } from 'react-native-paper';

const WelcomeForm = () => {
  return (
    <View style={styles.container}>
        <Card style={styles.card2}>
          <Card.Cover style={styles.cardCover2}/>
        </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  card: {
    borderRadius: 10,
    height: 300,
    right: 55,
  },
  card2: {
    height: 300,
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