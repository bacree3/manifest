import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import User from '../../../User';
import { DailyTracker } from '../../../Database';

const Stack = createStackNavigator();
const uid = 0;
const timestamp = 1;
const stress_lvl = 2;
const anxiety_lvl = 3;
const energy_lvl = 4;
const improvement = 5;
const mood = 6;
const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}

console.log(formatAMPM(new Date));

function HealthData() {
    const navigation = useNavigation();

    const [userInfo, setUserInfo] = useState();
    const [entries, setEntries] = useState([]);

    let checkin = new DailyTracker();

    function loadEntries() {
        try {
            let user = new User();
            user.getUserInfo().then(response =>{
                setUserInfo(response.attributes);
                let db_entries = checkin.getAll(response.attributes.sub);
                db_entries.then(response => {
                    let formatted_entries = [];
                    for (let i = 0; i < response.data.length; i++) {
                        console.log(response.data[i][1])
                        let moodObject = JSON.parse(response.data[i][mood]);
                        let improvementObject = JSON.parse(response.data[i][improvement]);
                        let moodString = "";
                        let improvementString = "";

                        let timestamp = new Date(response.data[i][1]);
                        timestamp.toLocaleString('en-US', { timeZone: 'America/New_York' });
                        console.log(timestamp);
                        let timeString = weekday[timestamp.getDay()]
                            + ", " + month[timestamp.getMonth()] + " " + timestamp.getDate()
                            + " at " + formatAMPM(timestamp);


                        for (let key in moodObject) {
                            if (moodObject[key]) {
                                moodString += key + " ";
                            }
                        }

                        for (let key in improvementObject) {
                            if (improvementObject[key]) {
                                improvementString += key + " ";
                            }
                        }

                        formatted_entries.push([{
                            uid: response.data[i][uid],
                            datetime: timeString,
                            stress_lvl: response.data[i][stress_lvl],
                            anxiety_lvl: response.data[i][anxiety_lvl],
                            energy_lvl: response.data[i][energy_lvl],
                            mood: moodString,
                            improvement: improvementString
                        }])
                    }
                    setEntries(formatted_entries);
                })
            })
        } catch (e) {
            alert(e)
        }
    }
    useEffect(()=>{
        loadEntries();
    }, [])

    useFocusEffect(
      React.useCallback(() => {
        loadEntries();
      }, [])
    );

    const HealthDataComponent = () => {
      return (
          <ScrollView style={styles.container}>
            <Text style={styles.text}>H E A L T H    E N T R I E S</Text>
            {entries.map((entry, i) => (
              <View style = {styles.entry} key={i}>
                <Text style={styles.entryText}>{entry[0].datetime}</Text>
                <Text style={styles.entryText}>Stress Level: {entry[0].stress_lvl}</Text>
                <Text style={styles.entryText}>Anxiety Level: {entry[0].anxiety_lvl}</Text>
                <Text style={styles.entryText}>Energy Level: {entry[0].energy_lvl}</Text>
                <Text style={styles.entryText}>Moods: {entry[0].mood}</Text>
                <Text style={styles.entryText}>Need to Improve: {entry[0].improvement}</Text>
              </View>
            ))}
          </ScrollView>
      )
    }
    return (
      <Stack.Navigator initialRouteName="">
          <Stack.Screen name="HealthData" options={{headerShown: false}} component={HealthDataComponent} />
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
      color: 'black',
      marginTop: 20,
      marginBottom: 20
    },
    nav: {
        flexDirection: 'row',
    },
    entry: {
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 4,
        backgroundColor: '#BDE3DF',
        alignItems: 'center',
        marginRight: 5,
        marginBottom: 10,
        marginLeft: 20,
        marginRight: 20
    },
    entryText: {
        color: 'white',
        fontWeight: 'bold'
    }
  });

export default HealthData;
