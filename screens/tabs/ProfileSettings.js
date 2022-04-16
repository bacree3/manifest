import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import Slider from '@react-native-community/slider';
import User from '../../User';
import { UserSettings } from '../../Database';
import { PromptedJournalEntry, JournalEntry } from '../../Database';

export default function ProfileSettings({route, navigation}) {
    const [invitations, setInvitations] = useState([]);
    const [friends, setFriends] = useState([]);
    const [userInfo, setUserInfo] = useState("");
    const [userSettings, setUserSettings] = useState("");

    let user_data = new UserSettings();

    let journal = new JournalEntry();

    function loadSettings() {
      try {
        let user = new User();
        let dates = {}
        user.getUserInfo().then(response => {
            setUserInfo(response.attributes);
            user_data.getUserSettings(response.attributes.sub).then(response => {
                setUserSettings(response.data);
                if (response.data.length == 0) {
                    console.log("empty, adding user to settings db")
                    user_data.addNewUser(response.attributes.sub)
                }
            });
        })

        } catch (e) {
            alert(e)
        }
    }

    function loadFriends() {
        try {
          let user = new User();
          let dates = {}
          user.getUserInfo().then(response => {
              setUserInfo(response.attributes);
              user_data.getUserSettings(response.attributes.sub).then(response => {
                  setUserSettings(response.data);
                  let test = JSON.parse(response.data[0][4]).replace(/'/g, '"');
                  test = JSON.parse(test);
                  let formatted_friends = [];
                  for (let i = 0; i < test.length; i++) {
                      formatted_friends.push([{
                          friend: test[i]
                      }])
                  }
                  console.log(formatted_friends)
                  setFriends(formatted_friends);
              });
          })

          } catch (e) {
              alert(e)
          }
    }

    useEffect(()=>{
        loadSettings();
        loadFriends();
    }, [])

  const sendRequest = async () => {

  }

  const updateFriends = async () => {

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
            <Pressable style={styles.add} onPress={sendRequest}><Text>Add Friend</Text></Pressable>
          </View>
          <View>
            <Text style={styles.bodyText}>View Friends Sharing Permissions</Text>
            {friends.map((friend, i) => (
              <View key={i}>
              <Text style={styles.entryText}>{friend[0].friend}</Text>
              </View>
            ))}
          </View>
          <View>
            <Pressable style={styles.add} onPress={updateFriends}><Text>Save Changes</Text></Pressable>
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
