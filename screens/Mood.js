import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from '../components/Button';

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
    flexDirection: 'row'
  },
});

export default function Mood({navigation}) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>M O O D     J O U R N A L</Text>
      <View style={styles.nav}>
        <Button onPress={() => navigation.navigate('Journal')}>Journal</Button>
        <Button onPress={() => navigation.navigate('Connect')}>Connect</Button>
        <Button onPress={() => navigation.navigate('Goals')}>Goals</Button>
        <Button onPress={() => navigation.navigate('Mood')}>Mood</Button>
      </View>
    </View>
  )
}
