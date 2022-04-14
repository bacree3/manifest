
import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Calendar } from 'react-native-calendars';
import CheckIn from './CheckIn';
import HealthData from './HealthData'
import Activities from './Activities';
import Trends from './Trends';

const Stack = createStackNavigator();

export default function Wellness() {
  const navigation = useNavigation();
  
  const WellnessComponent = () => {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <Text style={styles.text}>W E L L N E S S   C H E C K S</Text>
          <Calendar 
            onDayPress={(date) => navigation.navigate('HealthData', {dateSelected: date.dateString})} 
            hideArrows={false}
            theme={{
              arrowColor: '#BDE3DF',
              dotColor: '#BDE3DF',
              todayBackgroundColor: '#BDE3DF',
              todayTextColor: 'black',
              selectedBackgroundColor: '#BDE3DF',
              selectedTextColor: 'black'
            }}
          />
          <View style={styles.navContainer}>
            <Pressable style={styles.nav} onPress={() => navigation.navigate('CheckIn')}><Text style={styles.navText}>Take Check-In</Text></Pressable>
            <Pressable style={styles.nav} onPress={() => navigation.navigate('Activities')}><Text style={styles.navText}>View Activities</Text></Pressable>
            <Pressable style={styles.nav} onPress={() => navigation.navigate('Trends')}><Text style={styles.navText}>View Trends</Text></Pressable>
          </View>
        </View>
      </SafeAreaView>
    )
  }
  return (
    <Stack.Navigator initialRouteName="Wellness">

        <Stack.Screen name="Wellness" options={{headerShown: false}} component={WellnessComponent} />
        <Stack.Screen name="CheckIn" component={CheckIn} />
        <Stack.Screen name="HealthData" component={HealthData} />
        <Stack.Screen name="Activities" component={Activities} />
        <Stack.Screen name="Trends" component={Trends} />
    </Stack.Navigator>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    justifyContent: 'center'
  },
  text: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    color: '#4A4A4A',
    marginBottom: 20
  },
  wellnessNav: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
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
      paddingHorizontal: 10,
      borderRadius: 4,
      alignItems: 'center',
  },
  navText: {
    color: '#4A4A4A',
    fontWeight: 'bold'
  }
});
