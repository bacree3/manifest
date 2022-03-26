import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
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

export default function Home() {

  const [testQuery, setTestQuery] = useState("");
  const [userInfo, setUserInfo] = useState("");
  const navigation = useNavigation()

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

  const HomeComponent = () => {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.title}>
          <Text style={styles.welcome}>Welcome Back</Text>
          {/* <Text style={styles.name}>{' ' + userInfo.name}</Text> */}
        </View>
        <Text style={styles.question}>How can we help you?</Text>
        <Pressable style={styles.button} onPress={() => navigation.navigate('Journal')}><Text style={styles.buttonText}>Organize Thoughts</Text></Pressable>
        <Pressable style={styles.button} onPress={() => navigation.navigate('Goals')}><Text style={styles.buttonText}>Monitor Goals</Text></Pressable>
        <Pressable style={styles.button} onPress={() => navigation.navigate('Health')}><Text style={styles.buttonText}>Assess Mental Health</Text></Pressable>
        <Pressable style={styles.button} onPress={() => navigation.navigate('Talk')}><Text style={styles.buttonText}>Talk to Professionals</Text></Pressable>
        <Pressable style = {styles.logout} onPress={() => signOut()}><Text>Logout</Text></Pressable>
  
      </SafeAreaView>
    )
  }
  return (
    <Stack.Navigator 
    initialRouteName="Home">

       <Stack.Screen name="Home" options={{headerShown: false}} component={HomeComponent} />
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
  title: {
    flexDirection: 'row'
  },
  welcome: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#4A4A4A',
    marginBottom: 20
  },
  question: {
    fontSize: 20,
    color: '#4A4A4A',
    marginBottom: 30
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
    paddingVertical: 8,
    paddingHorizontal: 30,
    borderRadius: 4,
    alignItems: 'center',
    marginRight: 5,
    marginBottom: 30,
    marginLeft: 20,
    marginRight: 20,
    width: 300
  },
  buttonText: {
    color: '#ffffff'
  },
  nav: {
      flexDirection: 'row',
  },
});
