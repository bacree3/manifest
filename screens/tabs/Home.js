import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../../components/Button';
import axios from 'axios';
import { Database } from '../../Database';
import User from '../../User';

export default function Home() {

  const [testQuery, setTestQuery] = useState("");
  const [userInfo, setUserInfo] = useState("");

  const makeDBQuery = async () => {
    try {
        let db = new Database();
        let query = db.executeQuery("select * from test;");
        await query.then(response => {
            console.log(response.data)
            setTestQuery(response.data)
        });
    } catch (error) {
        alert(error)
    }
  }

  const getUserInfo = async () => {
      try {
          let user = new User();
          let userInfo = user.getUserInfo();
          await userInfo.then(response => {
              console.log(response.attributes);
              setUserInfo(response.attributes)
          })
      } catch (e) {
          alert(e)
      }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>You are now authenticated</Text>
      <Button onPress={() => makeDBQuery()}>Get Test Query</Button>
      <Button onPress={() => getUserInfo()}>Get User Info</Button>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#BDE3DF',
    marginTop: 20,
    marginBottom: 50
  },
  nav: {
      flexDirection: 'row',
  },
});
