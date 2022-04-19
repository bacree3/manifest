import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

export default function Subscription({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>S U B S C R I P T I O N S</Text>
            <Text style={styles.period}>Annual - first 14 days free</Text>
            <Pressable style={styles.button} onPress={() => navigation.navigate('Sign In')}><Text style={styles.buttonText}>$3.99/month, billed yearly at $45.99</Text></Pressable>
            <Text style={styles.period}>Monthly - first 7 days free</Text>
            <Pressable style={styles.button} onPress={() => navigation.navigate('Sign In')}><Text style={styles.buttonText}>$5.99/month</Text></Pressable>
            <Text style={styles.question}>When will I be billed?</Text>
            <Text style={styles.answer}>Your iTunes/Google Play account will be charged at the end of the the trial period if you choose to continue with the subscription. If you cancel your trial on or before the 7 days, you will not be billed.</Text>
            <Text style={styles.question}>Does my subscription Auto renew?</Text>
            <Text style={styles.answer}>Yes. This option can be disabled in the app store.</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#F8F8F8',
    },
    text: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#4A4A4A',
        marginTop: 100,
        marginBottom: 40    
    },
    period: {
        marginLeft: -130,
        marginBottom: 5
    },
    button: {
        backgroundColor: '#BDE3DF',
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderRadius: 4,
        alignItems: 'center',
        marginRight: 5,
        marginBottom: 25,
        marginLeft: 20,
        marginRight: 20,
        width: 300
      },
      buttonText: {
        color: '#ffffff',
        fontSize: 16
      },
      question: {
          fontWeight: 'bold',
          marginBottom: 5
      },
      answer: {
          fontSize: 12,
          color: '#4a4a4a',
          marginBottom: 20,
          marginLeft: 20,
          marginRight: 20,
          textAlign: 'center'
      }
})