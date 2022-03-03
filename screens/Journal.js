import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from '../components/Button';
import Database from '../Database';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#BDE3DF',
    marginTop: 20,
    marginBottom: 50
  },
  nav: {
    flexDirection: 'row',
  },
});

export default function Journal({navigation}) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>J O U R N A L    E N T R I E S</Text>
      <View style={styles.nav}>
        <Button onPress={() => navigation.navigate('Journal')}>Journal</Button>
        <Button onPress={() => navigation.navigate('Connect')}>Connect</Button>
        <Button onPress={() => navigation.navigate('Goals')}>Goals</Button>
        <Button onPress={() => navigation.navigate('Logs')}>Wellness</Button>
      </View>
    </View>
  )
}
