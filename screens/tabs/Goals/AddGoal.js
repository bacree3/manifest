import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native';
import User from '../../../User';
import { GoalTracker } from '../../../Database';
import { JournalEntry } from '../../../Database';

export default function AddGoal({navigation}) {
    const [userInfo, setUserInfo] = useState("");
    const [name, setName] = useState("")
    const [hour, setHour] = useState(0)
    const [minute, setMinute] = useState(0)
    const [frequency, setFrequency] = useState(0)
    const [hourly, setHourly] = useState(false)
    const [daily, setDaily] = useState(false)
    const [custom, setCustom] = useState(false)
    const [customHour, setCustomHour] = useState(0)
    const [category, setCategory] = useState("")

    let goal = new GoalTracker()
    let journal = new JournalEntry();

    useEffect(()=>{
      try {
          let user = new User();
          let userInfo = user.getUserInfo();
          userInfo.then(response => {
              setUserInfo(response.attributes);
          })
          // console.log(route.params)
          // if (route.params !== undefined) {
          //   setCategory(route.params.entry.category)
            // setName(route.params.entry.name)
            // setHour(route.params.entry.hour)
            // setMinute(route.params.entry.minute)
            // setFrequency(route.params.entry.frequency)
            // setHourly(route.params.entry.hourly)
            // setDaily(route.params.entry.daily)
            // setCustom(route.params.entry.custom)
            // setCustomHour(route.params.entry.custom)
            // setEdit(false)
          // }
      } catch (e) {
          alert(e)
      }
  }, [])

    const save = async () => {
      let time = (hour * 60) + minute
      let notification = 'none'
      if (hourly)
        notification = 'hourly'
      else if (daily)
        notification = 'daily'
      else if (custom)
        notification = 'customHour'
      
      await goal.add(userInfo.sub, 'Test', name, time, frequency, notification, 0, customHour).then(response => {
        console.log(response)
      })
      navigation.push('Goals')
    }
    const cancel = () => {
      navigation.push('Goals')
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>A D D    N E W    G O A L</Text>
            <TextInput
                style={styles.name}
                onChangeText={(name) => setName(name)}
                value={name}
                placeholder="Goal Name"
            />
            <Text style={styles.unit}>Units (Pick 1)</Text>
            <View style={styles.unitContainer}>
                <Text style={styles.unitTitle}>Time</Text>
                <TextInput
                    style={styles.unitInput}
                    onChangeText={(hour) => setHour(hour)}
                    value={hour}
                    placeholder="Hour(s)"
                    multiline
                    keyboardType="numeric"
                />
                <TextInput
                    style={styles.unitInput}
                    onChangeText={(minute) => setMinute(minute)}
                    value={minute}
                    placeholder="Minutes"
                    keyboardType="numeric"
                />
            </View>
            <View style={styles.unitContainer}>
                <Text style={styles.unitTitle}>Frequency</Text>
                <TextInput
                    style={styles.unitInput}
                    onChangeText={(frequency) => setFrequency(frequency)}
                    value={frequency}
                    placeholder="x times"
                    keyboardType="numeric"
                />
            </View>
            <Text style={styles.notifyTitle}>Notifications</Text>
            <View style={styles.notifyContainer}>
                <Pressable style={hourly ? styles.selected : styles.notify} onPress={() => setHourly(!hourly)}><Text>Hourly</Text></Pressable>
                <Pressable style={daily ? styles.selected : styles.notify} onPress={() => setDaily(!daily)}><Text>Daily</Text></Pressable>
                <Pressable style={custom ? styles.selected : styles.notify} onPress={() => setCustom(!custom)}><Text>Custom Hours</Text></Pressable>
                {custom ?
                    <TextInput
                        style={styles.customTime}
                        onChangeText={(custom) => setCustomHour(custom)}
                        value={customHour}
                        placeholder="Every - Hours"
                        keyboardType="numeric"
                        /> : <></>
                }
            </View>
   
            <View style={styles.saveContainer}>
                <Pressable style={styles.save} onPress={save}><Text style={styles.saveText}>Save</Text></Pressable>
                <Pressable style={styles.cancel} onPress={cancel}><Text>Cancel</Text></Pressable>
            </View>
        </View>
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
    marginTop: 20,
    marginBottom: 20
  },
  name: {
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 30,
    fontSize: 16,
    textAlign: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 5,
    textAlign: 'center',
    padding: 5
  },
  unit: {
      marginLeft: 20,
      marginRight: 20,
      marginBottom: 8,
      fontSize: 16,
      fontWeight: 'bold',
      backgroundColor: '#D6DEE5',
      borderRadius: 5,
      textAlign: 'center',
      justifyContent: 'center',
      padding: 5,
      width: 120
  },
  unitContainer: {
    flexDirection: 'row',
    marginLeft: 20,
    alignContent: 'center'
  },
  unitTitle: {
      marginRight: 15,
      fontSize: 16,
  },
  unitInput: {
      marginRight: 5,
      marginBottom: 5,
      width: 60,
      fontSize: 16,
      backgroundColor: '#ffffff',
      borderRadius: 5,
      textAlign: 'center',
      height: 30
  },
  notifyTitle: {
    marginLeft: 20,
    marginBottom: 8,
    marginTop: 20,
    fontSize: 16,
    fontWeight: 'bold',
    backgroundColor: '#D6DEE5',
    borderRadius: 5,
    textAlign: 'center',
    justifyContent: 'center',
    padding: 5,
    width: 120
  },
  notifyContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 5,
  },
  notify: {
    backgroundColor: '#D8F0EE',
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
  customTime: {
      width: 100,
      textAlign: 'center'
  },
  saveContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
    marginTop: 50
  },
  save: {
    backgroundColor: '#ffffff',
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 4,
    marginRight: 5,
  },
  saveText: {
    color: '#4A4A4A'
  }
});

