
import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CheckIn from './CheckIn';
import HealthData from './HealthData'

const Stack = createStackNavigator();

export default function Wellness() {
  const navigation = useNavigation();
  
  const WellnessComponent = () => {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <Text style={styles.text}>W E L L N E S S     J O U R N A L</Text>
          <View style={styles.navContainer}>
            <Pressable style={styles.nav} onPress={() => navigation.navigate('CheckIn')}><Text>Check In</Text></Pressable>
            <Pressable style={styles.nav} onPress={() => navigation.navigate('HealthData')}><Text>Health Data</Text></Pressable>
          </View>
        </View>
      </SafeAreaView>
    )
  }
  return (
    <Stack.Navigator 
      screenOptions={{
          headerStyle: {
            backgroundColor: '#BDE3DF'
          },
          headerTintColor: '#fff'
      }} initialRouteName="Wellness">

        <Stack.Screen name="Wellness" options={{headerShown: false}} component={WellnessComponent} />
        <Stack.Screen name="CheckIn" component={CheckIn} />
        <Stack.Screen name="HealthData" component={HealthData} />
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#BDE3DF',
    marginTop: 50,
    marginBottom: 20
  },
  wellnessNav: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  navContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10
  },
  nav: {
      backgroundColor: '#BDE3DF',
      paddingVertical: 8,
      paddingHorizontal: 20,
      borderRadius: 4,
      alignItems: 'center',
  },
});
