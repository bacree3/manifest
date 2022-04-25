import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Button from '../../components/Button'
import User from '../../User';
import Auth from '@aws-amplify/auth';

export default function Profile() {

    const [userInfo, setUserInfo] = useState("");

    useEffect(()=>{
        try {
            let user = new User();
            let userInfo = user.getUserInfo();
            userInfo.then(response => {
                setUserInfo(response.attributes)
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

    return (
        <SafeAreaView>
            <Text style={styles.text}>Profile</Text>
            <Text style={styles.info}>Name: {userInfo.name}</Text>
            <Text style={styles.info}>Email: {userInfo.email}</Text>
            <Button style = {styles.button} onPress={() => signOut()}>Sign Out</Button>
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
    button: {
        margin: 20,
    },
    info: {
        textAlign: 'left',
    }
  });
