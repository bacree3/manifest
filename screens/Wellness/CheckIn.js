import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Button from '../../components/Button';
import Slider from '@react-native-community/slider';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  text: {
    textAlign: 'center',
    fontSize: 23,
    fontWeight: 'bold',
    color: '#BDE3DF',
    marginTop: 20,
    marginBottom: 20
  },
  sliderTitle: {
    marginLeft: 20,
    marginTop: 10,
    fontSize: 16,
    fontWeight: '600',
  },
  sliderContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  slider: {
    width: 200, 
    height: 40,
    marginLeft: 5,
    marginRight: 5
  },
  moodTitle: {
    marginLeft: 20,
    marginTop: 10,
    fontSize: 14,
    fontWeight: '500',
  },
  moodContainerTop: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 5
  },
  moodContainerBottom: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 5,
    marginBottom: 10
  },
  mood: {
    backgroundColor: '#BDE3DF',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginRight: 5
  },
  helpTitle: {
    marginLeft: 20,
    marginTop: 10,
    fontSize: 16,
    fontWeight: '600',
  },
  helpContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 5
  },
  help: {
    backgroundColor: '#BDE3DF',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginRight: 5,
    marginBottom: 50
  },
  saveContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
    marginBottom: 50
  },
  save: {
    backgroundColor: '#BDE3DF',
    paddingVertical: 8,
    paddingHorizontal: 30,
    borderRadius: 4,
    marginRight: 5,
  },
  nav: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
});

export default function CheckIn({navigation}) {
  const [stressValue, setStressValue] = useState(5);
  const [anxietyValue, setAnxietyValue] = useState(5);
  const [energyValue, setEnergyValue] = useState(5);
  const [joyful, setJoyful] = useState(false)

  return (
    <View style={styles.container}>
      <Text style={styles.text}>W E L L N E S S     C H E C K - I N</Text>
      <Text style={styles.sliderTitle}>How are you feeling?</Text>
      <View style={styles.sliderContainer}>
        <Text>Stress Level</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={10}
          step={1}
          value={stressValue}
          onValueChange={(stressValue) => setStressValue(stressValue)}
          minimumTrackTintColor="#BDE3DF"
          maximumTrackTintColor="#000000"
        />
        <Text>({stressValue})</Text>
      </View>
      <View style={styles.sliderContainer}>
        <Text>Anxiety Level</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={10}
          step={1}
          value={anxietyValue}
          onValueChange={(anxietyValue) => setAnxietyValue(anxietyValue)}
          minimumTrackTintColor="#BDE3DF"
          maximumTrackTintColor="#000000"
        />
        <Text>({anxietyValue})</Text>
      </View>
      <View style={styles.sliderContainer}>
        <Text>Energy Level</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={10}
          step={1}
          value={energyValue}
          onValueChange={(energyValue) => setEnergyValue(energyValue)}
          minimumTrackTintColor="#BDE3DF"
          maximumTrackTintColor="#000000"
        />
        <Text>({energyValue})</Text>
      </View>
      <Text style={styles.moodTitle}>Select your mood</Text>
      <View style={styles.moodContainer}>
        <View style={styles.moodContainerTop}>
          <Pressable style={styles.mood}><Text>Joyful</Text></Pressable>
          <Pressable style={styles.mood}><Text>Happy</Text></Pressable>
          <Pressable style={styles.mood}><Text>Relaxed</Text></Pressable>
          <Pressable style={styles.mood}><Text>Indifferent</Text></Pressable>
        </View>
        <View style={styles.moodContainerBottom}>
          <Pressable style={styles.mood}><Text>Confused</Text></Pressable>
          <Pressable style={styles.mood}><Text>Sad</Text></Pressable>
          <Pressable style={styles.mood}><Text>Angry</Text></Pressable>
        </View>
      </View>
      <Text style={styles.helpTitle}>What can we help you with?</Text>
      <View style={styles.helpContainer}>
        <Pressable style={styles.help}><Text>Work Stress</Text></Pressable>
        <Pressable style={styles.help}><Text>Anxiety</Text></Pressable>
        <Pressable style={styles.help}><Text>Low Energy</Text></Pressable>

      </View>
      <View style={styles.saveContainer}>
        <Pressable style={styles.save}><Text>Save</Text></Pressable>
        <Pressable style={styles.cancel}><Text>Cancel</Text></Pressable>
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
