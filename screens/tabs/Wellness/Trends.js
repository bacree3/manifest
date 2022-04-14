import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from "recharts";
import User from '../../../User';
import { DailyTracker } from '../../../Database';

const uid = 0;
const timestamp = 1;
const stress_lvl = 2;
const anxiety_lvl = 3;
const energy_lvl = 4;
const improvement = 5;
const mood = 6;

export default function Trends() {

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
                    for (let i =  response.data.length - 1; i >= 0; i--) {
                        console.log(response.data[i])
                        let moodObject = JSON.parse(response.data[i][mood]);
                        let improvementObject = JSON.parse(response.data[i][improvement]);
                        let moodString = "";
                        let improvementString = "";

                        let date = new Date(response.data[i][timestamp])
                        let month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
                        let day = date.getDate()  < 10 ? '0' + date.getDate() : date.getDate()
                        let timestring = (month + '-' + day + '-' + date.getFullYear()).toString()

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

                        formatted_entries.push({
                            uid: response.data[i][uid],
                            datetime: timestring,
                            stress_lvl: response.data[i][stress_lvl],
                            anxiety_lvl: response.data[i][anxiety_lvl],
                            energy_lvl: response.data[i][energy_lvl],
                            mood: moodString,
                            improvement: improvementString
                        })
                    }
                    setEntries(formatted_entries);
                    console.log(formatted_entries)
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
    return (
        <View style={styles.container}>
            <Text style={styles.text}>H E A L T H    T R E N D S</Text>
            <ResponsiveContainer width="100%" height={300}>
            <LineChart data={entries} margin={{top: 5, right: 40, bottom: 5,}} >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="datetime"  tick={{fontSize: 12}}/>
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="stress_lvl" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="anxiety_lvl" />
                <Line type="monotone" dataKey="energy_lvl" />
            </LineChart>
            </ResponsiveContainer>

        </View>
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F8F8F8',
      fontFamily: 'Arial',
      alignContent: 'center',
      justifyContent: 'center'
    },
    text: {
      textAlign: 'center',
      fontSize: 20,
      fontWeight: 'bold',
      color: '#4A4A4A',
      marginBottom: 20
    },
  });