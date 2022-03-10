import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Entry from './Entry'
import User from '../../../User';
import { Database, JournalEntry } from '../../../Database';

const Stack = createStackNavigator();
const uid = 0;
const datetime = 1;
const category = 2;
const message = 3;
const title = 4;

export default function Journal() {
  const navigation = useNavigation();

  const [userInfo, setUserInfo] = useState();
  const [entries, setEntries] = useState([]);

  let journal = new JournalEntry();

  useEffect(()=>{
      try {
          let user = new User();
          user.getUserInfo().then(response => {
              setUserInfo(response.attributes);
              let db_entries = journal.getAll(response.attributes.sub);
              db_entries.then(response => {
                let formatted_entries = []
                for(let i = 0; i < response.data.length; i++) {
                  formatted_entries.push([{
                    uid: response.data[i][uid],
                    datetime: response.data[i][datetime],
                    category: response.data[i][category],
                    title: response.data[i][title],
                    message: response.data[i][message]
                  }])
                }
                setEntries(formatted_entries);
              })
          })
      } catch (e) {
          alert(e)
      }
  }, [])

  const JournalComponent = () => {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>J O U R N A L    E N T R I E S</Text>
        <Pressable style={styles.add} onPress={() => navigation.navigate('Entry')}><Text style={styles.addText}>Add Entry</Text></Pressable>
        {entries.map((entry, i) => (
          <View key={i}>
          <Pressable style={styles.entry} onPress={() => navigation.navigate('Entry', {entry: entry[0]})}><Text>{entry[0].title}</Text></Pressable>
          </View>
        ))}
      </View>
    )
  }

  return (
    <Stack.Navigator
      screenOptions={{
          headerStyle: {
            backgroundColor: '#BDE3DF'
          },
          headerTintColor: '#fff'
      }} initialRouteName="Journal">

        <Stack.Screen name="Journal" options={{headerShown: false}} component={JournalComponent} />
        <Stack.Screen name="Entry" component={Entry} />
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
    fontSize: 23,
    fontWeight: 'bold',
    color: '#BDE3DF',
    marginTop: 50,
    marginBottom: 30
  },
  add: {
    backgroundColor: '#4A4A4A',
    paddingVertical: 8,
    paddingHorizontal: 30,
    borderRadius: 4,
    alignItems: 'center',
    marginRight: 5,
    marginBottom: 30,
    marginLeft: 20,
    marginRight: 20
  },
  addText: {
    color: '#ffffff',
    textAlign: 'left'
  },
  entry: {
    backgroundColor: '#BDE3DF',
    paddingVertical: 8,
    paddingHorizontal: 30,
    borderRadius: 4,
    alignItems: 'center',
    marginRight: 5,
    marginBottom: 5,
    marginLeft: 20,
    marginRight: 20
  }
});

Journal.getInitialProps = async () => {
  let user = new User();
  let userInfo = user.getUserInfo();

  userInfo.then(response => {
      return response;
  })

  // return userInfo
}
