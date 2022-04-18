import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Victory from '../../../components/Victory';
import User from '../../../User';
import { DailyTracker } from '../../../Database';

const uid = 0;
const timestamp = 1;
const stress_lvl = 2;
const anxiety_lvl = 3;
const energy_lvl = 4;

const VictoryLine = Victory.VictoryLine
const VictoryChart = Victory.VictoryChart
const VictoryTheme = Victory.VictoryTheme
const VictoryTooltip = Victory.VictoryTooltip
const VictoryGroup = Victory.VictoryGroup
const VictoryScatter = Victory.VictoryScatter
const VictoryLegend = Victory.VictoryLegend

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
                        let date = response.data[i][timestamp];
                        let t = date.split(/[- :]/);
                        var d = new Date(t[0], t[1]-1, t[2], t[3], t[4], t[5]);
                        let time = new Date(d);
                        time.toLocaleString('en-US', { timeZone: 'America/New_York' });
                        let timestring = (time.getMonth() + '-' + time.getDate() + '-' + time.getFullYear()).toString()

                        formatted_entries.push({
                            uid: response.data[i][uid],
                            datetime: timestring,
                            stress_lvl: response.data[i][stress_lvl],
                            anxiety_lvl: response.data[i][anxiety_lvl],
                            energy_lvl: response.data[i][energy_lvl],
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
            <VictoryChart theme={VictoryTheme.material}>
                <VictoryGroup 
                labels={({ datum }) => `stress_lvl: ${datum.stress_lvl}`}
                labelComponent={<VictoryTooltip renderInPortal={false}/>}
                data={entries}
                x="datetime"
                y="stress_lvl"
                > 
                    <VictoryLine 
                        data={entries}
                        x="datetime"
                        y="stress_lvl"
                        style={{
                            data: { stroke: "#D6DEE5" },
                            parent: { border: "1px solid #ccc"}
                        }}

                    />
                    <VictoryScatter
                        data={entries}
                        x="datetime"
                        y="stress_lvl"
                        style={{
                            data: { fill: "#D6DEE5" },
                        }}                        
                    />
                </VictoryGroup>

                <VictoryGroup 
                labels={({ datum }) => `anxiety_lvl: ${datum.anxiety_lvl}`}
                labelComponent={<VictoryTooltip renderInPortal={false}/>}
                data={entries}
                x="datetime"
                y="anxiety_lvl"
                >
                    <VictoryLine 
                        data={entries}
                        x="datetime"
                        y="stress_lvl"
                        style={{
                            data: { stroke: "#B0D7D3" },
                        }}
                    />
                    <VictoryScatter
                        data={entries}
                        x="datetime"
                        y="stress_lvl"
                        style={{
                            data: { fill: "#B0D7D3" },
                        }}
                    />
                </VictoryGroup>

                <VictoryGroup 
                labels={({ datum }) => `energy_lvl: ${datum.energy_lvl}`}
                labelComponent={<VictoryTooltip renderInPortal={false}/>}
                data={entries}
                x="datetime"
                y="energy_lvl"
                >
                    <VictoryLine 
                        data={entries}
                        x="datetime"
                        y="stress_lvl"
                        style={{
                            data: { stroke: "#4A4A4A" },
                        }}
                    />
                    <VictoryScatter
                        data={entries}
                        x="datetime"
                        y="stress_lvl"
                        style={{
                            data: { fill: "#4A4A4A" },
                        }}
                    />
                </VictoryGroup>

            </VictoryChart>
            <View style={styles.legend}>
            <VictoryLegend
                    orientation="horizontal"
                    gutter={20}
                    data={[
                    { name: "Stress Level", symbol: { fill: "#D6DEE5"} },
                    { name: "Anxiety Level", symbol: { fill: "#B0D7D3" } },
                    { name: "Energy Level", symbol: { fill: "#4A4A4A" } }
                    ]}
                />
            </View>

        </View>
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F8F8F8',
      fontFamily: 'Arial',
      alignContent: 'center',
      justifyContent: 'center',
      alignItems: 'center'
    },
    text: {
      textAlign: 'center',
      fontSize: 20,
      fontWeight: 'bold',
      color: '#4A4A4A',
      marginBottom: 20,
      marginTop: 150,

    },
    legend: {
        marginLeft: 50
    }
  });