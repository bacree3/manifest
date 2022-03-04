
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
<<<<<<< HEAD:screens/Wellness/Logs.js
import Button from '../../components/Button';
=======
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../components/Button';
>>>>>>> ashray:screens/Mood.js


export default function Mood({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.text}>M O O D     J O U R N A L</Text>
        <View style={styles.nav}>

        </View>
      </View>
    </SafeAreaView>
  )
}


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
<<<<<<< HEAD:screens/Wellness/Logs.js
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
=======
      flexDirection: 'row',
  },
});
>>>>>>> ashray:screens/Mood.js
