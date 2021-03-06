import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import Slider from '@react-native-community/slider';
import User from '../../../User';
import { DailyTracker } from '../../../Database';

export default function CheckIn({route, navigation}) {
  const [stressValue, setStressValue] = useState(5);
  const [anxietyValue, setAnxietyValue] = useState(5);
  const [energyValue, setEnergyValue] = useState(5);
  const [joyful, setJoyful] = useState(false);
  const [happy, setHappy] = useState(false);
  const [relaxed, setRelaxed] = useState(false);
  const [indifferent, setIndifferent] = useState(false);
  const [confused, setConfused] = useState(false);
  const [sad, setSad] = useState(false);
  const [angry, setAngry] = useState(false);
  const [stress, setStress] = useState(false);
  const [anxiety, setAnxiety] = useState(false);
  const [energy, setEnergy] = useState(false);

  const [userInfo, setUserInfo] = useState("");

  let checkin = new DailyTracker();

  const cancel = () => {
    navigation.navigate('Wellness')
  }

  useEffect(()=>{
      try {
          let user = new User();
          let userInfo = user.getUserInfo();
          userInfo.then(response => {
              setUserInfo(response.attributes);
          })
          console.log(route.params)
          if (route.params !== undefined) {
            console.log("params not defined")
          }
      } catch (e) {
          alert(e)
      }
  }, [])

  const addEntry = async () => {
      let mood = {
          "joyful": joyful,
          "happy": happy,
          "relaxed": relaxed,
          "indifferent": indifferent,
          "confused": confused,
          "sad": sad,
          "angry": angry,
      }
      let improvement = {
          "stress": stress,
          "anxiety": anxiety,
          "energy": energy,
      }
      if (route.params === undefined) {
          await checkin.add(userInfo.sub, stressValue, anxietyValue, energyValue, JSON.stringify(mood), JSON.stringify(improvement));
      }
      navigation.navigate('Wellness')
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.text}>W E L L N E S S     C H E C K - I N</Text>
      <Text style={styles.sliderTitle}>How are you feeling?</Text>
      <View style={styles.sliderContainer}>
        <Text>Current Stress</Text>
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
        <Text>Overall Anxiety</Text>
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
          <Pressable style={joyful ? styles.selected : styles.mood} onPress={() => setJoyful(!joyful)}><Text>Joyful</Text></Pressable>
          <Pressable style={happy ? styles.selected : styles.mood} onPress={() => setHappy(!happy)}><Text>Happy</Text></Pressable>
          <Pressable style={relaxed ? styles.selected : styles.mood} onPress={() => setRelaxed(!relaxed)}><Text>Relaxed</Text></Pressable>
          <Pressable style={indifferent ? styles.selected : styles.mood} onPress={() => setIndifferent(!indifferent)}><Text>Indifferent</Text></Pressable>
        </View>
        <View style={styles.moodContainerBottom}>
          <Pressable style={confused ? styles.selected : styles.mood} onPress={() => setConfused(!confused)}><Text>Confused</Text></Pressable>
          <Pressable style={sad ? styles.selected : styles.mood} onPress={() => setSad(!sad)}><Text>Sad</Text></Pressable>
          <Pressable style={angry ? styles.selected : styles.mood} onPress={() => setAngry(!angry)}><Text>Irritable</Text></Pressable>
        </View>
      </View>
      <Text style={styles.helpTitle}>What can we help you with?</Text>
      <View style={styles.helpContainer}>
        <Pressable style={stress ? styles.selected : styles.mood} onPress={() => setStress(!stress)}><Text>Stress</Text></Pressable>
        <Pressable style={anxiety ? styles.selected : styles.mood} onPress={() => setAnxiety(!anxiety)}><Text>Anxiety</Text></Pressable>
        <Pressable style={energy ? styles.selected : styles.mood} onPress={() => setEnergy(!energy)}><Text>Low Energy</Text></Pressable>
      </View>
      <View style={styles.saveContainer}>
        <Pressable style={styles.save} onPress={addEntry}><Text>Save</Text></Pressable>
        <Pressable style={styles.cancel} onPress={cancel}><Text>Cancel</Text></Pressable>
      </View>
    </ScrollView>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  text: {
    textAlign: 'center',
    fontSize: 23,
    fontWeight: 'bold',
    color: '#4A4A4A',
    marginTop: 30,
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
    justifyContent: 'center',
    marginLeft: 20,
    marginRight: 20
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
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginRight: 5
  },
  selected: {
    backgroundColor: '#B0D7D3',
    justifyContent: 'center',
    paddingVertical: 10,
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
    margin: 5,
  },
  saveContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
    marginTop: 30,
    marginBottom: 30
  },
  save: {
    backgroundColor: '#BDE3DF',
    paddingVertical: 8,
    paddingHorizontal: 30,
    borderRadius: 4,
    marginRight: 5,
  },
});
