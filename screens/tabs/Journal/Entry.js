import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, Pressable } from 'react-native';

export default function Journal({navigation}) {
    const [title, setTitle] = useState("")
    const [entry, setEntry] = useState("")
    const [edit, setEdit] = useState(false)
    const editEntry = () => {
      setEdit(!edit)
    }
    const deleteEntry = () => {
      setEdit(!edit)
      navigation.navigate('Journal')
    }
    const saveEntry = () => {
      setEdit(!edit)
      console.log(title)
      console.log(entry)
      navigation.navigate('Journal')
    }
    return (
        <View style={styles.container}>
            <TextInput
            style={styles.title}
            onChangeText={(title) => setTitle(title)}
            value={title}
            placeholder="Title"
            multiline
            />
            <TextInput
            style={styles.entry}
            onChangeText={(entry) => setEntry(entry)}
            placeholder="Enter Text Here"
            value={entry}
            multiline
            />
            {edit ?
                <Pressable style={styles.action} onPress={saveEntry}><Text>Save</Text></Pressable> :
                <View style={styles.actionContainer}>
                    <Pressable style={styles.action} onPress={editEntry}><Text>Edit</Text></Pressable>
                    <Pressable style={styles.delete} onPress={deleteEntry}><Text>Delete</Text></Pressable> 
                </View>
            }
        </View>
    )
}

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
