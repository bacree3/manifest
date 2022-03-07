
import React from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Connect() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.text}>C O M M U N I T Y     C O N N E C T</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.bodyText}>Group Name: </Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Group Name"
            keyboardType="default"
          />
        </View>
        <View>
          <Text style={styles.bodyText}>Add Members (Enter Email) </Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Email Address"
            keyboardType="email-address"
          />
        </View>
        <View >
          <Pressable style={styles.add}><Text>Add Member</Text></Pressable>
        </View>
      </View>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
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
  inputContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  bodyText: {
    display: 'flex',
    marginTop: 10,
    fontSize: 20,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  add: {
    display: 'flex',
    width: 150,
    backgroundColor: '#BDE3DF',
    paddingVertical: 8,
    paddingHorizontal: 30,
    borderRadius: 4,
    // marginLeft: 20,
    marginBottom: 50
  },
  nav: {
    flexDirection: 'row'
  },

});