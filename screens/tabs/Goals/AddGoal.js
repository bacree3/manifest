import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native';

export default function AddGoal({navigation}) {

    const [name, setName] = useState("")
    const [hour, setHour] = useState("")
    const [minute, setMinute] = useState("")
    const [frequency, setFrequency] = useState("")
    const [hourly, setHourly] = useState(false)
    const [daily, setDaily] = useState(false)
    const [custom, setCustom] = useState(false)
    const [customHour, setCustomHour] = useState("")

    const save = () => {
    navigation.navigate('Goals')
    }
    const cancel = () => {
    navigation.navigate('Goals')
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
                <Pressable style={styles.save} onPress={save}><Text>Save</Text></Pressable>
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
    color: '#BDE3DF',
    marginTop: 20,
    marginBottom: 20
  },
  name: {
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10,
    fontSize: 16,
    textAlign: 'center',
  },
  unit: {
      marginLeft: 20,
      marginBottom: 2,
      fontSize: 18,
      fontWeight: 600
  },
  unitContainer: {
    flexDirection: 'row',
    marginLeft: 20,
    alignContent: 'center'
  },
  unitTitle: {
      marginRight: 5,
      fontSize: 16,
  },
  unitInput: {
      marginRight: 5,
      marginBottom: 5,
      width: 60,
      fontSize: 16
  },
  notifyTitle: {
    marginLeft: 20,
    marginBottom: 5,
    marginTop: 20,
    fontSize: 18,
    fontWeight: 600
  },
  notifyContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 5,
  },
  notify: {
    backgroundColor: '#BDE3DF',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginRight: 5
  },
  selected: {
    backgroundColor: '#82BDB7',
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
    backgroundColor: '#BDE3DF',
    paddingVertical: 8,
    paddingHorizontal: 30,
    borderRadius: 4,
    marginRight: 5,
  },
});

