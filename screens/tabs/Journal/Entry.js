import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, StyleSheet, Pressable } from 'react-native';
import User from '../../../User';
import { Database, JournalEntry } from '../../../Database';

export default function Journal({navigation}) {
    const [title, setTitle] = useState("");
    const [entry, setEntry] = useState("");
    const [userInfo, setUserInfo] = useState("");
    const [entries, setEntries] = useState("");

    let journal = new JournalEntry();

    useEffect(()=>{
        try {
            let user = new User();
            let userInfo = user.getUserInfo();
            userInfo.then(response => {
                setUserInfo(response.attributes);
            })
        } catch (e) {
            alert(e)
        }
    }, [])

    const [edit, setEdit] = useState(false)
    const editEntry = () => {
      setEdit(!edit)
    }
    const deleteEntry = () => {
      setEdit(!edit)
      navigation.navigate('Journal')
    }
    const saveEntry = async () => {
      setEdit(!edit)
      await journal.add(userInfo.sub, "none", title, entry).then(response => {
          console.log("Journal entry added.");
      })
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
