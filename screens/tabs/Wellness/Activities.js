import React from 'react';
import { View, TextInput, Text, StyleSheet, Pressable, ScrollView } from 'react-native';

export default function Activities() {
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.text}>S  U G G E S T E D   A C T I V I T I E S</Text>
            <Text style={styles.header}>General Tips</Text>
            <View style={styles.listContainer}>
            <Text>Drink plenty of water</Text>
            <Text>Eat well</Text>
            <Text>Prioritize sleep</Text>
            <Text>Exercise regularly (even a short walk counts!)</Text>
            </View>

            <Text style={styles.header}>Stress/Anxiety</Text>
            <View style={styles.listContainer}>
            <Text>Take a Hot/Cold Shower to relieve senses</Text>
            <Text>Meditate to help refocus the mind</Text>
            <Text>Practice breathing excerises to calm the mind and body</Text>
            <Text>Journal your thoughts to help clear your mind</Text>
            <Text>Talk to friends and family (Share your checkin!)</Text>
            <Text>Set goals for what you want to accomplish and schedule a time for working on them</Text>
            </View>

            <Text style={styles.header}>Low Energy</Text>
            <View style={styles.listContainer}>
            <Text>Eat a nutritious meal/snack</Text>
            <Text>Take a power nap (15-20 minutes)</Text>
            <Text>Go on a quick walk or engage in light physical excerise</Text>
            <Text>Take a Yoga break</Text>
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
        marginRight: 15,
        marginLeft: 20,
        marginTop: 8,
        marginBottom: 10
    }
  });