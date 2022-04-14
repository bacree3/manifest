import React from 'react';
import { View, TextInput, Text, StyleSheet, Pressable, ScrollView } from 'react-native';

export default function Activities() {
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.text}>S  U G G E S T E D   A C T I V I T I E S</Text>
            <Text style={styles.header}>General Tips</Text>
            <View style={styles.listContainer}>
                <ul>
                    <li>Drink plenty of water</li>
                    <li>Eat well</li>
                    <li>Prioritize sleep</li>
                    <li>Exercise regularly (even a short walk counts!)</li>
                </ul>
            </View>

            <Text style={styles.header}>Stress/Anxiety</Text>
            <View style={styles.listContainer}>
                <ul>
                    <li>Take a Hot/Cold Shower to relieve senses</li>
                    <li>Meditate to help refocus the mind</li>
                    <li>Practice breathing excerises to calm the mind and body</li>
                    <li>Journal your thoughts to help clear your mind</li>
                    <li>Talk to friends and family (Share your checkin!)</li>
                    <li>Set goals for what you want to accomplish and schedule a time for working on them</li>
                </ul>
            </View>

            <Text style={styles.header}>Low Energy</Text>
            <View style={styles.listContainer}>
                <ul>
                    <li>Eat a nutritious meal/snack</li>
                    <li>Take a power nap (15-20 minutes)</li>
                    <li>Go on a quick walk or engage in light physical excerise</li>
                    <li>Take a Yoga break</li>
                </ul>
            </View>


        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F8F8F8',
      fontFamily: 'Arial',
    },
    text: {
      textAlign: 'center',
      fontSize: 20,
      fontWeight: 'bold',
      color: '#4A4A4A',
      marginTop: 30,
      marginBottom: 20
    },
    header: {
        marginLeft: 20,
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: -5,
        color: '#B0D7D3',
    },
    listContainer: {
        marginRight: 15
    }
  });