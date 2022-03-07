import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, Pressable } from 'react-native';
import Button from '../../components/Button';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  title: {
    fontSize: 23,
    fontWeight: 'bold',
    margin: 20
  },
  entry: {
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 50,
    fontSize: 16
  },
  actionContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between'
  },
  action: {
    backgroundColor: '#BDE3DF',
    paddingVertical: 8,
    paddingHorizontal: 30,
    borderRadius: 4,
    alignItems: 'center',
    marginRight: 5,
    marginBottom: 50,
    marginLeft: 20,
    marginRight: 20
  },
  delete: {
    backgroundColor: '#ffffff',
    paddingVertical: 8,
    paddingHorizontal: 30,
    borderRadius: 4,
    marginRight: 20,
    marginBottom: 50
  },
  nav: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
});

export default function Journal({navigation}) {
    const [title, setTitle] = useState("")
    const [entry, setEntry] = useState("")
    const [edit, setEdit] = useState(false)
    return (
        <View style={styles.container}>
            <TextInput
            style={styles.title}
            onChangeText={(title) => setTitle(title)}
            value={title}
            placeholder="Enter Title Here"
            multiline
            />
            <TextInput
            style={styles.entry}
            onChangeText={(entry) => setEntry(entry)}
            value={entry}
            multiline
            />
            {edit ?
                <Pressable style={styles.action} onPress={() => setEdit(!edit)}><Text>Save</Text></Pressable> :
                <View style={styles.actionContainer}>
                    <Pressable style={styles.action} onPress={() => setEdit(!edit)}><Text>Edit</Text></Pressable>
                    <Pressable style={styles.delete} onPress={() => setEdit(!edit)}><Text>Delete</Text></Pressable> 
                </View>
            }

            <View style={styles.nav}>
            <Button onPress={() => navigation.navigate('Journal')}>Journal</Button>
            <Button onPress={() => navigation.navigate('Connect')}>Connect</Button>
            <Button onPress={() => navigation.navigate('Goals')}>Goals</Button>
            <Button onPress={() => navigation.navigate('Logs')}>Wellness</Button>
            </View>
        </View>
    )
}
