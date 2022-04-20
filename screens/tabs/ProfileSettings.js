import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import Slider from '@react-native-community/slider';
import User from '../../User';
import { UserSettings } from '../../Database';
import { PromptedJournalEntry, JournalEntry } from '../../Database';

export default function ProfileSettings({route, navigation}) {
    const [friends, setFriends] = useState([]);
    const [friendRequests, setFriendRequests] = useState([]);
    const [userInfo, setUserInfo] = useState("");
    const [userSettings, setUserSettings] = useState("");
    const [requestEmail, setRequestEmail] = useState("");

    let user_data = new UserSettings();

    useEffect(()=>{
        try {
            let user = new User();
            let userInfo = user.getUserInfo();
            userInfo.then(response => {
                setUserInfo(response.attributes);
            })
            console.log(route.params)
            if (route.params !== undefined) {
              console.log("params not defined")
            }
        } catch (e) {
            alert(e)
        }
        loadSettings();
        loadFriends();
        loadFriendRequests();
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
              value = {requestEmail}
              onChangeText={(requestEmail) => setRequestEmail(requestEmail)}
            />
          </View>
          <View >
            <Pressable style={styles.add} onPress={sendRequest}><Text>Add Friend</Text></Pressable>
          </View>
          <View>
            <Text style={styles.bodyText}>View Friend Requests</Text>
            {friendRequests.map((request, i) => (
              <View style = {styles.request} key={i}>
              <Text style={styles.requestText}>{request[0].friend}</Text>
              <Pressable style={styles.accept} onPress={() => acceptFriendRequest(request[0].friend)}><Text>Accept</Text></Pressable>
              <Pressable style={styles.deny} onPress={() => denyFriendRequest(request[0].friend)}><Text style={styles.buttonText}>Deny</Text></Pressable>
              </View>
            ))}
          </View>
          <View>
            <Text style={styles.bodyText}>View Friends</Text>
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

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F8F8F8',
      margin: 10
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
        fontSize: 20,
        marginTop: 10
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
      fontSize: 30,
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
      marginBottom: 50
    },
    nav: {
      flexDirection: 'row'
    },
});
