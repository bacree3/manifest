import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Slider from '@react-native-community/slider';
import { GoalTracker } from '../../../Database';
import User from '../../../User';


const Stack = createStackNavigator();
const uid = 0
const datetime = 1
const category = 2
const name = 3
const time = 4
const frequency = 5
const notification = 6
const progress = 7
const customHour = 8


export default function Goals() {
  const [userInfo, setUserInfo] = useState("")
  const [stored_goals, setGoals] = useState([])
  const navigation = useNavigation()
  const [render, setRender] = useState(false)

  let Goal = new GoalTracker()

  function loadEntries() {
    try {
      let user = new User();
      let userInfo = user.getUserInfo()
      userInfo.then(response => {
          setUserInfo(response.attributes);
          let db_goals = Goal.getAll(response.attributes.sub)
          db_goals.then(response => {
            let formatted_goals = []
            for (let i = 0; i < response.data.length; i++) {
              formatted_goals.push([{
                uid: response.data[i][uid],
                datetime: response.data[i][datetime],
                category: response.data[i][category],
                name:  response.data[i][name],
                time:  response.data[i][time],
                frequency:  response.data[i][frequency],
                notification:  response.data[i][notification],
                customHour:  response.data[i][customHour],
                progress: response.data[i][progress]
              }])
            }
            console.log(formatted_goals)
            setGoals(formatted_goals)
          })
      })
    } catch (e) {
        alert(e)
    }
  }
  useEffect(()=>{
    loadEntries()
  }, [])

  useFocusEffect(
    React.useCallback(() => {
      loadEntries();
    }, [])
  );

  const updateValue = async (update, index) => {
    const duplicate = stored_goals.slice()
    duplicate[index][0].progress = update
    setGoals(duplicate)
    await Goal.update(userInfo.sub, stored_goals[index][0].datetime, stored_goals[index][0].progress).then(response => {
      setRender(true)
    })
  }

  const GoalsComponent = () => {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <Text style={styles.text}>G O A L     T R A C K E R</Text>
          <Pressable style={styles.add} onPress={() => navigation.navigate('Create Goal')}><Text style={styles.addText}>Add Goal</Text></Pressable>
          {stored_goals.map((goal, i) => (
          <View style={styles.sliderContainer} key={i}>
            <View style = {styles.sliderTextContainer}>
              <Text style={styles.name}>{goal[0].name}</Text>
              <Text>{goal[0].progress} / {goal[0].time === 0 ? goal[0].frequency + ' time(s)' : goal[0].time + ' minute(s)'}</Text>
            </View>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={goal[0].time === 0 ? goal[0].frequency : goal[0].time}
              step={1}
              value={goal[0].progress}
              onValueChange={(goalValue) => updateValue(goalValue, i)}
              minimumTrackTintColor="#BDE3DF"
              maximumTrackTintColor="#000000"
            />
          </View>
          ))}

        </View>
      </SafeAreaView>
    )
  }

  function AddGoal({navigation}) {
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
        marginTop: 50,
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
        padding: 10
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
          borderRadius: 5,
    
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
        backgroundColor: '#BDE3DF',
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
        marginTop: 30
      },
      save: {
        backgroundColor: '#ffffff',
        paddingVertical: 8,
        paddingHorizontal: 30,
        borderRadius: 4,
        marginRight: 5,
      },
    });
    
    let goal = new GoalTracker()

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
      loadEntries()
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
  return (
    <Stack.Navigator 
     initialRouteName="Goals">

        <Stack.Screen name="Goals" options={{headerShown: false}} component={GoalsComponent} />
        <Stack.Screen name="Create Goal" component={AddGoal} />
    </Stack.Navigator>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  text: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    color: '#4A4A4A',
    marginTop: 50,
    marginBottom: 30
  },
  add: {
    backgroundColor: '#BDE3DF',
    paddingVertical: 8,
    paddingHorizontal: 30,
    borderRadius: 4,
    alignItems: 'center',
    marginRight: 5,
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20
  },
  addText: {
    color: '#4A4A4A',
    fontWeight: 'bold',
  },
  sliderTitle: {
    marginLeft: 20,
    marginTop: 10,
    fontSize: 16,
    fontWeight: '600',
  },
  sliderTextContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  sliderContainer: {
    marginLeft: 20,
    marginRight: 20
  },
  slider: {
    // width: 200, 
    height: 40,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 10
  },
  name: {
    fontWeight: 'bold',
  }
});
