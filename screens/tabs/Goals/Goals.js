import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, TextInput, ScrollView, TouchableOpacity } from 'react-native';
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

  const updateStoredValue = async (update, index) => {
    const duplicate = stored_goals.slice()
    duplicate[index][0].progress = update
    setGoals(duplicate)
    if (update === (stored_goals[index][0].time === 0 ? stored_goals[index][0].frequency : stored_goals[index][0].time)) {
      await Goal.delete(userInfo.sub, stored_goals[index][0].datetime).then(response => {
        console.log(stored_goals)
      })
    }
    await Goal.update(userInfo.sub, stored_goals[index][0].datetime, stored_goals[index][0].progress).then(response => {
      console.log(stored_goals)
    })
    loadEntries()

  }

  const GoalsComponent = () => {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.container}>
          <Text style={styles.text}>G O A L     T R A C K E R</Text>
          <Pressable style={styles.add} onPress={() => navigation.navigate('Create Goal')}><Text style={styles.addText}>Add Goal</Text></Pressable>
          {stored_goals.map((goal, i) => (
          <View style={styles.sliderContainer} key={i}>
            <TouchableOpacity style = {styles.sliderTextContainer} onPress={() => navigation.navigate('Create Goal', {goal: goal[0]})}>
              <Text style={styles.name}>{goal[0].name}</Text>
              <Text>{goal[0].progress} / {goal[0].time === 0 ? goal[0].frequency + ' time(s)' : goal[0].time + ' minute(s)'}</Text>
            </TouchableOpacity>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={goal[0].time === 0 ? goal[0].frequency : goal[0].time}
              step={1}
              value={goal[0].progress}
              onSlidingComplete={(goalValue) => updateStoredValue(goalValue, i)}
              minimumTrackTintColor="#BDE3DF"
              maximumTrackTintColor="#000000"
            />
          </View>
          ))}

        </View>
      </ScrollView>
    )
  }

  function AddGoal({route, navigation}) {
    const [userInfo, setUserInfo] = useState("");
    const [name, setName] = useState("")
    const [hour, setHour] = useState(0)
    const [minute, setMinute] = useState(0)
    const [frequency, setFrequency] = useState(0)
    const [hourly, setHourly] = useState(false)
    const [daily, setDaily] = useState(false)
    const [custom, setCustom] = useState(false)
    const [customHour, setCustomHour] = useState(0)
    const [progress, setProgress] = useState(0)
    const [category, setCategory] = useState("")
    const [edit, setEdit] = useState(true)
    const [datetime, setDateTime] = useState();

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
        marginBottom: 15
      },
      name: {
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 20,
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
        marginLeft: 20,
        alignContent: 'center'
      },
      unitTitle: {
          marginRight: 15,
          fontSize: 16,
          borderRadius: 5,
          fontWeight: 'bold',
    
      },
      unitDescription: {
        fontSize: 12
      },
      unitInput: {
          marginRight: 5,
          marginBottom: 5,
          marginTop: 8,
          width: 60,
          fontSize: 16,
          backgroundColor: '#ffffff',
          borderRadius: 5,
          textAlign: 'center',
          height: 30
      },
      timeContainer: {
        flexDirection: 'row',
        alignItems: 'center'
      },
      time: {
        marginRight: 8
      },
      notifyTitle: {
        marginLeft: 20,
        marginBottom: 8,
        marginTop: 15,
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
      customTime: {
          width: 100,
          textAlign: 'center'
      },
      actionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20
      },
      action: {
        backgroundColor: '#BDE3DF',
        paddingVertical: 8,
        paddingHorizontal: 30,
        borderRadius: 4,
        alignItems: 'center',
        marginBottom: 50,
        marginLeft: 20,
        marginRight: 20
      },
      delete: {
        backgroundColor: '#ffffff',
        paddingVertical: 8,
        paddingHorizontal: 30,
        borderRadius: 4,
        marginRight: 20,
        marginBottom: 50
      }
    });
    
    let goal = new GoalTracker()

    useEffect(()=>{
      try {
          let user = new User();
          let userInfo = user.getUserInfo();
          userInfo.then(response => {
              setUserInfo(response.attributes);
          })
          console.log(route.params)
          if (route.params !== undefined) {
            setCategory(route.params.goal.category)
            setName(route.params.goal.name)
            setHour(Math.floor(route.params.goal.time / 60))
            setMinute(route.params.goal.time % 60)
            setFrequency(route.params.goal.frequency)
            setHourly(route.params.goal.hourly)
            setDaily(route.params.goal.daily)
            setCustom(route.params.goal.custom)
            setCustomHour(route.params.goal.custom)
            setProgress(route.params.goal.progress)
            setEdit(false)
            setDateTime(route.params.goal.datetime)
          }
      } catch (e) {
          alert(e)
      }
  }, [])

    const save = async () => {
      console.log(hour)
      console.log(minute)
      let time = (Number(hour) * 60) + Number(minute)
      console.log(time)
      let notification = 'none'
      if (hourly)
        notification = 'hourly'
      else if (daily)
        notification = 'daily'
      else if (custom)
        notification = 'customHour'
      if (route.params === undefined) {
        await goal.add(userInfo.sub, 'Test', name, time, frequency, notification, progress, customHour).then(response => {
          console.log(response)
        })
      } else {
        await goal.edit(userInfo.sub, datetime, 'Test', name, time, frequency, notification, progress, customHour).then(response => {
          console.log(response)
        })
      }
      loadEntries()
      navigation.push('Goals')
    }
    const deleteEntry = async () => {
      await goal.delete(userInfo.sub, datetime).then(response => {
        console.log("Goal was deleted.");
      })
      loadEntries()
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
                <Text style={styles.unitDescription}>Enter the number of hours/minutes to set aside for this goal (ex. Go on a walk for 30 minutes)</Text>
                <View style={styles.timeContainer}>
                  <TextInput
                      style={styles.unitInput}
                      onChangeText={(hour) => setHour(hour)}
                      value={hour.toString()}
                      placeholder="Hour(s)"
                      keyboardType="numeric"
                  />
                  <Text style={styles.time}>Hour(s)</Text>
                  <TextInput
                      style={styles.unitInput}
                      onChangeText={(minute) => setMinute(minute)}
                      value={minute.toString()}
                      placeholder="Minutes"
                      keyboardType="numeric"
                  />
                  <Text style={styles.time}>Minute(s)</Text>
                </View>
            </View>
            <View style={styles.unitContainer}>
                <Text style={styles.unitTitle}>Frequency</Text>
                <Text style={styles.unitDescription}>Enter the number of times you want to accomplish this goal (ex. Meditate 5 times a day)</Text>
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
            <View style={styles.actionContainer}>
              <Pressable style={styles.action} onPress={save}><Text style={styles.saveText}>Save</Text></Pressable>
              {route.params !== undefined ? <Pressable style={styles.delete} onPress={deleteEntry}><Text>Delete</Text></Pressable>: <></>}
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
