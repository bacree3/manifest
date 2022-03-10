import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'


const HealthData = () => {
  return (
    <SafeAreaView>
      <Text style={styles.text}>All Health Data</Text>
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
export default HealthData