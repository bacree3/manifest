import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, Switch, Platform, Keyboard, DevSetting, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RadioButton } from 'react-native-paper';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import * as Permissions from "expo-permissions";

import User from '../../User';
import Auth from '@aws-amplify/auth';
import Journal from './Journal/Journal';
import Goals from './Goals/Goals';
import Wellness from './Wellness/Wellness';
import Resources from './Resources';
import { UserSettings } from '../../Database';

const Stack = createStackNavigator();

export default function Settings() {

  const [friends, setFriends] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const [userSettings, setUserSettings] = useState("");
 

  const [testQuery, setTestQuery] = useState("");
  const [userInfo, setUserInfo] = useState("");
  const navigation = useNavigation();



  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  let user_data = new UserSettings();

  useEffect(()=>{
    try {
      let user = new User();
      let userInfo = user.getUserInfo();
      userInfo.then(response => {
          setUserInfo(response.attributes);
      })

      registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

      // This listener is fired whenever a notification is received while the app is foregrounded
      notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
        setNotification(notification);
      });

      // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
      responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
        console.log(response);
      });

      loadSettings();
      loadFriends();
      loadFriendRequests();

      return () => {
        Notifications.removeNotificationSubscription(notificationListener.current);
        Notifications.removeNotificationSubscription(responseListener.current);
      };
    } catch (e) {
      alert(e)
    }
  }, [])

  function loadSettings() {
    try {
      console.log("getting current user settings")
      user_data.getUserSettings(userInfo.sub).then(response => {
          setUserSettings(response.data);
          if (response.data.length == 0) {
              console.log("empty, adding user to settings db");
              user_data.addNewUser(userInfo.sub, userInfo.email)
          }
      });
    } catch (e) {
      alert(e)
    }
  }

  function loadFriends() {
      try {
          let user = new User();
          let userInfo = user.getUserInfo();
          console.log("getting current user settings")
          userInfo.then(response => {
              user_data.getUserSettings(response.attributes.sub).then(response => {
                  console.log("formatting friends");
                  //let test = JSON.parse(response.data[0][4]).replace(/'/g, '"');
                  let raw_data = JSON.parse(response.data[0][5]);
                  let formatted_friends = [];
                  for (let i = 0; i < raw_data.length; i++) {
                    formatted_friends.push([{
                        friend: raw_data[i]
                    }])
                  }
                  console.log(formatted_friends)
                  setFriends(formatted_friends);
                  console.log("set friends");
              });
          });
      } catch (e) {
          alert(e)
      }
  }

  function loadFriendRequests() {
      try {
          let user = new User();
          let userInfo = user.getUserInfo();
          userInfo.then(response => {
              user_data.getUserSettings(response.attributes.sub).then(response => {
                  console.log("formatting friend requests");
                  let raw_data = JSON.parse(response.data[0][6]);
                  let formatted_requests = [];
                  for (let i = 0; i < raw_data.length; i++) {
                    formatted_requests.push([{
                        friend: raw_data[i]
                    }])
                  }
                  console.log(formatted_requests)
                  setFriendRequests(formatted_requests);
                  console.log("set friend requests");
              });
          });
      } catch (e) {
          alert(e)
      }
  }


  const SettingsComponent = () => {
    const [requestEmail, setRequestEmail] = useState("");
    const [hour, setHour] = useState("12");
    const [minute, setMinute] = useState("00");
    const [checked, setChecked] = React.useState('am');
    
    const [notificationHr, setNotificationHr] = useState(0);
    const [notificationMin, setNotificationMin] = useState(0);
    const [notificationsEnabled, setNotificationsEnabled] = useState(false);
    const notificationSwitch = () => setNotificationsEnabled(previousState => !previousState);
    const [shareEnabled, setShareEnabled] = useState(false);
    const shareSwitch = () => setShareEnabled(previousState => !previousState);


  
    const sendRequest = () => {
      try {
        console.log("getting new friend id");
        user_data.getFriendID(requestEmail).then(response => {
            console.log("getting friend settings");
            user_data.getUserSettings(response.data[0][0]).then(response => {
                let originalRequests = response.data[0][5];
                let updatedRequests = [];
                if (originalRequests == null) {
                    console.log("no current invitations")
                    updatedRequests.push(requestEmail);
                } else {
                    console.log("appending to list")
                    updatedRequests = JSON.parse(response.data[0][5])
                    updatedRequests.push(userInfo.email);
                }
                console.log(updatedRequests)
                updatedRequests = JSON.stringify(updatedRequests);
                console.log(updatedRequests)
                user_data.addFriendRequest(userInfo.sub, updatedRequests).then(response => {
                  console.log(response);
                  console.log("Requests updated.");
                })
            });
        });
    } catch (e) {
        alert(e);
    } finally {
        setRequestEmail("");
    }
  }

  const acceptFriendRequest = () => {
    // todo
  }

  const denyFriendRequest = () => {
      // todo
  }
  const setNotificationTime = () => {
    //console.log(Number(hour) + ":" + Number(minute) + " " + checked);
    setNotificationMin(Number(minute));
    if (checked == "am") {
      if (Number(hour) == 12) {
        setNotificationHr(0);
      } else { //not 12am
        setNotificationHr(Number(hour));
      }
    } else {
      if (Number(hour) == 12) {
        setNotificationHr(12);
      } else { //not 12pm
        let notificationHr = Number(hour) + 12
        setNotificationHr(notificationHr);
      }
    }

  }

  if (notificationsEnabled) {
    Notifications.cancelAllScheduledNotificationsAsync();
    console.log("Send at " + notificationHr + ":" + notificationMin);
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
      }),
    });

    Notifications.scheduleNotificationAsync({
      content: {
          title: 'Reminder: Update Manifest!'
      },
      trigger: {
          hour: notificationHr, minute: notificationMin, repeats: true
      }
    })
  } else {
    console.log("Cancelling previous notifications");
    Notifications.cancelAllScheduledNotificationsAsync();
  }

    return (
      <ScrollView style={styles.container}>
        <View>
            <View style={styles.title}>
              <Text style={styles.welcome}>P R O F I L E   S E T T I N G S</Text>
            </View>
        <View style = {styles.option}>
            <Text style = {styles.toggleText}>Daily Notifications</Text>
            <Switch
                trackColor={{ false: "#767577", true: "#6ab8af" }}
                thumbColor= "#BDE3DF"
                ios_backgroundColor="#3e3e3e"
                onValueChange={notificationSwitch}
                value={notificationsEnabled}
            />
        </View>
        {notificationsEnabled ?
              <View>
                <View style={styles.unitContainer}>
                  <Text style={styles.unitTitle}>Time</Text>
                  <TextInput
                      style={styles.unitInput}
                      onChangeText={(hour) => setHour(hour)}
                      value={hour.toString()}
                      placeholder="Hr"
                      keyboardType="numeric"
                  />
                  <Text>: </Text>
                  <TextInput
                      style={styles.unitInput}
                      onChangeText={(minute) => setMinute(minute)}
                      value={minute.toString()}
                      placeholder="Min"
                      keyboardType="numeric"
                  />
                </View>
                <View style={styles.radio}>
                  <RadioButton
                    value="am"
                    status={ checked === 'am' ? 'checked' : 'unchecked' }
                    onPress={() => setChecked('am')}
                  />
                  <Text style={{marginTop: 7}}> AM    </Text>
                  <RadioButton
                    value="pm"
                    status={ checked === 'pm' ? 'checked' : 'unchecked' }
                    onPress={() => setChecked('pm')}
                  />
                  <Text style={{marginTop: 7}}> PM </Text>

                </View>
                <View>
                    <Pressable style={styles.save}  onPress={setNotificationTime}><Text>Save</Text></Pressable>
                  </View>
              </View>
               : <></>
            }
        <View style = {styles.option}>
            <Text style = {styles.toggleText}>Share Health Data with Friends</Text>
            <Switch
                trackColor={{ false: "#767577", true: "#6ab8af" }}
                thumbColor= "#BDE3DF"
                ios_backgroundColor="#3e3e3e"
                onValueChange={shareSwitch}
                value={shareEnabled}
            />
        </View>
      </View>
    <View style = {styles.container}>
        <View>
          <Text style={styles.bodyText}>Add Friends (Enter Email) </Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Email Address"
            keyboardType="email-address"
            value = {requestEmail}
            onChangeText={(requestEmail) => setRequestEmail(requestEmail)}
          />
        </View>
        <View >
          <Pressable style={styles.add} onPress={sendRequest}><Text>Add Friend</Text></Pressable>
        </View>
        <View>
          <Text style={styles.bodyText}>Friend Requests:</Text>
          {friendRequests.map((request, i) => (
            <View style = {styles.request} key={i}>
            <Text style={styles.requestText}>{request[0].friend}</Text>
            <Pressable style={styles.accept} onPress={() => acceptFriendRequest(request[0].friend)}><Text>Accept</Text></Pressable>
            <Pressable style={styles.deny} onPress={() => denyFriendRequest(request[0].friend)}><Text style={styles.buttonText}>Deny</Text></Pressable>
            </View>
          ))}
        </View>
        <View>
          <Text style={styles.bodyText}>Friends:</Text>
          {friends.map((friend, i) => (
            <View key={i}>
            <Text style={styles.entryText}>{friend[0].friend}</Text>
            </View>
          ))}
        </View>
        </View>
      </ScrollView>
    )
  }
  return (
    <Stack.Navigator
    initialRouteName="Settings">

       <Stack.Screen name="Home" options={{headerShown: false}} component={SettingsComponent} />
       <Stack.Screen name="Journal" options={{headerShown: false}} component={Journal} />
       <Stack.Screen name="Goals" options={{headerShown: false}} component={Goals} />
       <Stack.Screen name="Health" options={{headerShown: false}} component={Wellness} />
       <Stack.Screen name="Talk" options={{headerShown: false}} component={Resources} />

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
    console.log(token);
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
      margin: 10,
    },
    bodyText: {
      display: 'flex',
      marginTop: 10,
      fontSize: 16,
      fontWeight: 'bold',
    },
  buttonText: {
      color: 'white'
  },
  accept: {
      backgroundColor: '#BDE3DF',
      padding: 5,
      fontSize: 12,
      margin: 5,
      borderRadius: 5,
  },
  deny: {
      backgroundColor: '#d94162',
      padding: 5,
      fontSize: 12,
      margin: 5,
      borderRadius: 5
  },
  request: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginRight: 10,
  },
  entryText: {
      fontSize: 20,
      marginTop: 5
  },
  requestText: {
      fontSize: 15,
      marginTop: 10
  },
  toggleText: {
      flexDirection:'row',
      flexWrap:'wrap',
      fontSize: 16,
      paddingHorizontal: 10
  },
  title: {
    textAlign: 'center'
  },
  welcome: {
      textAlign: 'center',
      fontSize: 24,
      fontWeight: 'bold',
      color: '#BDE3DF',
      marginTop: 100,
      marginBottom: 20,
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#BDE3DF',
    marginTop: 20,
    marginBottom: 50
  },
  button: {
    backgroundColor: '#BDE3DF',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 4,
    alignItems: 'center',
    marginRight: 5,
    marginBottom: 25,
    marginLeft: 20,
    marginRight: 20,
    width: 300
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16
  },
  unitContainer: {
    flexDirection: 'row',
    marginLeft: 20,
    alignContent: 'center',
    alignItems: 'center'

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
  radio: {
    flexDirection: 'row',
    marginLeft: 20,
  },
  save: {
    marginLeft: 20,
    marginBottom: 10,
    textAlign: 'center',
    backgroundColor: '#D6DEE5',
    paddingVertical: 8,
    paddingHorizontal: 30,
    width: 94,
    borderRadius: 4
  },
  nav: {
      flexDirection: 'row',
  },
  option: {
      flexDirection: 'row',
      margin: 10
  },
  logout: {
      margin: 10,
      backgroundColor: '#D6DEE5',
      padding: 10
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    height: 40,
    borderWidth: 1,
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
  },
  add: {
    display: 'flex',
    width: '50%',
    backgroundColor: '#BDE3DF',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 4,
    marginBottom: 20
  },
});
