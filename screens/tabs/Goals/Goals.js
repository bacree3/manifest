import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Slider from '@react-native-community/slider';
import { GoalTracker } from '../../../Database';
import User from '../../../User';


import AddGoal from './AddGoal'

const Stack = createStackNavigator();
const uid = 0
const datetime = 1
const category = 2
const name = 3
const time = 4
const frequency = 5
const notification = 6
const progress = 7
const customHour = 8


export default function Goals() {
  const [userInfo, setUserInfo] = useState("")
  const [stored_goals, setGoals] = useState([])
  const navigation = useNavigation()
  const [render, setRender] = useState(false)

  let Goal = new GoalTracker()

  useEffect(()=>{
    try {
        let user = new User();
        let userInfo = user.getUserInfo()
        userInfo.then(response => {
            setUserInfo(response.attributes);
            let db_goals = Goal.getAll(response.attributes.sub)
            db_goals.then(response => {
              let formatted_goals = []
              for (let i = 0; i < response.data.length; i++) {
                formatted_goals.push([{
                  uid: response.data[i][uid],
                  datetime: response.data[i][datetime],
                  category: response.data[i][category],
                  name:  response.data[i][name],
                  time:  response.data[i][time],
                  frequency:  response.data[i][frequency],
                  notification:  response.data[i][notification],
                  customHour:  response.data[i][customHour],
                  progress: response.data[i][progress]
                }])
              }
              console.log(formatted_goals)
              setGoals(formatted_goals)
            })
        })
    } catch (e) {
        alert(e)
    }
}, [render])

const updateValue = async (update, index) => {
  const duplicate = stored_goals.slice()
  duplicate[index][0].progress = update
  setGoals(duplicate)
  await Goal.update(userInfo.sub, stored_goals[index][0].datetime, stored_goals[index][0].progress).then(response => {
    setRender(true)
  })
}

  const GoalsComponent = () => {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <Text style={styles.text}>G O A L     T R A C K E R</Text>
          <Pressable style={styles.add} onPress={() => navigation.navigate('Create Goal')}><Text style={styles.addText}>Add Goal</Text></Pressable>
          {stored_goals.map((goal, i) => (
          <View style={styles.sliderContainer} key={i}>
            <View style = {styles.sliderTextContainer}>
              <Text style={styles.name}>{goal[0].name}</Text>
              <Text>{goal[0].progress} / {goal[0].time === 0 ? goal[0].frequency + ' time(s)' : goal[0].time + ' minute(s)'}</Text>
            </View>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={goal[0].time === 0 ? goal[0].frequency : goal[0].time}
              step={1}
              value={goal[0].progress}
              onValueChange={(goalValue) => updateValue(goalValue, i)}
              minimumTrackTintColor="#BDE3DF"
              maximumTrackTintColor="#000000"
            />
          </View>
          ))}

        </View>
      </SafeAreaView>
    )
  }
  return (
    <Stack.Navigator 
     initialRouteName="Goals">

        <Stack.Screen name="Goals" options={{headerShown: false}} component={GoalsComponent} />
        <Stack.Screen name="Create Goal" component={AddGoal} />
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
    color: '#4A4A4A',
    marginTop: 50,
    marginBottom: 30
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
  addText: {
    color: '#4A4A4A',
    textAlign: 'left',
    fontWeight: 'bold',
  },
  sliderTitle: {
    marginLeft: 20,
    marginTop: 10,
    fontSize: 16,
    fontWeight: '600',
  },
  sliderTextContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  sliderContainer: {
    marginLeft: 20,
    marginRight: 20
  },
  slider: {
    // width: 200, 
    height: 40,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 10
  },
  name: {
    fontWeight: 'bold',
  }
});
