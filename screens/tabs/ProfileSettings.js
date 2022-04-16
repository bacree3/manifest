import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import Slider from '@react-native-community/slider';
import User from '../../User';
import { UserSettings } from '../../Database';

export default function ProfileSettings({route, navigation}) {
    const [invitations, setInvitations] = useState("");
    const [friends, setFriends] = useState("");
    const [userInfo, setUserInfo] = useState("");
    const [userSettings, setUserSettings] = useState("");

    let user_data = new UserSettings();

  useEffect(()=>{
      try {
          let user = new User();
          user.getUserInfo().then(response => {
              setUserInfo(response.attributes);
              let test = user_data.getUserSettings(response.attributes.sub);
          })
          console.log(route.params)
          if (route.params !== undefined) {
            console.log("params not defined")
          }
          checkUserSettings();
      } catch (e) {
          alert(e)
      }
  }, [])

  const checkUserSettings = async () => {
      console.log(userInfo)
  }

  const sendRequest = async () => {

  }

  return (
      <ScrollView style={styles.container}>
        <View style={styles.container}>
          <Text style={styles.text}>P R O F I L E   S E T T I N G S</Text>
          <View>
            <Text style={styles.bodyText}>Add Friends (Enter Email) </Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Email Address"
              keyboardType="email-address"
            />
          </View>
          <View >
            <Pressable style={styles.add}><Text>Add Friend</Text></Pressable>
          </View>
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
      fontSize: 20,
      fontWeight: 'bold',
      color: '#BDE3DF',
      marginTop: 50,
      marginBottom: 20
    },
    inputContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    },
    bodyText: {
      display: 'flex',
      marginTop: 10,
      fontSize: 20,
    },
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
    add: {
      display: 'flex',
      width: 150,
      backgroundColor: '#BDE3DF',
      paddingVertical: 8,
      paddingHorizontal: 30,
      borderRadius: 4,
      // marginLeft: 20,
      marginBottom: 50
    },
    nav: {
      flexDirection: 'row'
    },
});
