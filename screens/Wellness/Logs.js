import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from '../../components/Button';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#BDE3DF',
    marginTop: 20,
    marginBottom: 20
  },
  wellnessNav: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  nav: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
});

export default function Logs({navigation}) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>M O O D     J O U R N A L</Text>
      <View style={styles.wellnessNav}>
        <Button onPress={() => navigation.navigate('CheckIn')}>Take Assessment</Button>
        <Button onPress={() => navigation.navigate('Resources')}>Resources</Button>
      </View>

      <View style={styles.nav}>
        <Button onPress={() => navigation.navigate('Journal')}>Journal</Button>
        <Button onPress={() => navigation.navigate('Connect')}>Connect</Button>
        <Button onPress={() => navigation.navigate('Goals')}>Goals</Button>
        <Button onPress={() => navigation.navigate('Logs')}>Wellness</Button>
      </View>
    </View>
  )
}
