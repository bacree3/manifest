import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Button from '../../components/Button'

export default function Profile() {
  return (
    <SafeAreaView>
      <Text style={styles.text}>Profile</Text>
      <Button onPress={() => signOut()}>Sign Out</Button>
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