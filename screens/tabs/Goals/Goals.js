import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Slider from '@react-native-community/slider';

import AddGoal from './AddGoal'

const Stack = createStackNavigator();

export default function Goals() {
  const navigation = useNavigation();

  const GoalsComponent = () => {
    const [goalValue, setGoalValue] = useState(5)
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <Text style={styles.text}>G O A L     T R A C K E R</Text>
          <Pressable style={styles.add} onPress={() => navigation.navigate('AddGoal')}><Text>Add Goal</Text></Pressable>
          <View style={styles.sliderContainer}>
            <Text>Goal</Text>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={10}
              step={1}
              value={goalValue}
              onValueChange={(goalValue) => setGoalValue(goalValue)}
              minimumTrackTintColor="#BDE3DF"
              maximumTrackTintColor="#000000"
            />
            <Text>({goalValue} / 10 hrs)</Text>
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
      }} initialRouteName="Goals">

        <Stack.Screen name="Goals" options={{headerShown: false}} component={GoalsComponent} />
        <Stack.Screen name="AddGoal" component={AddGoal} />
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
    marginBottom: 50
  },
  add: {
    backgroundColor: '#BDE3DF',
    paddingVertical: 8,
    paddingHorizontal: 30,
    borderRadius: 4,
    alignItems: 'center',
    marginRight: 5,
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20
  },
  sliderTitle: {
    marginLeft: 20,
    marginTop: 10,
    fontSize: 16,
    fontWeight: '600',
  },
  sliderContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 20,
    marginRight: 20
  },
  slider: {
    width: 200, 
    height: 40,
    marginLeft: 5,
    marginRight: 5
  },
});
