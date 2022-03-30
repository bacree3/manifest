import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
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

  useEffect(()=>{
    try {
        let user = new User();
        let userInfo = user.getUserInfo();
        userInfo.then(response => {
            setUserInfo(response.attributes);
        })
    } catch (e) {
        alert(e)
    }
}, [])

const signOut = async () => {
  Auth.signOut().then(response => {
      console.log("User signed out.");
      window.location.reload();
  })
}

  const SettingsComponent = () => {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.title}>
          <Text style={styles.welcome}>Settings</Text>
        </View>
        <View style = {styles.option}>
            <Text style = {styles.toggleText}>Reminder Notifications</Text>
            <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={notificationsEnabled ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={notificationSwitch}
                value={notificationsEnabled}
            />
        </View>
        <View style = {styles.option}>
            <Text style = {styles.toggleText}>Share Health Data with Friends</Text>
            <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={shareEnabled ? "#f5dd4b" : "#f4f3f4"}
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
