import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, Switch, Platform, Keyboard, DevSettings } from 'react-native';
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

const Stack = createStackNavigator();

export default function Settings() {

  const [testQuery, setTestQuery] = useState("");
  const [userInfo, setUserInfo] = useState("");
  const navigation = useNavigation();

  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const notificationSwitch = () => setNotificationsEnabled(previousState => !previousState);
  const [shareEnabled, setShareEnabled] = useState(false);
  const shareSwitch = () => setShareEnabled(previousState => !previousState);

  const [hour, setHour] = useState("12");
  const [minute, setMinute] = useState("00");
  const [checked, setChecked] = React.useState('am');

  const [notificationHr, setNotificationHr] = useState(0);
  const [notificationMin, setNotificationMin] = useState(0);

  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

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

      return () => {
        Notifications.removeNotificationSubscription(notificationListener.current);
        Notifications.removeNotificationSubscription(responseListener.current);
      };
    } catch (e) {
      alert(e)
    }
  }, [])

  const signOut = async () => {
    Auth.signOut().then(response => {
        console.log("User signed out.");
        DevSettings.reload();
    })
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


  const SettingsComponent = () => {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.title}>
          <Text style={styles.welcome}>Settings</Text>
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
                    //style={styles.radio}
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
        <Pressable style = {styles.logout} onPress={() => signOut()}><Text>Logout</Text></Pressable>
      </SafeAreaView>
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
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8F8F8',
  },
  toggleText: {
      flexDirection:'row',
      flexWrap:'wrap',
      fontSize: 16,
      paddingHorizontal: 10
  },
  title: {
    flexDirection: 'row'
  },
  welcome: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#4A4A4A',
    marginBottom: 20
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
    marginLeft: 80,
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
    marginLeft: 123,
    alignContent: 'center',
    alignItems: 'center'
  },
  save: {
    marginLeft: 165,
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
      margin: 10
  }
});
