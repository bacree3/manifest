import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Pressable, TextInput, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Slider from '@react-native-community/slider';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import * as Permissions from "expo-permissions";
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
const nfHrIndex = 8
const nfMinIndex = 9
let nfHr = 0

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
                nfEnabled:  response.data[i][notification],
                progress: response.data[i][progress],
                nfHour:  response.data[i][nfHrIndex],
                nfMin:  response.data[i][nfMinIndex]                
              }])
            }
            setGoals(formatted_goals)
          })
      })
    } catch (e) {
        alert(e)
    }
  }

  function scheduleNotifications() {
    let user = new User();
      let userInfo = user.getUserInfo()
      userInfo.then(response => {
          setUserInfo(response.attributes);
          let db_goals = Goal.getAll(response.attributes.sub)
          Notifications.cancelAllScheduledNotificationsAsync();
          db_goals.then(response => {            
            for (let i = 0; i < response.data.length; i++) {
              let currName = response.data[i][name]
              let currEnabled = response.data[i][notification]
              let currHr = response.data[i][nfHrIndex]
              let currMin = response.data[i][nfMinIndex]

              //schedule notification for each goal if enabled
              if (currEnabled) {                
                Notifications.setNotificationHandler({
                  handleNotification: async () => ({
                    shouldShowAlert: true,
                    shouldPlaySound: false,
                    shouldSetBadge: false,
                  }),
                });                
                Notifications.scheduleNotificationAsync({
                  content: { 
                      title: currName 
                  }, 
                  trigger: { 
                      hour: Number(currHr), 
                      minute: Number(currMin), 
                      repeats: true
                  }
                })                
              }

            }

          })
      })      
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
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const notificationSwitch = () => setNotificationsEnabled(previousState => !previousState);
    const [nfHour, setNfHour] = useState("12")
    const [nfMinute, setNfMinute] = useState("00")
    const [updatedHr, setUpdatedHr] = useState(0);
    const [checked, setChecked] = useState("am")
    const [progress, setProgress] = useState(0)
    const [category, setCategory] = useState("")
    const [edit, setEdit] = useState(true)
    const [datetime, setDateTime] = useState();
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false)
    const notificationListener = useRef();
    const responseListener = useRef();

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
        marginRight: 10,
        marginBottom: 8,
        marginTop: 10,
        fontSize: 16,
        fontWeight: 'bold',
        backgroundColor: '#D6DEE5',
        borderRadius: 5,
        textAlign: 'center',
        justifyContent: 'center',
        padding: 5,
        width: 170
      },
      notifyContainer: {
        display: 'flex',
        flexDirection: 'row',   
        margin: 5,
        alignItems: 'center'    
      },
      notify: {
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderRadius: 4,
        marginRight: 5
      },
      nfTimeContainer: {
        display: 'flex',
        flexDirection: 'row',   
        marginLeft: 20
      },
      nfTimeTitle: {
        marginRight: 8,
        marginTop: 10,
        fontSize: 16,
        borderRadius: 5,
        fontWeight: 'bold',
      },
      nfRadioContainer: {
        display: 'flex',
        flexDirection: 'row',   
        marginBottom: 20,
        marginLeft: 55    
      },
      selected: {
        backgroundColor: '#B0D7D3',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 6,
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
        marginBottom: 50
      },
      action: {
        backgroundColor: '#BDE3DF',
        paddingVertical: 8,
        paddingHorizontal: 30,
        borderRadius: 4,
        alignItems: 'center',
        marginLeft: 20,
        marginRight: 20
      },
      delete: {
        backgroundColor: '#ffffff',
        paddingVertical: 8,
        paddingHorizontal: 30,
        borderRadius: 4,
        marginRight: 20
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
          //console.log(route.params)
          if (route.params !== undefined) {
            setCategory(route.params.goal.category)
            setName(route.params.goal.name)
            setHour(Math.floor(route.params.goal.time / 60))
            setMinute(route.params.goal.time % 60)
            setFrequency(route.params.goal.frequency)
            if (route.params.goal.nfEnabled == "true") {
              setNotificationsEnabled(true)
            } else {
              setNotificationsEnabled(false)
            }
            setProgress(route.params.goal.progress)
            let nfArr = nfMilitaryToStandard(Number(route.params.goal.nfHour))
            let nfStandardHr = nfArr[0]
            let nfChecked = nfArr[1]
            setNfHour(nfStandardHr)            
            setNfMinute(route.params.goal.nfMin)
            setChecked(nfChecked)
            setEdit(false)
            setDateTime(route.params.goal.datetime)
          }

          registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
          // This listener is fired whenever a notification is received while the app is foregrounded
          notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
          });
          // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
          responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
          });        
          return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
          };

      } catch (e) {
          alert(e)
      }
  }, [])

    const save = async () => {
      nfStandardToMilitary()

      let time = (Number(hour) * 60) + Number(minute)
      //console.log(time)

      if (route.params === undefined) {
        await goal.add(userInfo.sub, 'Test', name, time, frequency, notificationsEnabled, progress, nfHr, nfMinute).then(response => {
          console.log(response)
        })
      } else {
        await goal.edit(userInfo.sub, datetime, 'Test', name, time, frequency, notificationsEnabled, progress, nfHr, nfMinute).then(response => {
          console.log(response)
        })
      }

      loadEntries()
      scheduleNotifications()
      navigation.push('Goals')
      
    }
    const deleteEntry = async () => {
      await goal.delete(userInfo.sub, datetime).then(response => {
        console.log("Goal was deleted.");
      })

      loadEntries()
      scheduleNotifications
      navigation.navigate('Goals')
    }

    const nfStandardToMilitary = () => {
      if (checked == "am") {   
        if (Number(nfHour) == 12) {
          setUpdatedHr(0);            
        } else { //not 12am
          nfHr = Number(nfHour); 
        }    
      } else {
        if (Number(nfHour) == 12) {
          nfHr = 12;
        } else { //not 12pm
          nfHr = Number(nfHour) + 12     
        }
      }      
    }

    const nfMilitaryToStandard = (militaryHr) => {
      let nfArr = []
      let nfHr = militaryHr
      let am_pm = "am"

      if (militaryHr > 12) { //13:00 to 23:00 = 1pm to 11pm
        nfHr = militaryHr - 12
        am_pm = "pm"
      } else {
        if (militaryHr == 0) { //00:00 = 12am
            nfHr = 12        
        } else if (militaryHr == 12) { // 12:00 = 12pm
          am_pm = "pm"
        }
        //else: 1:00 to 11:00 = 1am - 11am
    }    
      nfArr.push(nfHr.toString(), am_pm)
      return nfArr     
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
                    value={frequency.toString()}
                    placeholder="x times"
                    keyboardType="numeric"
                />
            </View>
            <View style={styles.notifyContainer}>

              <Text style={styles.notifyTitle}>Daily Notifications</Text>            
            
              <View style = {styles.notifyContainer}>
                <Switch
                    trackColor={{ false: "#767577", true: "#6ab8af" }}
                    thumbColor= "#BDE3DF"
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={notificationSwitch}
                    value={notificationsEnabled}
                />
              </View>
              </View>
              {notificationsEnabled ?
              <View style={styles.option}>
                <View style={styles.nfTimeContainer}>
                  <Text style={styles.nfTimeTitle}>Time</Text> 
                  <TextInput
                      style={styles.unitInput}
                      onChangeText={(nfHour) => setNfHour(nfHour)}
                      value={nfHour.toString()}
                      placeholder="Hr"
                      keyboardType="numeric"
                  />
                  <Text style={{marginTop: 12}}>: </Text>
                  <TextInput
                      style={styles.unitInput}
                      onChangeText={(nfMinute) => setNfMinute(nfMinute)}
                      value={nfMinute.toString()}
                      placeholder="Min"
                      keyboardType="numeric"
                  />
                </View>
                
                <View style={styles.nfRadioContainer}>
                    <RadioButton
                      value="am"
                      status={ checked === 'am' ? 'checked' : 'unchecked' }
                      onPress={() => setChecked('am')}
                    />
                    <Text style={{marginTop: 7}}> AM   </Text>
                    <RadioButton
                      value="pm"
                      status={ checked === 'pm' ? 'checked' : 'unchecked' }
                      onPress={() => setChecked('pm')}
                    />
                    <Text style={{marginTop: 7}}> PM </Text>                      
                </View> 
              </View> : <></> 
              }                  
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

async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
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
    marginTop: 100,
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
  nfContainer: {
    display: 'flex',
    flexDirection: 'row',   
    margin: 5 
  },
  nfTitle: {
    fontSize: 16,
  },
  nfInput: {
    width: 60,
    fontSize: 16,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    textAlign: 'center',
    height: 30
  },
  radio: {
    flexDirection: 'row',
    marginLeft: 123,
    alignContent: 'center',
    alignItems: 'center'
  },
  option: {
    flexDirection: 'row',
    margin: 10
  },
  toggleText: {
    flexDirection:'row',
    flexWrap:'wrap',
    fontSize: 16,
    paddingHorizontal: 10
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
    height: 40,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 10
  },
  name: {
    fontWeight: 'bold',
  }
});
